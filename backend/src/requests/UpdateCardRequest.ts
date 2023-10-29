/**
 * Fields in a request to update a single CARD item.
 */
export interface UpdateCardRequest {
  name: string;
  dueDate: string;
  completed: boolean;
  attachmentLink: string;
}
