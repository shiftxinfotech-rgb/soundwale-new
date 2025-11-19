import {AuthData, ChatPreview, User} from '@data';
import {
  getAuth,
  signInAnonymously,
  signInWithCustomToken,
} from '@react-native-firebase/auth';
import {get, getDatabase, ref, update} from '@react-native-firebase/database';
import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  increment,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  startAfter,
  updateDoc,
  where,
} from '@react-native-firebase/firestore';
import {IMessage} from 'react-native-gifted-chat';
import {chatPath, rdbPath, userPath} from './const';

const firestore = getFirestore();
const database = getDatabase();
const auth = getAuth();
export class ChatHelper {
  static async createChat(
    productId: string,
    receiver: User,
    sender: User,
    productType: string = '',
  ) {
    try {
      const chatId = [productId, sender.id, receiver.id].sort().join('_');

      const chatCollection = `${chatPath}_${productType}`;
      console.log('chatCollection', chatCollection);

      const chatRef = doc(firestore, chatCollection, chatId);
      const existing = await getDoc(chatRef);
      if (existing.exists()) {
        const existingData = existing.data()! as ChatPreview;
        return {
          ...existingData,
          userInfo: {sender, receiver},
        };
      }

      const opponentRef = doc(firestore, userPath, receiver.id.toString());
      const opponentSnap = await getDoc(opponentRef);
      if (!opponentSnap.exists()) {
        await setDoc(opponentRef, {
          name: receiver.name ?? 'Unknown',
          avatar: receiver.avatar ?? '',
          phone: receiver.phone ?? '',
          state: 'offline',
          lastSeen: null,
          createdAt: serverTimestamp(),
        });
      }

      const chatObject = {
        _id: chatId,
        users: [String(sender.id), String(receiver.id)],
        threadId: chatId,
        productId: productId,
        lastMessageTime: serverTimestamp(),
        createdAt: serverTimestamp(),
        readReceipts: {
          [String(sender.id)]: serverTimestamp(),
          [String(receiver.id)]: null,
        },
      };
      await setDoc(chatRef, chatObject);
      return {
        ...chatObject,
        lastMessageTime: new Date().getTime(),
        createdAt: new Date().getTime(),
        lastMessage: '',
        userInfo: {sender, receiver},
      } as ChatPreview;
    } catch (error) {
      console.error('❌ Failed to create chat:', error);
      return null;
    }
  }

  static async sendNewMessage(
    chatId: string,
    message: IMessage,
    productType: string = '',
  ) {
    const chatCollection = `${chatPath}_${productType}`;
    const chatDocRef = doc(firestore, chatCollection, chatId);
    const messageRef = doc(
      collection(chatDocRef, 'messages'),
      message._id.toString(),
    );
    await setDoc(messageRef, {
      _id: message._id,
      text: message.text,
      user: message.user,
      createdAt: serverTimestamp(),
    });
    await updateDoc(chatDocRef, {
      lastMessage: message.text,
      lastMessageTime: serverTimestamp(),
      lastMessageBy: message.user._id,
    });
  }

  static async setPresence(userId: string) {
    if (!userId) {
      return;
    }

    const userStatusRTDB = ref(database, `/${rdbPath}/${userId}`);
    const userStatusFS = doc(firestore, userPath, userId);

    const isOffline = {
      state: 'offline',
      lastSeen: serverTimestamp(),
    };

    const isOnline = {
      state: 'online',
      lastSeen: serverTimestamp(),
    };

    const connectedRef = ref(database, '.info/connected');
    connectedRef.on('value', snapshot => {
      if (snapshot.val() === false) {
        return;
      }

      userStatusRTDB
        .onDisconnect()
        .set(isOffline)
        .then(() => {
          userStatusRTDB.set(isOnline);
          updateDoc(userStatusFS, isOnline);
        });
    });
  }

  static async createUserProfile(user: AuthData) {
    if (!user?.id) {
      return;
    }
    try {
      const userRef = doc(firestore, userPath, user.id.toString());
      await setDoc(
        userRef,
        {
          name: user.name,
          phone: user.mobile_number ?? '',
          email: user.email ?? '',
          avatar: user.image_url ?? '',
          state: 'offline',
          lastSeen: null,
          createdAt: serverTimestamp(),
        },
        {mergeFields: ['name', 'phone', 'email', 'avatar']},
      );
    } catch (error) {}
  }

