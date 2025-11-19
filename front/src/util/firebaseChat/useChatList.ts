import {ChatPreview, User} from '@data';
import {useUserInfo} from '@hooks';
import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  where,
} from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import {chatCategories, chatPath, userPath} from './const';

export const useUserChats = (currentUserId: string) => {
  const [chats, setChats] = useState<ChatPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const senderInfo = useUserInfo();

  useEffect(() => {
    if (!currentUserId) {
      return;
    }

    const db = getFirestore();
    const unsubscribes: (() => void)[] = [];
    let mergedChats: ChatPreview[] = [];

    const updateChats = () => {
      const sortedChats = mergedChats.sort(
        (a, b) => (b.lastMessageTime ?? 0) - (a.lastMessageTime ?? 0),
      );
      setChats(sortedChats);
      setLoading(false);
    };

    const mergeChats = (
      existing: ChatPreview[],
      newChats: ChatPreview[],
      _userId: string,
    ) => {
      const mergedMap = new Map<string, ChatPreview>();
      existing.forEach(c => {
        mergedMap.set(`${c._id}_${c.category}`, c);
      });
      newChats.forEach(c => {
        mergedMap.set(`${c._id}_${c.category}`, c);
      });
      const result = Array.from(mergedMap.values());
      return result;
    };

    chatCategories.forEach(category => {
      const colRef = collection(db, `${chatPath}_${category}`);
      const q = query(
        colRef,
        where('users', 'array-contains', currentUserId),
        orderBy('lastMessageTime', 'desc'),
      );

      const unsub = onSnapshot(
        q,
        async snapshot => {
          if (!snapshot) {
            updateChats();
            return;
          }

          // Collect opponent IDs
          const opponentIds = Array.from(
            new Set(
              snapshot.docs.flatMap(docSnap =>
                docSnap
                  .data()
                  .users.filter((uid: string) => uid !== currentUserId),
              ),
            ),
          );

          const opponentDocs: Record<string, User> = {};
          if (opponentIds.length > 0) {
            const batches = [];
            let idsCopy = [...opponentIds];
            while (idsCopy.length) {
              const batchIds = idsCopy.splice(0, 10);
              batches.push(
                getDocs(
                  query(
                    collection(db, userPath),
                    where('__name__', 'in', batchIds),
                  ),
                ),
              );
            }
            const results = await Promise.all(batches);
            results.forEach(r =>
              r.docs.forEach(d => {
                const u = d.data() as User;
                opponentDocs[d.id] = {
                  id: d.id,
                  name: u.name ?? 'Unknown',
                  avatar: u.avatar ?? '',
                  phone: u.phone ?? '',
                  isOnline: u.isOnline ?? false,
                  lastSeen: u.lastSeen ?? null,
                };
              }),
            );
          }
          const currentDeletedIds: string[] = [];
          const chatList: ChatPreview[] = snapshot.docs
            .map(docSnap => {
              const data = docSnap.data();
              const userIdStr = String(currentUserId);
              const chatId = docSnap.id;
              if (data.deletedFor?.hasOwnProperty(userIdStr)) {
                console.log('CHAT DELETED-', chatId);
                currentDeletedIds.push(chatId);
                return null;
              }
              const opponentId = data.users.find(
                (uid: string) => uid !== currentUserId,
              );
              const receiver = opponentDocs[opponentId] ?? {
                id: String(opponentId),
                name: '',
                avatar: '',
                phone: '',
                isOnline: false,
              };
              const sender: User = {
                id: String(currentUserId),
                name: senderInfo?.name ?? '',
                avatar: senderInfo?.image_url ?? '',
                phone: senderInfo?.mobile_number ?? '',
                isOnline: true,
              };

              const lastMessageTime = data.lastMessageTime?.toMillis?.() ?? 0;
              const userReadTime =
                data.readReceipts?.[String(currentUserId)]?.toMillis?.() ?? 0;
              const lastMessageBy = data.lastMessageBy;

              const isUnread =
                !!lastMessageBy &&
                String(lastMessageBy) !== String(currentUserId) &&
                lastMessageTime > userReadTime;

              return {
                _id: chatId,
                users: data.users,
                deletedFor: data.deletedFor ?? {},
                isTyping: data.isTyping,
                userInfo: {sender, receiver},
                threadId: data.threadId,
                productId: data.productId,
                lastMessage: data.lastMessage,
                lastMessageTime: data.lastMessageTime,
                createdAt: data.createdAt,
                readReceipts: data.readReceipts,
                unreadCount: data.unreadCount?.[currentUserId] ?? 0,
                isUnread,
                category,
              };
            })
            .filter(Boolean) as ChatPreview[];

          mergedChats = mergeChats(mergedChats, chatList, currentUserId);

          mergedChats = mergedChats.filter(
            chat => !currentDeletedIds.includes(chat._id),
          );
          updateChats();
        },
        err => {
          setError(err instanceof Error ? err : new Error(JSON.stringify(err)));
          setLoading(false);
        },
      );

      unsubscribes.push(unsub);
    });

    return () => unsubscribes.forEach(unsub => unsub());
  }, [
    currentUserId,
    senderInfo?.image_url,
    senderInfo?.mobile_number,
    senderInfo?.name,
  ]);

  return {chats, loading, error};
};
