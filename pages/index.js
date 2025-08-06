import { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged, getRedirectResult } from "firebase/auth"
import { app } from "../lib/firebase"
import SalaryThiefApp from "../components/SalaryThiefApp.jsx"
import LoginPage from "../components/LoginPage"

export default function Home() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [checkingRedirect, setCheckingRedirect] = useState(true)

  useEffect(() => {
    const auth = getAuth(app)

    console.log("🔄 useEffect 開始執行")

    // 嘗試抓取 redirect 的登入結果
    getRedirectResult(auth)
      .then((result) => {
        console.log("👉 getRedirectResult result:", result)
        if (result?.user) {
          console.log("✅ getRedirectResult user:", result.user)
          setUser(result.user)
        } else {
          console.log("⚠️ getRedirectResult 沒有 user")
        }
      })
      .catch((err) => {
        console.error("🔴 Redirect 錯誤", err)
      })
      .finally(() => {
        console.log("🛑 Redirect 檢查結束，切換 checkingRedirect = false")
        setCheckingRedirect(false)
      })

    // 監聽登入狀態
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("📡 onAuthStateChanged user:", firebaseUser)
      setUser(firebaseUser)
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // 還在等 redirect 或首次載入，不要顯示登入頁
  if (isLoading || checkingRedirect) {
    console.log("🌀 等待中... isLoading:", isLoading, "checkingRedirect:", checkingRedirect)
    return <div className="text-center mt-20">🚀 載入中...</div>
  }

  // 尚未登入，顯示登入頁
  if (!user) {
    console.log("👀 尚未登入，顯示 LoginPage")
    return <LoginPage />
  }

  // 已登入，顯示主畫面
  console.log("✅ 已登入，顯示 SalaryThiefApp，user:", user)
  return <SalaryThiefApp user={user} />
}
