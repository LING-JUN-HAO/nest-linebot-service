import { TemplateConfirmMessageReq } from 'src/line-message/types';

export const DODO_REPLY: TemplateConfirmMessageReq = {
  altText: 'DoDo測試通知訊息！',
  text: 'DoDo 圓滾滾嗎？',
  actions: [
    { type: 'message', label: '是', text: '你完蛋了' },
    { type: 'message', label: '否', text: '你是誰' },
  ],
};
