import { MessageCommon } from './message-common';
import { LocationMessage } from '@line/bot-sdk';

export type LocationMessageReq = MessageCommon & Omit<LocationMessage, 'type'>;
