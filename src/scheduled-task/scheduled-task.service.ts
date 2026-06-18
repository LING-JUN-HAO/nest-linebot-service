import { Inject, Injectable } from '@nestjs/common';
import { messagingApi, ClientConfig } from '@line/bot-sdk';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { PinoLogger } from 'nestjs-pino';
import { join } from 'path';
import { LINE_CONFIG } from 'src/line-webhook/line-webhook.provider';
import { LineMessageService } from 'src/line-message/line-message.service';
import { START_REPLY_1, START_REPLY_2 } from 'src/line-webhook/replies';
import * as scheduleConfig from './schedule.json';
import {
  MessageKey,
  Schedule,
  ScheduledTaskPayload,
} from './scheduled-task.types';

const ONE_MINUTE_MS = 60 * 1000;
const DEFAULT_LOOKBACK_MINUTES = 10;
const MAX_LOOKBACK_MINUTES = 180;
const SCHEDULE_STATE_PATH = join(
  process.cwd(),
  '.runtime',
  'scheduled-task-state.json',
);
const PROCESSED_KEY_RETENTION_DAYS = 30;

interface ProcessedScheduleState {
  processedKeys: Record<string, string>;
}

@Injectable()
export class ScheduledTaskService {
  private readonly lineClient: messagingApi.MessagingApiClient;

  constructor(
    @Inject(LINE_CONFIG) private readonly lineConfig: ClientConfig,
    private readonly logger: PinoLogger,
    private readonly lineMessageService: LineMessageService,
  ) {
    this.lineClient = new messagingApi.MessagingApiClient({
      channelAccessToken: this.lineConfig.channelAccessToken,
    });
    this.logger.setContext(ScheduledTaskService.name);
  }

  async runTask(body: ScheduledTaskPayload): Promise<string> {
    this.logger.info('排程任務觸發');
    console.log('收到資料：', body);

    const now = this.resolveNow(body.now);
    const endAt = this.floorToMinute(now);
    const startAt = this.resolveStartAt(body, endAt);

    this.logger.info(
      `排程補送區間：${startAt.toISOString()} ~ ${endAt.toISOString()}`,
    );

    const matchedSchedules = (scheduleConfig.schedules as Schedule[])
      .map((schedule) => ({
        schedule,
        scheduledAt: this.parseScheduleTime(schedule),
        processedKey: this.buildProcessedKey(schedule),
      }))
      .filter(
        ({ scheduledAt }) => scheduledAt > startAt && scheduledAt <= endAt,
      )
      .sort(
        (left, right) => left.scheduledAt.getTime() - right.scheduledAt.getTime(),
      );

    const state = await this.readProcessedScheduleState();
    const pendingSchedules = matchedSchedules.filter(
      ({ processedKey }) => !state.processedKeys[processedKey],
    );

    if (matchedSchedules.length === 0) {
      this.logger.info('補送區間內無對應排程，略過發送');
      return 'No schedule matched';
    }

    if (pendingSchedules.length === 0) {
      this.logger.info('補送區間內排程都已觸發過，略過重送');
      return 'All matched schedules have already been processed';
    }

    this.logger.info(
      `找到 ${pendingSchedules.length} 筆待發送排程：${pendingSchedules
        .map(
          ({ schedule, scheduledAt }) =>
            `${scheduledAt.toISOString()} [${schedule.messages.join(', ')}]`,
        )
        .join('; ')}`,
    );

    const messages = pendingSchedules.flatMap(({ schedule }) =>
      schedule.messages.flatMap((key) => this.resolveMessages(key)),
    );

    try {
      await this.lineClient.broadcast({ messages });
      pendingSchedules.forEach(({ processedKey }) => {
        state.processedKeys[processedKey] = new Date().toISOString();
      });
      await this.writeProcessedScheduleState(state);
      this.logger.info('Broadcast 發送成功');
    } catch (err) {
      this.logger.error(
        { err },
        `Broadcast 失敗：${err instanceof Error ? err.message : String(err)}`,
      );
      throw err;
    }

    return 'Task executed successfully';
  }

