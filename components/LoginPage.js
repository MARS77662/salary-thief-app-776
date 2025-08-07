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
        // 登入成功後會自動觸發 onAuthStateChanged
      })
      .catch((err) => {
        console.error("❌ signInWithPopup 錯誤", err)
      })
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-yellow-50 px-4">
      <div className="relative w-full max-w-xs">
        {/* 登入主視覺圖片 */}
        <img
          src="/login-cover.png"
          alt="登入封面"
          className="w-full rounded-xl shadow-lg"
        />

        {/* 登入按鈕 → 壓在圖片內的底部 */}
        <button
          onClick={handleLogin}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg shadow"
        >
          使用 Google 登入
        </button>
      </div>

      {/* 下方標語 */}
      <p className="mt-4 text-pink-600 font-bold">
        🧧 薪水小偷 Salary Thief
      </p>
    </div>
  )
}
