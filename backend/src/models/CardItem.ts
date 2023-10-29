export interface CardItem {
  userId: string;
  createdAt: string;
  name: string;
  dueDate: string;
  completed: boolean;
  attachmentUrl?: string;
  cardId: string;
}
