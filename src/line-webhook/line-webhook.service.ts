import {
  ClientConfig,
  FollowEvent,
  messagingApi,
  UnfollowEvent,
  MessageEvent,
  WebhookRequestBody,
  EventMessage,
} from '@line/bot-sdk';
import { Inject, Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { LINE_CONFIG } from 'src/line-webhook/line-webhook.provider';
import { LineMessageService } from 'src/line-message/line-message.service';
import {
  MessageEventHandlerMap,
  WebhookEventHandlerMap,
} from './line-webhook.types';
import {
  START_REPLY_1,
  START_REPLY_2,
  START_Y_REPLY,
  START_N_REPLY,
  SECOND_REPLY,
  SECOND_Y_REPLY,
  SECOND_N_REPLY,
  THIRD_REPLY,
  THIRD_Y_REPLY,
  THIRD_N_REPLY,
  FINAL_REPLY,
  HUNT_ENTRY_REPLY_1,
  HUNT_ENTRY_REPLY_2,
} from './replies';
@Injectable()
export class LineWebhookService {
  private readonly lineClient: messagingApi.MessagingApiClient;
  private readonly blobClient: messagingApi.MessagingApiBlobClient;

  constructor(
    @Inject(LINE_CONFIG) private readonly lineConfig: ClientConfig,
    private readonly logger: PinoLogger,
    private readonly lineMessageService: LineMessageService,
  ) {
    this.lineClient = new messagingApi.MessagingApiClient({
      channelAccessToken: this.lineConfig.channelAccessToken,
    });
    this.blobClient = new messagingApi.MessagingApiBlobClient({
      channelAccessToken: this.lineConfig.channelAccessToken,
    });
    this.logger.setContext(LineWebhookService.name);
  }

  /**
   * 處理來自 LINE Platform 的 Webhook 請求
   * @param body LINE Platform 傳送的 Webhook 請求本體
   */
  async processWebhook(body: WebhookRequestBody): Promise<string> {
    const { events } = body;
    this.logger.trace(JSON.stringify(events));

    const webhookEventHandlerMap = {
      message: (event) => this.handleMessageEvent(event),
      follow: (event) => this.handleFollowEvent(event),
      unfollow: (event) => this.handleUnfollowEvent(event),
    } satisfies Partial<WebhookEventHandlerMap>;

    for (const event of events) {
      const handler = webhookEventHandlerMap[event.type];
      if (handler) await handler(event);
    }

    return 'Webhook processed successfully';
  }

  /**
   * 用戶首次加入好友或解除封鎖官方帳號時觸發
   */
  private async handleFollowEvent(event: FollowEvent): Promise<void> {
    await this.lineClient.replyMessage({
      replyToken: event.replyToken,
      messages: [
        this.lineMessageService.createTextMessage(HUNT_ENTRY_REPLY_1),
        // createFlexMessage 回傳舊版 SDK 型別，與 messagingApi.Message 結構相同
        this.lineMessageService.createFlexMessage(
          HUNT_ENTRY_REPLY_2,
        ) as messagingApi.Message,
      ],
    });
  }

  /**
   * 用戶封鎖或刪除官方帳號時觸發
   */
  private async handleUnfollowEvent(event: UnfollowEvent): Promise<void> {
    console.log(`使用者 ${event.source.userId} 取消關注`);
  }

  /**
   * 用戶發送任何類型的訊息時觸發
   */
  private async handleMessageEvent(event: MessageEvent): Promise<void> {
    const messageEventHandlerMap = {
      text: (message) => {
        const { text } = message;
        // 2026 中秋節專屬互動
        // 中秋尋物賀卡
        if (text === '中秋尋物' || text === '尋物賀卡')
          return [
            this.lineMessageService.createTextMessage(HUNT_ENTRY_REPLY_1),
            this.lineMessageService.createFlexMessage(HUNT_ENTRY_REPLY_2),
          ];

        // First
        if (text === '中秋節快樂')
          return [
            this.lineMessageService.createTextMessage(START_REPLY_1),
            this.lineMessageService.createImageMapMessage(START_REPLY_2),
          ];
        if (text === '牙醫師')
          return [
            this.lineMessageService.createImageMapMessage(START_Y_REPLY),
            this.lineMessageService.createImageMapMessage(SECOND_REPLY),
          ];
        if (text === '獸醫師' || text === '中醫師')
          return [
            this.lineMessageService.createImageMapMessage(START_N_REPLY),
            this.lineMessageService.createImageMapMessage(SECOND_REPLY),
          ];
        // second
        if (text === '醫官')
          return [
            this.lineMessageService.createImageMapMessage(SECOND_Y_REPLY),
            this.lineMessageService.createImageMapMessage(THIRD_REPLY),
          ];
        if (text === '電視記者' || text === '觀光導遊')
          return [
            this.lineMessageService.createImageMapMessage(SECOND_N_REPLY),
            this.lineMessageService.createImageMapMessage(THIRD_REPLY),
          ];
        // third
        if (text === '顧老人、顧少年、顧腹肚')
          return [
            this.lineMessageService.createImageMapMessage(THIRD_Y_REPLY),
            this.lineMessageService.createFlexMessage(FINAL_REPLY),
          ];
        if (
          text === '顧自己、顧朋友、顧有錢人' ||
          text === '顧招牌、顧口號、顧選票'
        )
          return [
            this.lineMessageService.createImageMapMessage(THIRD_N_REPLY),
            this.lineMessageService.createFlexMessage(FINAL_REPLY),
          ];
        return null;
      },
    } satisfies Partial<MessageEventHandlerMap>; // 這部分主要是因為目前沒有處理 file 事件

    const handler: (
      message: EventMessage,
    ) => messagingApi.Message | messagingApi.Message[] =
      messageEventHandlerMap[event.message.type];

    if (!handler) return;

    const result = handler(event.message);
    if (!result) return;

    const messages = Array.isArray(result) ? result : [result];

    await this.lineClient.replyMessage({
      replyToken: event.replyToken,
      messages,
    });
  }
}