  private resolveMessages(key: MessageKey): messagingApi.Message[] {
    const messageMap: Record<MessageKey, messagingApi.Message[]> = {
      DUANWU_START: [
        this.lineMessageService.createTextMessage(START_REPLY_1),
        this.lineMessageService.createImageMapMessage(START_REPLY_2),
      ],
    };

    return messageMap[key] ?? [];
  }

  private resolveNow(now?: string): Date {
    const parsedNow = now ? new Date(now) : new Date();

    if (Number.isNaN(parsedNow.getTime())) {
      this.logger.warn(`無效的 now 參數：${now}，改用系統時間`);
      return new Date();
    }

    return parsedNow;
  }

  private resolveStartAt(body: ScheduledTaskPayload, endAt: Date): Date {
    if (body.lastSuccessAt) {
      const lastSuccessAt = new Date(body.lastSuccessAt);

      if (!Number.isNaN(lastSuccessAt.getTime())) {
        return lastSuccessAt;
      }

      this.logger.warn(
        `無效的 lastSuccessAt 參數：${body.lastSuccessAt}，改用 fallback lookback`,
      );
    }

    const lookbackMinutes = this.normalizeLookbackMinutes(body.lookbackMinutes);
    return new Date(endAt.getTime() - lookbackMinutes * ONE_MINUTE_MS);
  }

  private normalizeLookbackMinutes(lookbackMinutes?: number): number {
    if (
      typeof lookbackMinutes !== 'number' ||
      !Number.isFinite(lookbackMinutes) ||
      lookbackMinutes <= 0
    ) {
      return DEFAULT_LOOKBACK_MINUTES;
    }

    return Math.min(Math.floor(lookbackMinutes), MAX_LOOKBACK_MINUTES);
  }

  private floorToMinute(date: Date): Date {
    return new Date(Math.floor(date.getTime() / ONE_MINUTE_MS) * ONE_MINUTE_MS);
  }

  private parseScheduleTime(schedule: Schedule): Date {
    const time = schedule.time ?? '00:00';
    const [year, month, day] = schedule.date.split('-').map(Number);
    const [hour, minute] = time.split(':').map(Number);
    const utcTime = Date.UTC(
      year,
      month - 1,
      day,
      hour - 8,
      minute,
      0,
      0,
    );

    return new Date(utcTime);
  }

  private buildProcessedKey(schedule: Schedule): string {
    return [schedule.date, schedule.time ?? '00:00', schedule.messages.join(',')].join(
      '|',
    );
  }

  private async readProcessedScheduleState(): Promise<ProcessedScheduleState> {
    try {
      const content = await readFile(SCHEDULE_STATE_PATH, 'utf8');
      const parsed = JSON.parse(content) as ProcessedScheduleState;

      return {
        processedKeys: this.pruneProcessedKeys(parsed.processedKeys ?? {}),
      };
    } catch (error) {
      return { processedKeys: {} };
    }
  }

  private async writeProcessedScheduleState(
    state: ProcessedScheduleState,
  ): Promise<void> {
    const nextState = {
      processedKeys: this.pruneProcessedKeys(state.processedKeys),
    };

    await mkdir(join(process.cwd(), '.runtime'), { recursive: true });
    await writeFile(
      SCHEDULE_STATE_PATH,
      JSON.stringify(nextState, null, 2),
      'utf8',
    );
  }

  private pruneProcessedKeys(
    processedKeys: Record<string, string>,
  ): Record<string, string> {
    const retentionThreshold =
      Date.now() - PROCESSED_KEY_RETENTION_DAYS * 24 * 60 * 60 * 1000;

    return Object.fromEntries(
      Object.entries(processedKeys).filter(([, processedAt]) => {
        const processedTime = new Date(processedAt).getTime();
        return !Number.isNaN(processedTime) && processedTime >= retentionThreshold;
      }),
    );
  }
}
