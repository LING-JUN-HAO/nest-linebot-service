import { TemplateConfirmMessageReq } from 'src/line-message/types';

export const CONFIRM_REPLY: TemplateConfirmMessageReq = {
  altText: '確認通知訊息！',
  text: '你確定要這樣做嗎？',
  actions: [
    { type: 'message', label: '是', text: '是的，我確定' },
    { type: 'message', label: '否', text: '不是，我不要' },
  ],
};
