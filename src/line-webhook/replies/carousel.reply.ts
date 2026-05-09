import { TemplateCarouselMessageReq } from 'src/line-message/types';

const DOG_ICON_URL =
  'https://res.cloudinary.com/dseg0uwc9/image/upload/v1753953684/2025%20IT%20%E9%90%B5%E4%BA%BA%E8%B3%BD/dog_icon_grxcsl.jpg';

export const CAROUSEL_REPLY: TemplateCarouselMessageReq<1> = {
  altText: '最新活動消息！！',
  cards: [
    {
      text: '新生代狗狗寵物展',
      thumbnailImageUrl: DOG_ICON_URL,
      actions: [
        { type: 'message', label: '搶先第一手資訊', text: '可愛狗狗展' },
      ],
    },
    {
      text: '可愛貓貓展',
      thumbnailImageUrl: DOG_ICON_URL,
      actions: [
        { type: 'message', label: '搶先第一手資訊', text: '可愛貓貓展' },
      ],
    },
  ],
};
