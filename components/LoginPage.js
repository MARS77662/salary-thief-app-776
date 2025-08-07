import React, { useEffect } from "react";
import { auth, provider } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";

export default function LoginPage() {
  useEffect(() => {
    console.log("🟩 顯示 LoginPage");
  }, []);

  const handleLogin = () => {
    console.log("👉 開始 signInWithPopup");
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("✨ 登入成功：", result.user);
      })
      .catch((err) => {
        console.error("❌ signInWithPopup 錯誤：", err);
      });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-yellow-50 text-black px-4">
      {/* 卡片區塊 */}
      <div className="relative bg-gradient-to-b from-blue-400 to-blue-600 p-8 rounded-xl shadow-lg text-white w-full max-w-xs text-center">
        <h2 className="text-xl font-bold mb-4">歡迎來偷薪</h2>
        <img
          src="/login-cover.png"
          alt="封面圖"
          className="w-full rounded shadow mb-6"
        />
        
        {/* Google 登入按鈕 */}
        <button
          onClick={handleLogin}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg shadow"
        >
          使用 Google 登入
        </button>
      </div>

      {/* 底部標題 */}
      <h1 className="text-xl font-bold mt-6 text-pink-600">
        🧧 薪水小偷 Salary Thief
      </h1>
    </div>
  );
}
