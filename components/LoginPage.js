import React, { useEffect } from "react"
import { auth, provider } from "../lib/firebase"
import { signInWithPopup } from "firebase/auth"

export default function LoginPage() {
  useEffect(() => {
    console.log("✅ 顯示 LoginPage")
  }, [])

  const handleLogin = () => {
    console.log("👉 開始 signInWithPopup")
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("🎉 登入成功：", result.user)
        // 登入成功後會自動觸發 onAuthStateChanged，跳轉畫面
      })
      .catch((err) => {
        console.error("❌ signInWithPopup 錯誤", err)
      })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 text-black px-4">
      <img src="/login-cover.png" alt="封面圖" className="max-w-xs rounded-lg shadow-lg mb-6" />
      <h1 className="text-3xl font-bold mb-4 text-rose-500">💸 薪水小偷 Salary Thief</h1>
      <button
        onClick={handleLogin}
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-lg shadow"
      >
        使用 Google 登入
      </button>
    </div>
  )
}
