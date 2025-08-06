// lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCjAU3kMQON2FLyRBrU6Mezc-dNjRx_qZk",
  authDomain: "salary-thief.firebaseapp.com",
  projectId: "salary-thief",
  storageBucket: "salary-thief.appspot.com",
  messagingSenderId: "192909412090",
  appId: "1:192909412090:web:b212af7fee9a207b0d2b43",
  measurementId: "G-915RDG3EJL"
}

// ✅ 確保只初始化一次
let app
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig)
  console.log("🚀 Firebase 初始成功")
} else {
  app = getApp()
  console.log("🔁 Firebase 已初始化，使用現有 app")
}

const auth = getAuth(app)
auth.languageCode = 'zh-TW' // ✅ 加入語言代碼可解 redirect bug

const provider = new GoogleAuthProvider()

export { app, auth, provider }
