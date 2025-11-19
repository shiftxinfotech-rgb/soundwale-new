import {getDatabase, ref} from '@react-native-firebase/database';
import {
  doc,
  getFirestore,
  serverTimestamp,
  updateDoc,
} from '@react-native-firebase/firestore';
import {AppState} from 'react-native';
import {rdbPath, userPath} from './const';

export const monitorAppState = (userId: string) => {
  const db = getDatabase();
  const rdbRef = ref(db, `/${rdbPath}/${userId}`);
  const dbFirestore = getFirestore();
  const fsRef = doc(dbFirestore, userPath, userId);

  const updateOnline = () => {
    const onlineStatus = {
      state: 'online',
      lastSeen: serverTimestamp(),
    };
    rdbRef.set(onlineStatus);
    updateDoc(fsRef, onlineStatus);
  };

  const updateOffline = () => {
    const offlineStatus = {
      state: 'offline',
      lastSeen: serverTimestamp(),
      activeChatWithUid: null,
    };
    rdbRef.set(offlineStatus);
    updateDoc(fsRef, offlineStatus);
  };

  AppState.addEventListener('change', state => {
    if (state === 'active') {
      updateOnline();
    } else {
      updateOffline();
    }
  });
};
