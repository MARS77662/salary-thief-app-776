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
        console.log("🎉 登入成功:", result.user)
      })
      .catch((err) => {
        console.error("❌ signInWithPopup 錯誤", err)
      })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50 text-black px-4">
      <div className="relative max-w-xs w-full">
        <img
          src="/login-cover.png"
          alt="封面圖"
          className="w-full rounded-lg shadow-lg"
        />
        <button
          onClick={handleLogin}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 
                     bg-yellow-400 hover:bg-yellow-500 text-black font-bold 
                     py-2 px-4 rounded-lg shadow 
                     min-w-[200px] text-base text-center"
        >
          使用 Google 登入
        </button>
      </div>
    </div>
  )
}
