import { TextMessageReq, FlexMessageReq } from 'src/line-message/types';
import { liffUrl } from './liff-url';

const HERO_IMAGE_URL =
  'https://res.cloudinary.com/dj4rwmdiu/image/upload/v1794013731/%E8%81%8A%E5%A4%A9%E5%AE%A4_jbs2jz.png';

export const LIPP_FOLLOW_REPLY_1: TextMessageReq = {
  text: `讓改變的力量匯聚成流，希望擴散成波！\n\n30 秒做出你的「政波卡」，成為政波，改變南投！🌊`,
};

export const createLippEntryReply = (liffId: string): FlexMessageReq => ({
  altText: '加入政波，一起成為改變南投的力量',
  contents: {
    type: 'bubble',
    size: 'giga',
    hero: {
      type: 'image',
      url: HERO_IMAGE_URL,
      size: 'full',
      aspectRatio: '20:9',
      aspectMode: 'cover',
      action: {
        type: 'uri',
        label: '加入政波',
        uri: liffUrl(liffId, 'changevibe'),
      },
    },
    body: {
      type: 'box',
      layout: 'vertical',
      paddingAll: 'none',
      contents: [
        {
          type: 'box',
          layout: 'vertical',
          paddingTop: '24px',
          paddingStart: '20px',
          paddingEnd: '20px',
          paddingBottom: '20px',
          spacing: 'xl',
          contents: [
            {
              type: 'text',
              text: '一起成為改變南投的力量',
              weight: 'bold',
              size: '20px',
              color: '#222222',
              wrap: true,
            },
            {
              type: 'text',
              text: '輸入暱稱、選擇你和南投的關係，馬上完成專屬於你的政波卡。',
              wrap: true,
              size: '18px',
              color: '#555555',
            },
            {
              type: 'box',
              layout: 'vertical',
              height: '50px',
              backgroundColor: '#01655B',
              cornerRadius: '999px',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 'xl',
              action: {
                type: 'uri',
                label: '加入政波',
                uri: liffUrl(liffId, 'changevibe'),
              },
              contents: [
                {
                  type: 'text',
                  text: '加入政波',
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
});
