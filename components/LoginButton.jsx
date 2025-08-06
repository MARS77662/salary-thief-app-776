import React from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../lib/firebase";

const LoginButton = ({ user, setUser }) => {
  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      console.log("登入成功：", result.user);
    } catch (err) {
      console.error("登入失敗：", err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error("登出失敗：", err);
    }
  };

  return (
    <div className="my-4">
      {user ? (
        <button onClick={logout} className="px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700">
          登出（{user.displayName}）
        </button>
      ) : (
        <button onClick={login} className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
          使用 Google 登入
        </button>
      )}
    </div>
  );
};

export default LoginButton;
