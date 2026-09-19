import {
  ImageMapMessageReq,
  TextMessageReq,
  FlexMessageReq,
} from 'src/line-message/types';

// FRIST
export const START_REPLY_1: TextMessageReq = {
  text: `你有多認識温醫師？

簡單三題，動動手指就能完成！
看看您是不是最了解温醫師的南投鄉親！`,
};
export const START_REPLY_2: ImageMapMessageReq = {
  baseUrl:
    'https://haoyu-linebot.qd513020.workers.dev/imagemap/v1786810208/Q01_nrlyt7/png',
  altText: '温醫師是哪一科的醫師？',
  baseSize: {
    width: 1040,
    height: 802,
  },
  actions: [
    {
      type: 'message',
      area: {
        x: 21,
        y: 195,
        width: 330,
        height: 570,
      },
      text: '牙醫師',
    },
    {
      type: 'message',
      area: {
        x: 357,
        y: 195,
        width: 330,
        height: 570,
      },
      text: '獸醫師',
    },
    {
      type: 'message',
      area: {
        x: 690,
        y: 195,
        width: 330,
        height: 570,
      },
      text: '中醫師',
    },
  ],
};

export const START_Y_REPLY: ImageMapMessageReq = {
  baseUrl:
    'https://haoyu-linebot.qd513020.workers.dev/imagemap/v1787755818/A01-1_zu6f3c/png',
  altText: '答對囉！是牙醫師',
  baseSize: { width: 1040, height: 802 },
  actions: [],
};

export const START_N_REPLY: ImageMapMessageReq = {
  baseUrl:
    'https://haoyu-linebot.qd513020.workers.dev/imagemap/v1787755818/A01-2_xhu8y8/png',
  altText: '答錯囉！是牙醫師',
  baseSize: { width: 1040, height: 802 },
  actions: [],
};

// SECOND
export const SECOND_REPLY: ImageMapMessageReq = {
  baseUrl:
    'https://haoyu-linebot.qd513020.workers.dev/imagemap/v1786810208/Q02_w77jq3/png',
  altText: '921大地震發生時，温醫師在做什麼？',
  baseSize: {
    width: 1040,
    height: 802,
  },
  actions: [
    {
      type: 'message',
      area: {
        x: 21,
        y: 195,
        width: 330,
        height: 570,
      },
      text: '電視記者',
    },
    {
      type: 'message',
      area: {
        x: 357,
        y: 195,
        width: 330,
        height: 570,
      },
      text: '醫官',
    },
    {
      type: 'message',
      area: {
        x: 690,
        y: 195,
        width: 330,
        height: 570,
      },
      text: '觀光導遊',
    },
  ],
};

export const SECOND_Y_REPLY: ImageMapMessageReq = {
  baseUrl:
    'https://haoyu-linebot.qd513020.workers.dev/imagemap/v1787755826/A02-1_bjvx5e/png',
  altText: '答對囉！是醫官',
  baseSize: { width: 1040, height: 802 },
  actions: [],
};

export const SECOND_N_REPLY: ImageMapMessageReq = {
  baseUrl:
    'https://haoyu-linebot.qd513020.workers.dev/imagemap/v1787755818/A02-2_fsb2dw/png',
  altText: '答錯囉！是醫官',
  baseSize: { width: 1040, height: 802 },
  actions: [],
};

// THIRD
export const THIRD_REPLY: ImageMapMessageReq = {
  baseUrl:
    'https://haoyu-linebot.qd513020.workers.dev/imagemap/v1786810208/Q03_p9djuz/png',
  altText: '温醫師最想為南投顧好哪三件事？',
  baseSize: {
    width: 1040,
    height: 802,
  },
  actions: [
    {
      type: 'message',
      area: {
        x: 21,
        y: 195,
        width: 330,
        height: 570,
      },
      text: '顧老人、顧少年、顧腹肚',
    },
    {
      type: 'message',
      area: {
        x: 357,
        y: 195,
        width: 330,
        height: 570,
      },
      text: '顧招牌、顧口號、顧選票',
    },
    {
      type: 'message',
      area: {
        x: 690,
        y: 195,
        width: 330,
        height: 570,
      },
      text: '顧自己、顧朋友、顧有錢人',
    },
  ],
};

export const THIRD_Y_REPLY: ImageMapMessageReq = {
  baseUrl:
    'https://haoyu-linebot.qd513020.workers.dev/imagemap/v1787755818/A03-1_edago4/png',
  altText: '答對囉！是顧老人、顧少年、顧腹肚',
  baseSize: { width: 1040, height: 802 },
  actions: [],
};

