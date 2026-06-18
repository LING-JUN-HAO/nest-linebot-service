export type MessageKey = 'DUANWU_START';

export interface Schedule {
  date: string;
  time?: string;
  messages: MessageKey[];
}

export interface ScheduledTaskPayload {
  lastSuccessAt?: string;
  now?: string;
  lookbackMinutes?: number;
}
