import { MessageCommon } from './message-common';
import { TemplateButtons } from '@line/bot-sdk';

type HttpsURL = `https://${string}`;

export type TemplateButtonMessageReq = MessageCommon &
  Pick<TemplateButtons, 'text' | 'actions' | 'title' | 'thumbnailImageUrl'> & {
    altText: string;
    thumbnailImageUrl?: HttpsURL;
  };
