import React, { useState, useEffect } from "react"
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"
import { app } from "../lib/firebase"

export default function SalaryThiefApp() {
  const [user, setUser] = useState(null)
  const [monthlySalary, setMonthlySalary] = useState(22000)
  const [workHoursPerMonth, setWorkHoursPerMonth] = useState(176)
  const [logs, setLogs] = useState([])

  const [currentTask, setCurrentTask] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [showGoldRain, setShowGoldRain] = useState(false)

  const actions = ["上廁所", "亂逛", "吃東西", "發呆", "滑手機", "閒聊", "小睡"]
  const salaryPerSecond = monthlySalary / (workHoursPerMonth * 60 * 60)

  useEffect(() => {
    const auth = getAuth(app)
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
      } else {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
          .then((result) => setUser(result.user))
          .catch((err) => console.error("登入失敗", err))
      }
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    let timer
    if (currentTask && startTime) {
      timer = setInterval(() => {
        const seconds = Math.floor((Date.now() - startTime) / 1000)
        setElapsedTime(seconds)

        if (seconds > 0 && seconds % 60 === 0) {
          setShowGoldRain(true)
          setTimeout(() => setShowGoldRain(false), 3000)
        }
      }, 1000)
    } else {
      setElapsedTime(0)
    }
    return () => clearInterval(timer)
  }, [currentTask, startTime])

  const handleSignOut = () => {
    const auth = getAuth(app)
    signOut(auth)
      .then(() => {
        setUser(null)
        window.location.reload()
      })
      .catch((err) => console.error("登出失敗", err))
  }

  const formatDuration = (seconds) => {
    const min = Math.floor(seconds / 60)
    const sec = seconds % 60
    return `${min} 分 ${sec} 秒`
  }

  const stopTask = () => {
    if (!currentTask || !startTime) return
    const endTime = Date.now()
    const totalSeconds = Math.floor((endTime - startTime) / 1000)
    const stolen = (totalSeconds * salaryPerSecond).toFixed(2)

    setLogs([
      ...logs,
      {
        task: currentTask,
        durationText: formatDuration(totalSeconds),
        stolen,
        time: new Date().toLocaleTimeString(),
      },
    ])
    setCurrentTask(null)
    setStartTime(null)
  }

  const startTask = (task) => {
    if (currentTask) return
    setCurrentTask(task)
    setStartTime(Date.now())
  }

  const totalStolen = logs.reduce((sum, log) => sum + parseFloat(log.stolen), 0).toFixed(2)
  const currentStolen = (elapsedTime * salaryPerSecond).toFixed(2)

  return (
    <div className="relative p-4 max-w-xl mx-auto font-sans bg-gradient-to-b from-pink-100 to-blue-100 min-h-screen">
      {showGoldRain && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <img src="/gold-rain.gif" alt="金幣灑落" className="w-full h-full object-cover" />
        </div>
      )}

      {user && (
        <div className="text-center mb-4">
          <p className="text-lg text-rose-600 font-semibold">
            🎉 歡迎來偷薪，{user.displayName}
          </p>
          <img
            src={user.photoURL}
            alt="使用者頭像"
            className="w-16 h-16 rounded-full mx-auto mt-2"
          />
          <div className="flex justify-center my-3">
            <button
              onClick={handleSignOut}
              className="flex flex-col items-center focus:outline-none hover:scale-110 transition-transform"
              title="登出 / 換帳號"
            >
              <img
                src="/logout.png"
                alt="登出"
                className="w-10 h-10 rounded-full border-2 border-pink-200 shadow-md"
              />
              <span className="mt-1 text-xs text-pink-400">登出</span>
            </button>
          </div>
        </div>
      )}

      <div className="mb-6 text-center">
        <img
          src="/cover.png"
          alt="薪水小偷封面"
          width={400}
          height={200}
          className="mx-auto rounded-lg shadow mb-4"
        />
        <h1 className="text-3xl font-extrabold mt-4 text-rose-500">💸 薪水小偷 App</h1>
      </div>

      <div className="mb-4">
        <label className="block mb-1">月薪（NT$）</label>
        <input
          type="number"
          value={monthlySalary}
          onChange={(e) => {
            const raw = e.target.value
            const cleaned = raw.replace(/^0+(?=\d)/, '')
            setMonthlySalary(Number(cleaned))
          }}
          className="border p-2 w-full rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">每月工時（小時）</label>
        <input
          type="number"
          value={workHoursPerMonth}
          onChange={(e) => {
            const raw = e.target.value
            const cleaned = raw.replace(/^0+(?=\d)/, '')
            setWorkHoursPerMonth(Number(cleaned))
          }}
          className="border p-2 w-full rounded"
        />
      </div>

      <div className="grid grid-cols-3 gap-2 mb-2">
        {actions.map((act) => (
          <button
            key={act}
            onClick={() => (currentTask ? null : startTask(act))}
            className={`p-2 rounded font-semibold shadow ${
              currentTask ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-400 hover:bg-yellow-500"
            }`}
            disabled={!!currentTask}
          >
            {act}
          </button>
        ))}
        <button
          onClick={stopTask}
          disabled={!currentTask}
          className={`
            col-span-3 p-2 rounded shadow font-bold transition-all
            ${currentTask
              ? "bg-red-500 hover:bg-red-600 text-white cursor-pointer"
              : "bg-gray-300 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          🛑 停止計時
        </button>
      </div>

      {currentTask && (
        <div className="col-span-3 text-center text-lg md:text-xl text-rose-600 font-bold mb-4">
          ⏱ 正在計時中：<strong>{currentTask}</strong> 中…（已過 <strong>{elapsedTime}</strong> 秒，偷了 <strong>NT${currentStolen}</strong>）
        </div>
      )}

      <h2 className="font-semibold text-lg mb-2">🧾 今日偷薪紀錄</h2>
      <ul className="text-sm space-y-1">
        {logs.map((log, index) => (
          <li key={index} className="border p-2 rounded bg-white shadow-sm">
            {log.time} ➜ {log.task}，{log.durationText}，偷了 NT${log.stolen}
          </li>
        ))}
      </ul>

      <div className="mt-6 text-right font-bold text-xl text-rose-600">
        🎉 總共偷了：NT${totalStolen}
      </div>

      <div className="mt-8 text-center">
        <a
          href="https://buymeacoffee.com/d477188l"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/bmc-button.webp"
            alt="Buy Me a Coffee"
            className="mx-auto w-48 hover:opacity-90 transition"
          />
        </a>
        <p className="text-xs text-gray-500 mt-2">
          謝謝你願意支持這隻偷薪熊 🧸☕
        </p>
      </div>
    </div>
  )
}

