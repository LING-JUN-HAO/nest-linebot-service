import { ImageMapMessageReq, TextMessageReq } from 'src/line-message/types';

export const SWEET_REPLY: ImageMapMessageReq = {
  baseUrl:
    'https://haoyu-linebot.qd513020.workers.dev/imagemap/%E7%AB%AF%E5%8D%88.002_y8zosf/png',
  altText: '我是甜粽派',
  baseSize: { width: 1040, height: 768 },
  actions: [],
};
export const MEAT_REPLY: ImageMapMessageReq = {
  altText: '我是肉粽派',
  baseUrl:
    'https://haoyu-linebot.qd513020.workers.dev/imagemap/%E7%AB%AF%E5%8D%88.003_g7p9qm/png',
  baseSize: { width: 1040, height: 768 },
  actions: [],
};

export const TEETH_REPLY_1: ImageMapMessageReq = {
  baseUrl:
    'https://haoyu-linebot.qd513020.workers.dev/imagemap/%E7%AB%AF%E5%8D%88.004_st5i49/png',
  altText: '我是假牙族',
  baseSize: { width: 1040, height: 768 },
  actions: [],
};
export const TEETH_REPLY_2: ImageMapMessageReq = {
  baseUrl:
    'https://haoyu-linebot.qd513020.workers.dev/imagemap/%E7%AB%AF%E5%8D%88.005_a1avaz/png',
  altText: '我是假牙族',
  baseSize: { width: 1040, height: 350 },
  actions: [],
};
export const START_REPLY_1: TextMessageReq = {
  text: `各位鄉親，端午安康！我是牙醫師溫世政。

「囝仔返鄉，照顧家鄉」，我準備了端午護牙互動小知識，讓專業醫療走入生活、守護每一代人的笑容。

吃粽子前，先看看醫師為您包了什麼「健康好料」？
點擊下方按鈕，領取您的端午護齒小祕訣吧！🛶🦷`,
};
export const START_REPLY_2: ImageMapMessageReq = {
  baseUrl:
    'https://haoyu-linebot.qd513020.workers.dev/imagemap/%E7%AB%AF%E5%8D%88.001_ca0zep/png',
  altText: '端午節',
  baseSize: {
    width: 1040,
    height: 768,
  },
  actions: [
    {
      type: 'message',
      area: {
        x: 192,
        y: 554,
        width: 190,
        height: 114,
      },
      text: '我是甜粽派',
    },
    {
      type: 'message',
      area: {
        x: 424,
        y: 555,
        width: 191,
        height: 112,
      },
      text: '我是肉粽派',
    },
    {
      type: 'message',
      area: {
        x: 656,
        y: 554,
        width: 190,
        height: 114,
      },
      text: '我是假牙族',
    },
  ],
};
