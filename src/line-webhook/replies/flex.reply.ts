import { FlexMessageReq } from 'src/line-message/types';

export const FLEX_REPLY: FlexMessageReq = {
  altText: 'Antonio 電子名片',
  contents: {
    type: 'bubble',
    header: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: '熱愛解決問題的工程師',
          color: '#FFFFFF',
          weight: 'bold',
        },
      ],
      paddingAll: 'xxl',
    },
    hero: {
      type: 'image',
      url: 'https://res.cloudinary.com/dseg0uwc9/image/upload/v1755162683/2025%20IT%20%E9%90%B5%E4%BA%BA%E8%B3%BD/%E8%B2%93%E8%B2%93_wuk4j4.jpg',
      size: '100%',
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        { type: 'text', text: '凌俊豪 ｜ Antonio', weight: 'bold', size: 'lg' },
        {
          type: 'text',
          text: 'Software Development Engineer',
          size: 'sm',
          color: '#aaaaaa',
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            { type: 'text', text: '• 兩年前端開發實務經驗', size: 'sm' },
            {
              type: 'text',
              text: '• Angular、Vue、React 專案開發經驗',
              size: 'sm',
            },
            {
              type: 'text',
              text: '• Azure、Render 雲端部署伺服器經驗',
              size: 'sm',
            },
          ],
          spacing: 'md',
          paddingTop: 'sm',
          paddingBottom: 'sm',
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'box',
              layout: 'horizontal',
              contents: [
                {
                  type: 'image',
                  url: 'https://ling-jun-hao.github.io/Blog/images/icon100.png',
                  size: '30px',
                  flex: 0,
                },
                { type: 'text', text: '個人部落格' },
              ],
              alignItems: 'center',
              background: {
                type: 'linearGradient',
                angle: '115deg',
                startColor: '#f2f2f2',
                endColor: '#d9d9d9',
              },
              paddingTop: 'sm',
              paddingBottom: 'sm',
              paddingStart: 'md',
              action: {
                type: 'uri',
                label: 'action',
                uri: 'http://linecorp.com/',
              },
              offsetTop: 'md',
              spacing: 'md',
            },
            {
              type: 'box',
              layout: 'horizontal',
              contents: [
                {
                  type: 'image',
                  url: 'https://ithelp.ithome.com.tw/storage/favicons/favicon-32x32.png',
                  size: '30px',
                  flex: 0,
                },
                { type: 'text', text: 'IT 邦鐵人賽' },
              ],
              alignItems: 'center',
              background: {
                type: 'linearGradient',
                angle: '115deg',
                startColor: '#f2f2f2',
                endColor: '#d9d9d9',
              },
              paddingTop: 'sm',
              paddingBottom: 'sm',
              paddingStart: 'md',
              action: {
                type: 'uri',
                label: 'action',
                uri: 'http://linecorp.com/',
              },
              spacing: 'md',
            },
          ],
          spacing: 'xl',
        },
        { type: 'separator', margin: 'md' },
        {
          type: 'box',
          layout: 'horizontal',
          contents: [
            {
              type: 'image',
              url: 'https://static.licdn.com/aero-v1/sc/h/2if24wp7oqlodqdlgei1n1520',
              size: '40px',
              flex: 0,
            },
            {
              type: 'image',
              url: 'https://www.cake.me/favicons/apple-touch-icon.png',
              size: '40px',
              flex: 0,
            },
            {
              type: 'image',
              url: 'https://res.cloudinary.com/dseg0uwc9/image/upload/v1754640925/2025%20IT%20%E9%90%B5%E4%BA%BA%E8%B3%BD/github-brands-solid-full_r23cls.jpg',
              size: '40px',
              flex: 0,
            },
          ],
          justifyContent: 'center',
          spacing: 'lg',
          paddingTop: 'md',
        },
      ],
    },
    styles: {
      header: { backgroundColor: '#003366' },
    },
  },
};