  static async markChatAsRead(
    chatId: string,
    userId: string,
    productType: string = '',
  ) {
    const chatCollection = `${chatPath}_${productType}`;
    await updateDoc(doc(firestore, chatCollection, chatId), {
      [`readReceipts.${String(userId)}`]: serverTimestamp(),
    });
  }

  static async logoutUser() {
    await auth.signOut();
  }

  static async signInOrCreateUser() {
    try {
      const userCredential = await signInAnonymously(auth);
      return userCredential.user!;
    } catch (error) {
      console.error('❌ Failed to sign in:', error);
      return null;
    }
  }

  static async customLoginWithToken(token: string) {
    try {
      const userCredential = await signInWithCustomToken(auth, token);
      return userCredential.user!;
    } catch (error) {
      console.error('❌ Failed to sign in:', error);
      return null;
    }
  }

  static async deleteChatForUser(
    chatId: string,
    userId: string,
    productType: string = '',
  ) {
    const chatCollection = `${chatPath}_${productType}`;
    const chatRef = doc(firestore, chatCollection, chatId);
    await updateDoc(chatRef, {
      [`deletedFor.${userId}`]: serverTimestamp(),
    });
  }

  static async restoreChatIfDeleted(
    chatId: string,
    userId: string,
    productType: string = '',
  ) {
    console.log('restoreChatIfDeleted', chatId, userId, productType);
    const chatCollection = `${chatPath}_${productType}`;
    const chatRef = doc(firestore, chatCollection, chatId);
    await updateDoc(chatRef, {
      [`deletedFor.${userId}`]: deleteField(),
    });
  }

  static async deleteChat(userId: string, productType: string = '') {
    let lastDoc: any = null;
    while (true) {
      const chatCollection = `${chatPath}_${productType}`;
      const querySnapshot = query(
        collection(firestore, chatCollection, productType),
        where('users', 'array-contains', userId),
        orderBy('lastMessageTime', 'desc'),
        ...(lastDoc ? [startAfter(lastDoc)] : []),
        limit(100),
      );

      const snapshot = await getDocs(querySnapshot);
      if (snapshot.empty) {
        break;
      }
      const deletePromises = snapshot.docs.map(async (docSnap: any) => {
        const chatId = docSnap.id;
        const messagesRef = collection(
          doc(firestore, chatCollection, chatId),
          'messages',
        );
        const messagesSnapshot = await getDocs(messagesRef);

        const messageDeletePromises = messagesSnapshot.docs.map(
          (messageDoc: any) => deleteDoc(messageDoc.ref),
        );
        await Promise.all(messageDeletePromises);

        return deleteDoc(doc(firestore, chatCollection, chatId));
      });

      await Promise.all(deletePromises);

      lastDoc = snapshot.docs[snapshot.docs.length - 1];
      await new Promise(res => setTimeout(res, 200));
    }

    const opponentRef = doc(firestore, userPath, userId);
    await deleteDoc(opponentRef);
  }

  static async makeChatActive(chatId: string, userId: string) {
    const rtdbRef = ref(database, `/${rdbPath}/${userId}`);
    update(rtdbRef, {
      activeChatWithUid: chatId,
    });
  }

  static async makeChatInactive(userId: string) {
    console.log('userId,', `/${rdbPath}/${userId}`);
    const rtdbRef = ref(database, `/${rdbPath}/${userId}`);
    update(rtdbRef, {
      activeChatWithUid: null,
    });
  }

  static async updateUnreadCount(
    chatId: string,
    receiverId: string,
    productType: string = '',
  ) {
    const chatCollection = `${chatPath}_${productType}`;
    const chatDocRef = doc(firestore, chatCollection, chatId);
    console.log('chatCollection,', chatCollection);
    console.log('receiverId,', receiverId);

    await updateDoc(chatDocRef, {
      [`unreadCount.${receiverId}`]: increment(1),
      lastMessageTime: serverTimestamp(),
    });
  }

  static async resetUnread(
    chatId: string,
    receiverId: string,
    productType: string = '',
  ) {
    const chatCollection = `${chatPath}_${productType}`;
    const chatDocRef = doc(firestore, chatCollection, chatId);
    await updateDoc(chatDocRef, {
      [`unreadCount.${receiverId}`]: 0,
    });
  }

  static async getActiveChatID(userId: string) {
    const db = getDatabase();
    const rtdbRef = ref(db, `/${rdbPath}/${userId}/activeChatWithUid`);
    const snapshot = await get(rtdbRef);
    return snapshot.val();
  }
}
