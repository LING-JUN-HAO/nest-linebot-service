import { TextMessageReq, FlexMessageReq } from 'src/line-message/types';
import { liffUrl } from './liff-url';

const COVER_IMAGE_URL =
  'https://res.cloudinary.com/dj4rwmdiu/image/upload/v1795237356/%E6%8A%95%E7%A5%A8%E6%8F%90%E9%86%92_%E5%B0%81%E9%9D%A2_anw4kg.png';

export const VOTE_REMINDER_TEXT: TextMessageReq = {
  text: `大家好，我是温世政！\n投票前，先約家人朋友一起出門吧。\n做一張專屬邀請卡，\n\n傳給你最想約的人，我們一起為家鄉加油！`,
};

export const createVoteReminderReply = (liffId: string): FlexMessageReq => ({
  altText: '投票日，約你一起出門',
  contents: {
    type: 'bubble',
    size: 'giga',
    hero: {
      type: 'image',
      url: COVER_IMAGE_URL,
      size: 'full',
      aspectRatio: '822:367',
      aspectMode: 'cover',
      action: {
        type: 'uri',
        label: '開始製作',
        uri: liffUrl(liffId, 'votereminder'),
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
          paddingTop: '20px',
          paddingStart: '20px',
          paddingEnd: '20px',
          paddingBottom: '20px',
          spacing: 'md',
          contents: [
            {
              type: 'text',
              text: '投票日，約你一起出門',
              weight: 'bold',
              size: '20px',
              color: '#1a1a1a',
            },
            {
              type: 'text',
              text: '想約哪位親友一起去投票？挑個你們的小約定，邀請卡幫你準備好，傳給他吧！',
              wrap: true,
              size: '15px',
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
                label: '開始製作',
                uri: liffUrl(liffId, 'votereminder'),
              },
              contents: [
                {
                  type: 'text',
                  text: '開始製作',
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
