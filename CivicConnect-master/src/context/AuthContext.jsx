import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        const currentUser = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          photo: firebaseUser.photoURL,
        };

        localStorage.setItem("cc_token", token);
        localStorage.setItem("cc_user", JSON.stringify(currentUser));
        setUser(currentUser);
      } else {
        localStorage.removeItem("cc_token");
        localStorage.removeItem("cc_user");
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = useCallback(async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    const token = await firebaseUser.getIdToken();
    const currentUser = {
      id: firebaseUser.uid,
      name: firebaseUser.displayName,
      email: firebaseUser.email,
      photo: firebaseUser.photoURL,
    };

    localStorage.setItem("cc_token", token);
    localStorage.setItem("cc_user", JSON.stringify(currentUser));
    setUser(currentUser);
    return currentUser;
  }, []);

  const register = useCallback(async (payload) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      payload.email,
      payload.password
    );
    const firebaseUser = userCredential.user;

    if (payload.name) {
      await updateProfile(firebaseUser, { displayName: payload.name });
    }

    await sendEmailVerification(firebaseUser);
    const token = await firebaseUser.getIdToken();
    const currentUser = {
      id: firebaseUser.uid,
      name: firebaseUser.displayName,
      email: firebaseUser.email,
      photo: firebaseUser.photoURL,
    };

    localStorage.setItem("cc_token", token);
    localStorage.setItem("cc_user", JSON.stringify(currentUser));
    setUser(currentUser);
    return currentUser;
  }, []);

  const forgotPassword = useCallback(async (email) => {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
    localStorage.removeItem("cc_token");
    localStorage.removeItem("cc_user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, forgotPassword, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
