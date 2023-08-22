export interface Notification {
  notificationId: string;
  content: string;
  createDate: string;
  updateDate: string;
  notificationType: string;
  imageUrl: string;
  redirectUrl: string;
  actionType: string;
  isRead: boolean;
}
