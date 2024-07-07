import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../config/firebase/firebase-instances";
import Badge from "../types/badges/Badge";

const useBadges = () => {
  const badgesCollection = collection(firestore, "badges");

  const _generateBadgeUid = (ownerId: string, restAreaId: string): string => {
    return `${ownerId}:${restAreaId}`;
  };

  const getByOwnerId = async (ownerId: string): Promise<Badge[]> => {
    const q = query(badgesCollection, where("ownerId", "==", ownerId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((d) => d.data()) as Badge[];
  };

  const getByRestAreaId = async (restAreaId: string): Promise<Badge[]> => {
    const q = query(badgesCollection, where("restAreaId", "==", restAreaId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((d) => d.data()) as Badge[];
  };

  const add = async (ownerId: string, restAreaId: string): Promise<Badge> => {
    const badge: Badge = {
      level: 1,
      ownerId,
      restAreaId,
    };
    await setDoc(
      doc(badgesCollection, _generateBadgeUid(ownerId, restAreaId)),
      badge
    );
    return badge;
  };

  const getByOwnerIdAndRestAreaId = async (
    ownerId: string,
    restAreaId: string
  ): Promise<Badge | undefined> => {
    const snapshot = await getDoc(
      doc(badgesCollection, _generateBadgeUid(ownerId, restAreaId))
    );
    return snapshot.data() as Badge | undefined;
  };

  const getById = async (badgeId: string): Promise<Badge | undefined> => {
    const snapshot = await getDoc(doc(badgesCollection, badgeId));
    return snapshot.data() as Badge | undefined;
  };

  return {
    getByOwnerId,
    getByRestAreaId,
    getById,
    getByOwnerIdAndRestAreaId,
    add,
  };
};

export default useBadges;
