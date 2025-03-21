type Message = '' | 'load' | 'emptyTitle' | 'add' | 'delete' | 'update';

export type Error = {
  isVisible: boolean;
  type: Message;
};
