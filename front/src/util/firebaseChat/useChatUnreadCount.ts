import {useEffect, useState} from 'react';
import {ChatUnreadCountService} from './ChatUnreadCountService';

export const useChatUnreadCount = () => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const unsubscribe = ChatUnreadCountService.subscribe(setUnreadCount);
    return unsubscribe;
  }, []);

  return unreadCount;
};