export const THIRD_N_REPLY: ImageMapMessageReq = {
  baseUrl:
    'https://haoyu-linebot.qd513020.workers.dev/imagemap/v1787755818/A03-2_ntpfdl/png',
  altText: '答錯囉！是顧老人、顧少年、顧腹肚',
  baseSize: { width: 1040, height: 802 },
  actions: [],
};

export const FINAL_REPLY: FlexMessageReq = {
  altText: '小小測驗完成啦！中秋節快樂',
  contents: {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: '小小測驗完成啦！🎊',
          wrap: true,
          weight: 'regular',
          size: 'md',
        },
        {
          type: 'text',
          text: '三題都答對了嗎？',
          wrap: true,
          margin: 'lg',
        },
        {
          type: 'text',
          wrap: true,
          margin: 'lg',
          contents: [
            {
              type: 'span',
              text: '温世政是一位牙醫師',
              weight: 'bold',
            },
            {
              type: 'span',
              text: '，也曾在 921大地震時以軍醫身分投入救災。',
              weight: 'regular',
            },
          ],
        },
        {
          type: 'text',
          wrap: true,
          margin: 'md',
          contents: [
            {
              type: 'span',
              text: '從醫多年，他養成了耐心傾聽、專業判斷、找出問題、負責到底的做事態度。如今，他希望把這份專業與責任帶回南投。',
            },
          ],
        },
        {
          type: 'text',
          text: '顧老人、顧少年、顧腹肚。',
          wrap: true,
          margin: 'md',
        },
        {
          type: 'text',
          text: '和鄉親一起，把南投照顧得更健康、更有希望。',
          wrap: true,
          margin: 'md',
        },
        {
          type: 'text',
          wrap: true,
          margin: 'lg',
          size: 'sm',
          color: '#1E6FD9',
          text: '#温世政 #温醫師 #你認識温醫師嗎 #顧老人顧少年顧腹肚 #南投更好',
        },
        {
          type: 'button',
          style: 'primary',
          color: '#00C853',
          action: {
            type: 'uri',
            label: '分享給朋友玩玩看吧！',
            uri: 'https://liff.line.me/2011622081-De9SToPC#share/moonquiz',
          },
        },
      ],
      position: 'relative',
    },
  },
};

/**
 * 中秋尋物賀卡 — 聊天室入口卡（螢幕①）
 *
 * TODO 上線前要換的兩個東西：
 *  1. image.url ── 換成實際上傳到 Cloudinary 的入口圖網址
 *  2. LIFF_URL  ── 目前指向現有 LIFF（2007994878-MGDBvQQg），如另開 LIFF 再換
 */
const LIFF_URL = 'https://liff.line.me/2011622081-De9SToPC#moongame';
export const HUNT_ENTRY_REPLY_1: TextMessageReq = {
  text: `🌕温世政祝大家中秋佳節愉快！

月圓人團圓，祝福南投鄉親闔家平安、事事順心！

世政準備了趣味尋寶小遊戲，邀大家一起找玉兔、領取專屬中秋賀卡🥮`,
};
export const HUNT_ENTRY_REPLY_2: FlexMessageReq = {
  altText: '中秋尋物賀卡｜找出藏起來的中秋小物',
  contents: {
    type: 'bubble',
    size: 'giga',
    body: {
      type: 'box',
      layout: 'vertical',
      paddingAll: 'none',
      contents: [
        {
          type: 'image',
          url: 'https://res.cloudinary.com/dj4rwmdiu/image/upload/v1789306852/img01_cover_slewoq.png',
          size: 'full',
          aspectMode: 'cover',
          aspectRatio: '1644:734',
        },
        {
          type: 'box',
          layout: 'vertical',
          paddingTop: '12px',
          paddingStart: '16px',
          paddingEnd: '16px',
          paddingBottom: '12px',
          spacing: 'md',
          contents: [
            {
              type: 'text',
              text: '【南投尋兔趣】找出隱藏玉兔！',
              weight: 'bold',
              size: '20px',
              wrap: true,
            },
            {
              type: 'text',
              text: '熱鬧的南投廟埕藏了 3 隻調皮玉兔 🐰',
              wrap: true,
              size: '17px',
              color: '#333333',
            },
            {
              type: 'text',
              text: '點擊畫面把它們全部找出來，即可領取限量中秋賀卡！',
              wrap: true,
              size: '17px',
              color: '#333333',
            },
            {
              type: 'box',
              layout: 'vertical',
              height: '48px',
              backgroundColor: '#00C853',
              cornerRadius: '999px',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 'sm',
              action: {
                type: 'uri',
                label: '立刻開始尋寶',
                uri: LIFF_URL,
              },
              contents: [
                {
                  type: 'text',
                  text: '立刻開始尋寶',
                  color: '#FFFFFF',
                  weight: 'bold',
                  size: '18px',
                  align: 'center',
                },
              ],
            },
          ],
        },
      ],
    },
  },
};
