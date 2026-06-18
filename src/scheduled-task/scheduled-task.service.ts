import { Inject, Injectable } from '@nestjs/common';
import { messagingApi, ClientConfig } from '@line/bot-sdk';
import { PinoLogger } from 'nestjs-pino';
import { LINE_CONFIG } from 'src/line-webhook/line-webhook.provider';
import { LineMessageService } from 'src/line-message/line-message.service';
import { START_REPLY_1, START_REPLY_2 } from 'src/line-webhook/replies';
import * as scheduleConfig from './schedule.json';
import { MessageKey, Schedule } from './scheduled-task.types';

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
      DUANWU_START: [
        this.lineMessageService.createTextMessage(START_REPLY_1),
        this.lineMessageService.createImageMapMessage(START_REPLY_2),
      ],
    };

    return messageMap[key] ?? [];
  }
}
