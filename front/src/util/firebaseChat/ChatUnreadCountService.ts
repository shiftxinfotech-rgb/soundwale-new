import {getAuth} from '@react-native-firebase/auth';
import {
  collection,
  FirebaseFirestoreTypes,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  where,
} from '@react-native-firebase/firestore';
import {chatCategories, chatPath} from './const';
const auth = getAuth();

let currentUnreadCount = 0;
let currentUserId: string | null = null;
let globalListener: (() => void) | null = null;
const subscribers = new Set<(count: number) => void>();

const updateSubscribers = (count: number) => {
  currentUnreadCount = count;
  subscribers.forEach(cb => cb(count));
};

export class ChatUnreadCountService {
  static startRealtimeListener(userId: string) {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      updateSubscribers(0);
      return;
    }

    if (!userId) {
      updateSubscribers(0);
      return;
    }

    if (currentUserId === userId && globalListener) {
      console.log('🔄 Already listening for user', userId);
      return;
    }

    if (globalListener) {
      console.log('🔄 Cleaning up previous listener for user', currentUserId);
      globalListener();
      globalListener = null;
    }

    console.log('🔄 Starting listener for user', userId);
    currentUserId = userId;

    const db = getFirestore();
    const unsubscribes: (() => void)[] = [];
    const categoryCounts: Record<string, number> = {};

    const updateMergedCount = () => {
      const total = Object.values(categoryCounts).reduce((a, b) => a + b, 0);
      updateSubscribers(total);
    };

    chatCategories.forEach(category => {
      if (!category) {
        return;
      }
      let colRef = collection(db, `${chatPath}_${category}`);
      const q = query(
        colRef,
        where('users', 'array-contains', userId),
        orderBy('lastMessageTime', 'desc'),
      );

      const unsub = onSnapshot(
        q,
        snapshot => {
          let count = 0;
          snapshot.forEach(doc => {
            const data = doc.data() as FirebaseFirestoreTypes.DocumentData;

            if (data.deletedFor?.hasOwnProperty(userId)) {
              return;
            }

            const lastMessageTime = data.lastMessageTime?.toMillis?.() ?? 0;
            const userReadTime =
              data.readReceipts?.[String(userId)]?.toMillis?.() ?? 0;
            const lastMessageBy = data.lastMessageBy;

            if (
              String(lastMessageBy) !== String(userId) &&
              lastMessageTime > userReadTime
            ) {
              count += 1;
            }
          });

          categoryCounts[category] = count;
          updateMergedCount();
        },
        error => {
          console.error(`❌ Error listening to ${category}:`, error);
          categoryCounts[category] = 0;
          updateMergedCount();
        },
      );
      unsubscribes.push(unsub);
    });

    globalListener = () => {
      unsubscribes.forEach(fn => fn());
      globalListener = null;
    };
  }

  static stopRealtimeListener() {
    if (globalListener) {
      console.log('🔄 Stopping listener for user', currentUserId);
      globalListener();
      globalListener = null;
    }
    currentUserId = null;
  }

  static subscribe(callback: (count: number) => void) {
    subscribers.add(callback);
    callback(currentUnreadCount);

    return () => {
      subscribers.delete(callback);
      console.log(
        '📡 ChatUnreadCountService: Subscriber removed, total subscribers:',
        subscribers.size,
      );
    };
  }

  static getCurrentCount(): number {
    return currentUnreadCount;
  }

  static isListening(): boolean {
    return globalListener !== null;
  }

  static getCurrentUserId(): string | null {
    return currentUserId;
  }

  static reset() {
    this.stopRealtimeListener();
    currentUnreadCount = 0;
    subscribers.clear();
  }
}
