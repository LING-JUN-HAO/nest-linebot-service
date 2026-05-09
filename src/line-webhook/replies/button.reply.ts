import { TemplateButtonMessageReq } from 'src/line-message/types';

const DOG_ICON_URL =
  'https://res.cloudinary.com/dseg0uwc9/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1753953684/2025%20IT%20%E9%90%B5%E4%BA%BA%E8%B3%BD/dog_icon_grxcsl.jpg';

export const BUTTON_REPLY: TemplateButtonMessageReq = {
  altText: '按鈕小精靈通知',
  thumbnailImageUrl:
    'https://res.cloudinary.com/dseg0uwc9/image/upload/v1753953684/2025%20IT%20%E9%90%B5%E4%BA%BA%E8%B3%BD/dog_icon_grxcsl.jpg',
  title: '標題',
  text: '按鈕小精靈出來吧',
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
  actions: [
    { type: 'message', label: '我是按鈕 1', text: '我是按鈕 1 號' },
    { type: 'message', label: '我是按鈕 2', text: '我是按鈕 2 號' },
    { type: 'message', label: '我是按鈕 3', text: '我是按鈕 3 號' },
    { type: 'message', label: '我是按鈕～', text: '我是按鈕 4 號' },
  ],
};
