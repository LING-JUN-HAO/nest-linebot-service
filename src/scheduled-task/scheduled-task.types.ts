export type MessageKey = 'START' | 'CHANGE_VIBE';

export interface Schedule {
  messages: MessageKey[];
}
