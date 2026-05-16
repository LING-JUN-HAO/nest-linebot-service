import { ImageMapMessageReq } from 'src/line-message/types';

export const IMAGE_MAP_REPLY: ImageMapMessageReq = {
  baseUrl:
    'https://linebot-imagemap.qd513020.workers.dev/Line_ImageMap_Message_video_%E8%A8%AD%E8%A8%88_g4oh3d/png',
  altText: '背單字提醒！',
  video: {
    previewImageUrl:
      'https://linebot-imagemap.qd513020.workers.dev/Line_ImageMap_Message_video_%E8%A8%AD%E8%A8%88_g4oh3d/png/1040',
    originalContentUrl:
      'https://res.cloudinary.com/dseg0uwc9/video/upload/v1753430100/test_video_fyraxr.mp4',
    area: { x: 0, y: 0, width: 1040, height: 1040 },
    externalLink: {
      label: '點我領取相關資訊',
      linkUri: 'https://google.com.tw/',
    },
  },
  actions: [
    {
      type: 'message',
      area: { x: 0, y: 0, width: 1040, height: 1040 },
      text: '請至行動裝置上查看影片內容！',
    },
  ],
};
