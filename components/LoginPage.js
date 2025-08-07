import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useEffect, useState } from "react"
import { app } from "../lib/firebase"

export default function LoginPage() {
  const [user, setUser] = useState(null)

  const handleLogin = async () => {
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      setUser(result.user)
    } catch (error) {
      console.error("登入失敗", error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 p-4">
      {/* Google 登入按鈕放最上面 */}
      {!user && (
        <button
          onClick={handleLogin}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded shadow mb-6"
        >
          使用 Google 登入
        </button>
      )}

      {/* 卡片區域 */}
      <div className="bg-gradient-to-b from-indigo-500 to-blue-400 p-8 rounded-xl shadow-lg text-white flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">歡迎來偷薪</h1>
        <img src="/login-cover.png" alt="Thief" className="w-40 h-40 mb-4" />
        <div className="flex gap-2">
          {/* 可以放金幣 icon */}
        </div>
      </div>

      {/* App 名稱文字 */}
      <p className="mt-6 text-lg font-semibold text-rose-500">
        💸 薪水小偷 Salary Thief
      </p>
    </div>
  )
}
