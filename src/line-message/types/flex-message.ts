import { MessageCommon } from './message-common';
import { FlexMessage } from '@line/bot-sdk';

export type FlexMessageReq = MessageCommon & Omit<FlexMessage, 'type'>;
