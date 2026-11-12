/** 組出 LIFF 連結，liffId 由環境變數 LIFF_ID 提供 */
export const liffUrl = (liffId: string, hash: string): string =>
  `https://liff.line.me/${liffId}#${hash}`;
