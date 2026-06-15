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

  async runTask(body: any): Promise<string> {
    this.logger.info('排程任務觸發');
    console.log('收到資料：', body);

    // 取得台灣時間（UTC+8）
    const now = new Date();
    const twTime = new Date(now.getTime() + 8 * 60 * 60 * 1000);
    const currentDate = twTime.toISOString().slice(0, 10); // YYYY-MM-DD
    const currentTime = twTime.toISOString().slice(11, 16); // HH:mm

    this.logger.info(`當前台灣時間：${currentDate} ${currentTime}`);

    // 比對 schedule.json（有 time 欄位才比對時間）
    const matched = (scheduleConfig.schedules as Schedule[]).find((s) => {
      if (s.date !== currentDate) return false;
      if (s.time) return s.time === currentTime;
      return true;
    });

    if (!matched) {
      this.logger.info('目前時間無對應排程，略過發送');
      return 'No schedule matched';
    }

    this.logger.info(`找到排程，發送訊息：${matched.messages.join(', ')}`);

    // 將 messageKey 轉換成 LINE 訊息物件
    const messages = matched.messages.flatMap((key) =>
      this.resolveMessages(key),
    );

    try {
      await this.lineClient.broadcast({ messages });
      this.logger.info('Broadcast 發送成功');
    } catch (err) {
      this.logger.error({ err }, `Broadcast 失敗：${err?.message ?? err}`);
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
