import React, { useContext, useEffect, useState } from "react";
import { auth } from "../components/firebase/firebase";
const AuthContext = React.createContext();
export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function logout() {
    return auth.signOut();
  }
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }
  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }
  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }
  function getUserState() {
    return new Promise((resolve) => {
      auth.onAuthStateChanged(resolve);
    });
  }
  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubcribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updatePassword,
    updateEmail,
    getUserState,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
