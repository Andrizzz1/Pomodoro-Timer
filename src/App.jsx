import { useState } from "react"
import Header from "./components/header"
import Components from "./components/components"
function App() {
  const [showSettings, setShowSettings] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <section className={`${darkMode ? 'bg-gray-900' : 'bg-[#f2f8f4]'} h-screen px-32 transition-colors`}>
      <Header onSettingsClick={() => setShowSettings(true)} darkMode={darkMode} />
      <Components showSettings={showSettings} onCloseSettings={() => setShowSettings(false)} onDarkModeChange={setDarkMode} />
    </section>
  )
}

export default App
