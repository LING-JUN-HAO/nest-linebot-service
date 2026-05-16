import { TextMessageReq } from 'src/line-message/types';

const DOG_ICON_URL =
  'https://res.cloudinary.com/dseg0uwc9/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1753953684/2025%20IT%20%E9%90%B5%E4%BA%BA%E8%B3%BD/dog_icon_grxcsl.jpg';

export const DEFAULT_TEXT_REPLY: Omit<TextMessageReq, 'text'> = {
  emoji: {
    index: 0,
    productId: '5ac21c4e031a6752fb806d5b',
    emojiId: '006',
  },
  sender: {
    name: '狗狗助理 v2',
    iconUrl: DOG_ICON_URL,
  },
  quickReplyItems: [
    {
      imageUrl: DOG_ICON_URL,
      action: { type: 'message', label: '天氣', text: '天氣' },
    },
    {
      imageUrl: DOG_ICON_URL,
      action: { type: 'message', label: '天氣2', text: '天氣2' },
    },
    {
      imageUrl: DOG_ICON_URL,
      action: { type: 'message', label: '天氣3', text: '天氣3' },
    },
  ],
};
