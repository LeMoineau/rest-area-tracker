import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../config/firebase/firebase-instances";
import { UserData } from "../types/user/UserData";
import { User } from "firebase/auth";

export const useUserData = () => {
  const userDataCollection = collection(firestore, "user-data");

  const createNewUserData = async (user: User): Promise<UserData> => {
    const newUserData: UserData = {
      uid: user.uid,
      name: user.displayName ?? user.email!,
      avatar: user.photoURL,
      badges: [],
    };
    await setDoc(doc(userDataCollection, user.uid), newUserData);
    return newUserData;
  };

  const fetchUserData = async (uid: string): Promise<UserData | undefined> => {
    const userDataSnapshot = await getDoc(doc(userDataCollection, uid));
    return userDataSnapshot.data() as UserData | undefined;
  };

  return { createNewUserData, fetchUserData };
};
