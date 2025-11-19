import {doc, getFirestore, onSnapshot} from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import {userPath} from './const';

export const useUserPresence = (userId: string) => {
  const [online, setOnline] = useState<boolean>(false);
  const [lastSeen, setLastSeen] = useState<Date | null>(null);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const db = getFirestore();
    const userDocRef = doc(db, userPath, userId);

    const unsubscribe = onSnapshot(userDocRef, snapshot => {
      if (!snapshot.exists()) {
        setOnline(false);
        setLastSeen(null);
        return;
      }

      const data = snapshot.data();
      if (data) {
        setOnline(data.state === 'online');
        setLastSeen(data.lastSeen?.toDate?.() ?? null);
      }
    });

    return () => unsubscribe();
  }, [userId]);

  return {online, lastSeen};
};
