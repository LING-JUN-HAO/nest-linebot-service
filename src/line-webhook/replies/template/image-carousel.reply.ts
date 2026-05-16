import { TemplateImageCarouselMessageReq } from 'src/line-message/types';

const DOG_ICON_URL =
  'https://res.cloudinary.com/dseg0uwc9/image/upload/v1753953684/2025%20IT%20%E9%90%B5%E4%BA%BA%E8%B3%BD/dog_icon_grxcsl.jpg';

export const IMAGE_CAROUSEL_REPLY: TemplateImageCarouselMessageReq = {
  altText: '最新產品消息',
  cards: [
    {
      imageUrl: DOG_ICON_URL,
      action: {
        type: 'message',
        label: '狗狗商品 1 號',
        text: '狗狗商品 1 號',
      },
    },
    {
      imageUrl: DOG_ICON_URL,
      action: {
        type: 'message',
        label: '狗狗商品 2 號',
        text: '狗狗商品 2 號',
      },
    },
  ],
};
