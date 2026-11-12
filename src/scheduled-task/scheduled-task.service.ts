import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { messagingApi, ClientConfig } from '@line/bot-sdk';
import { PinoLogger } from 'nestjs-pino';
import { LINE_CONFIG } from 'src/line-webhook/line-webhook.provider';
import { LineMessageService } from 'src/line-message/line-message.service';
import {
  LIPP_FOLLOW_REPLY_1,
  createLippEntryReply,
} from 'src/line-webhook/replies';
import * as scheduleConfig from './schedule.json';
import { MessageKey, Schedule } from './scheduled-task.types';

@Injectable()
export class ScheduledTaskService {
  private readonly lineClient: messagingApi.MessagingApiClient;
  private readonly liffId: string;

  constructor(
    @Inject(LINE_CONFIG) private readonly lineConfig: ClientConfig,
    private readonly logger: PinoLogger,
    private readonly lineMessageService: LineMessageService,
    configService: ConfigService,
  ) {
    this.liffId = configService.getOrThrow<string>('line.liffId');
    this.lineClient = new messagingApi.MessagingApiClient({
      channelAccessToken: this.lineConfig.channelAccessToken,
    });
    this.logger.setContext(ScheduledTaskService.name);
  }

  async runTask(): Promise<string> {
    this.logger.info('排程任務觸發');

    const schedules = scheduleConfig.schedules as Schedule[];

    if (schedules.length === 0) {
      this.logger.info('無排程設定，略過發送');
      return 'No schedule matched';
    }

    this.logger.info(
      `找到 ${schedules.length} 筆待發送排程：${schedules
        .map((schedule) => `[${schedule.messages.join(', ')}]`)
        .join('; ')}`,
    );

    const messages = schedules.flatMap((schedule) =>
      schedule.messages.flatMap((key) => this.resolveMessages(key)),
    );

    try {
      await this.lineClient.broadcast({ messages });
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
      CHANGE_VIBE: [
        this.lineMessageService.createTextMessage(LIPP_FOLLOW_REPLY_1),
        this.lineMessageService.createFlexMessage(
          createLippEntryReply(this.liffId),
        ),
      ] as messagingApi.Message[],
    };

    return messageMap[key] ?? [];
  }
}
