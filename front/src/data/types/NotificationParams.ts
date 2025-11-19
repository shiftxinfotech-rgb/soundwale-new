export type NotificationResponse = {
  status: boolean;
  data: NotificationList[];
};
export type NotificationUnReadResponse = {
  status: boolean;
  message: string;
  data: {
    unread_count: number;
  };
};
export type NotificationDeleteRequest = {
  id: number;
};

export type NotificationList = {
  date: string;
  notifications: NotificationItem[];
};
export type NotificationItem = {
  id: number;
  title: string;
  body: string;
  type: string;
  created_at_human: string;
  read: number;
  relation_id: string;
  modules_type: string;
  categories_id: string;
};

export type NotificationFCMBean = {
  relation_id: string;
  type: string;
  modules_type: string;
  notification_id: string;
  categories_id: string;
};
