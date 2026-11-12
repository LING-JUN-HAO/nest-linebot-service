import { ImageMapMessageReq, TextMessageReq } from 'src/line-message/types';
import { liffUrl } from './liff-url';

const RESULT_BASE_SIZE: ImageMapMessageReq['baseSize'] = {
  width: 1040,
  height: 768,
};

const createResultActions = (liffId: string): ImageMapMessageReq['actions'] => [
  {
    type: 'uri',
    area: { x: 856, y: 664, width: 160, height: 86 },
    linkUri: liffUrl(liffId, 'share/dawn'),
  },
];

export const createSweetReply = (liffId: string): ImageMapMessageReq => ({
  baseUrl:
    'https://haoyu-linebot.qd513020.workers.dev/imagemap/%E8%AD%B7%E7%89%99-02_vmklwm/png',
  altText: '我是甜粽派',
  baseSize: RESULT_BASE_SIZE,
  actions: createResultActions(liffId),
});

export const createMeatReply = (liffId: string): ImageMapMessageReq => ({
  baseUrl:
    'https://haoyu-linebot.qd513020.workers.dev/imagemap/%E8%AD%B7%E7%89%99-03_nio0ba/png',
  altText: '我是肉粽派',
  baseSize: RESULT_BASE_SIZE,
  actions: createResultActions(liffId),
});

export const createTeethReply = (liffId: string): ImageMapMessageReq => ({
  baseUrl:
    'https://haoyu-linebot.qd513020.workers.dev/imagemap/%E8%AD%B7%E7%89%99-04_jemqds/png',
  altText: '我是假牙族',
  baseSize: RESULT_BASE_SIZE,
  actions: createResultActions(liffId),
});

export const START_REPLY_1: TextMessageReq = {
  text: `各位鄉親，端午安康！我是牙醫師温世政。

「囝仔返鄉，照顧家鄉」，我準備了端午護牙互動小知識，讓專業醫療走入生活、守護每一代人的笑容。

吃粽子前，先看看醫師為您包了什麼「健康好料」？
點擊下方按鈕，領取您的端午護齒小祕訣吧！🛶🦷`,
};
export const START_REPLY_2: ImageMapMessageReq = {
  baseUrl:
    'https://haoyu-linebot.qd513020.workers.dev/imagemap/%E8%AD%B7%E7%89%99-01_euijhg/png',
  altText: '端午節',
  baseSize: {
    width: 1040,
    height: 768,
  },
  actions: [
    {
      type: 'message',
      area: {
        x: 108,
        y: 452,
        width: 263,
        height: 300,
      },
      text: '我是甜粽派',
    },
    {
      type: 'message',
      area: {
        x: 394,
        y: 451,
        width: 260,
        height: 299,
      },
      text: '我是肉粽派',
    },
    {
      type: 'message',
      area: {
        x: 677,
        y: 450,
        width: 258,
        height: 300,
      },
      text: '我是假牙族',
    },
  ],
};
