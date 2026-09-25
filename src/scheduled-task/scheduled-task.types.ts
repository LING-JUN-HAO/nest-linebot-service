export type MessageKey = 'START' | 'HUNT_ENTRY';

export interface Schedule {
  messages: MessageKey[];
}
