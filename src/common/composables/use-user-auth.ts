import {
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const useUserAuth = () => {
  const auth = getAuth();

  const login = (
    email: string,
    password: string,
    onSuccess?: (userCred: UserCredential) => void,
    onFailed?: (errorCode: string) => void
  ) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        onSuccess && onSuccess(userCred);
      })
      .catch((err) => {
        onFailed && onFailed(err.code);
      });
  };

  const register = (
    email: string,
    password: string,
    onSuccess?: (userCred: UserCredential) => void,
    onFailed?: (errorCode: string) => void
  ) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        onSuccess && onSuccess(userCred);
      })
      .catch((err) => {
        onFailed && onFailed(err.code);
      });
  };

  const signInWithGoogle = (
    onSuccess?: (userCred: UserCredential) => void,
    onFailed?: (errorCode: string) => void
  ) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((userCred) => {
        onSuccess && onSuccess(userCred);
      })
      .catch((err) => {
        onFailed && onFailed(err.code);
      });
  };

  const logout = (
    onSuccess?: () => void,
    onFailed?: (errorCode: string) => void
  ) => {
    signOut(auth)
      .then(() => {
        onSuccess && onSuccess();
      })
      .catch((err) => {
        onFailed && onFailed(err.code);
      });
  };

  return {
    login,
    register,
    signInWithGoogle,
    logout,
  };
};
