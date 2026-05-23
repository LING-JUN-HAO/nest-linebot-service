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
  BUTTON_REPLY,
  CONFIRM_REPLY,
  CAROUSEL_REPLY,
  IMAGE_CAROUSEL_REPLY,
  IMAGE_MAP_REPLY,
  FLEX_REPLY,
  DEFAULT_TEXT_REPLY,
  DODO_REPLY,
  START_REPLY_1,
  START_REPLY_2,
  TEETH_REPLY_1,
  MEAT_REPLY,
  SWEET_REPLY,
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
      messages: [{ type: 'text', text: '歡迎加入官方帳號！' }],
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
        //2026 端午節專屬互動
        if (text === '端午節快樂')
          return [
            this.lineMessageService.createTextMessage(START_REPLY_1),
            this.lineMessageService.createImageMapMessage(START_REPLY_2),
          ];
        if (text === '我是甜粽派')
          return this.lineMessageService.createImageMapMessage(SWEET_REPLY);
        if (text === '我是肉粽派')
          return this.lineMessageService.createImageMapMessage(MEAT_REPLY);
        if (text === '我是假牙族')
          return [this.lineMessageService.createImageMapMessage(TEETH_REPLY_1)];
        // 測試各種模板消息
        if (text === 'button')
          return this.lineMessageService.createTemplateButtonMessage(
            BUTTON_REPLY,
          );
        if (text === 'confirm')
          return this.lineMessageService.createTemplateConfirmMessage(
            CONFIRM_REPLY,
          );
        if (text === 'dodo')
          return this.lineMessageService.createTemplateConfirmMessage(
            DODO_REPLY,
          );
        if (text === 'carousel')
          return this.lineMessageService.createTemplateCarouselMessage<1>(
            CAROUSEL_REPLY,
          );
        if (text === 'imageCarousel')
          return this.lineMessageService.createTemplateImageCarouselMessage(
            IMAGE_CAROUSEL_REPLY,
          );
        if (text === 'imageMap')
          return this.lineMessageService.createImageMapMessage(IMAGE_MAP_REPLY);
        if (text === 'flex')
          return this.lineMessageService.createFlexMessage(FLEX_REPLY);
        return this.lineMessageService.createTextMessage({
          text: message.text,
          ...DEFAULT_TEXT_REPLY,
        });
      },
      sticker: () =>
        this.lineMessageService.createStickerMessage({
          packageId: '6370',
          stickerId: '11088018',
        }),
      image: () =>
        this.lineMessageService.createImageMessage({
          previewImageUrl:
            'https://res.cloudinary.com/dseg0uwc9/image/upload/v1752220509/2025%20IT%20%E9%90%B5%E4%BA%BA%E8%B3%BD/569400594147311960.jpg',
          originalContentUrl:
            'https://res.cloudinary.com/dseg0uwc9/image/upload/v1752220509/2025%20IT%20%E9%90%B5%E4%BA%BA%E8%B3%BD/569400594147311960.jpg',
        }),
      video: () =>
        this.lineMessageService.createVideoMessage({
          previewImageUrl:
            'https://res.cloudinary.com/dseg0uwc9/image/upload/e_improve,w_300,h_600,c_thumb,g_auto/v1752220479/2025%20IT%20%E9%90%B5%E4%BA%BA%E8%B3%BD/569400541533438471.jpg',
          originalContentUrl:
            'https://res.cloudinary.com/dseg0uwc9/video/upload/v1753430100/test_video_fyraxr.mp4',
        }),
      audio: () =>
        this.lineMessageService.createAudioMessage({
          originalContentUrl:
            'https://res.cloudinary.com/dseg0uwc9/video/upload/v1740070405/%E9%90%B5%E4%BA%BA%E8%B3%BD%E8%A6%81%E5%A4%9A%E4%B9%85_pgkjr2.m4a',
          duration: 11000,
        }),
      location: () =>
        this.lineMessageService.createLocationMessage({
          title: '東海小確幸黑糖鮮奶波霸（東海總店）',
          address: '434台中市龍井區台灣大道五段3巷66號',
          latitude: 24.1815183,
          longitude: 120.5899484,
        }),
    } satisfies Partial<MessageEventHandlerMap>; // 這部分主要是因為目前沒有處理 file 事件

    const handler: (
      message: EventMessage,
    ) => messagingApi.Message | messagingApi.Message[] =
      messageEventHandlerMap[event.message.type];

    const result = handler(event.message);
    const messages = Array.isArray(result) ? result : [result];

    await this.lineClient.replyMessage({
      replyToken: event.replyToken,
      messages,
    });
  }
}
