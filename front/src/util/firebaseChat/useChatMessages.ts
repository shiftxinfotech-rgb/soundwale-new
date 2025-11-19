import {ChatMessage} from '@data';
import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import {chatPath} from './const';

export const useChatMessages = (
  productId: string,
  senderId: string,
  receiverId: string,
  productType: string,
) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId || !senderId || !receiverId || !productType) {
      return;
    }

    const db = getFirestore();
    const chatId = [productId, senderId, receiverId].sort().join('_');

    // Reference the specific collection for this productType
    const messagesRef = collection(
      doc(db, `${chatPath}_${productType}`, chatId),
      'messages',
    );
    const q = query(messagesRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, snapshot => {
      const loadedMessages: ChatMessage[] = snapshot.docs.map(item => {
        const data = item.data();
        return {
          _id: item.id,
          text: data.text,
          createdAt: data.createdAt?.toDate?.() ?? new Date(),
          user: data.user,
        };
      });

      setMessages(loadedMessages);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [productId, senderId, receiverId, productType]);

  return {messages, loading};
};
