import { useState, useEffect } from "react"
import RefreshIcon from "./ui/refresh-icon"
import { PauseIcon, XMarkIcon } from "@heroicons/react/24/outline";
import PlayerIcon from "./ui/player-icon";

function SettingsModal({ isOpen, onClose, settings, onSave }) {
    const [tempSettings, setTempSettings] = useState(settings)
    const [previewImage, setPreviewImage] = useState(settings.imageUrl)

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const imageUrl = reader.result
                setTempSettings({ ...tempSettings, imageUrl })
                setPreviewImage(imageUrl)
            }
            reader.readAsDataURL(file)
        }
    }

    if (!isOpen) return null

    const handleSave = () => {
        onSave(tempSettings)
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
            <div className={`${tempSettings.darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-3xl p-8 w-96 shadow-2xl max-h-[90vh] flex flex-col transition-colors`}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className={`text-2xl font-bold ${tempSettings.darkMode ? 'text-pink-300' : 'text-[#864958]'}`}>Settings</h2>
                    <button onClick={onClose} className="hover:opacity-70">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-4 overflow-y-auto pr-2" style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: tempSettings.darkMode ? '#f9a8d4 #374151' : '#f9a8d4 #f3f4f6'
                }}>
                    <style>{`
                        .space-y-4::-webkit-scrollbar {
                            width: 4px;
                        }
                        .space-y-4::-webkit-scrollbar-track {
                            background: ${tempSettings.darkMode ? '#374151' : '#f3f4f6'};
                            border-radius: 10px;
                        }
                        .space-y-4::-webkit-scrollbar-thumb {
                            background: #f9a8d4;
                            border-radius: 10px;
                        }
                        .space-y-4::-webkit-scrollbar-thumb:hover {
                            background: #f472b6;
                        }
                    `}</style>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Image</label>
                        <div className="flex flex-col gap-3">
                            {previewImage && (
                                <img src={previewImage} alt="preview" className="w-32 h-32 object-cover rounded-lg shadow-md mx-auto" />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className={`w-full px-3 py-2 border ${tempSettings.darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-pink-100 file:text-pink-700 hover:file:bg-pink-200 cursor-pointer`}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">Work (minutes)</label>
                        <input
                            type="number"
                            value={tempSettings.workDuration}
                            onChange={(e) => setTempSettings({ ...tempSettings, workDuration: Number(e.target.value) })}
                            className={`w-full px-3 py-2 border ${tempSettings.darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400`}
                            min="1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">Short Break (minutes)</label>
                        <input
                            type="number"
                            value={tempSettings.shortBreakDuration}
                            onChange={(e) => setTempSettings({ ...tempSettings, shortBreakDuration: Number(e.target.value) })}
                            className={`w-full px-3 py-2 border ${tempSettings.darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400`}
                            min="1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">Long Break (minutes)</label>
                        <input
                            type="number"
                            value={tempSettings.longBreakDuration}
                            onChange={(e) => setTempSettings({ ...tempSettings, longBreakDuration: Number(e.target.value) })}
                            className={`w-full px-3 py-2 border ${tempSettings.darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400`}
                            min="1"
                        />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-opacity-10 rounded-lg" style={{ backgroundColor: tempSettings.darkMode ? '#ffffff20' : '#00000010' }}>
                        <label className="text-sm font-semibold">Background Music</label>
                        <button
                            onClick={() => setTempSettings({ ...tempSettings, playMusic: !tempSettings.playMusic })}
                            className={`w-12 h-6 rounded-full transition-colors ${tempSettings.playMusic ? 'bg-pink-400' : 'bg-gray-300'}`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${tempSettings.playMusic ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-opacity-10 rounded-lg" style={{ backgroundColor: tempSettings.darkMode ? '#ffffff20' : '#00000010' }}>
                        <label className="text-sm font-semibold">Dark Mode</label>
                        <button
                            onClick={() => setTempSettings({ ...tempSettings, darkMode: !tempSettings.darkMode })}
                            className={`w-12 h-6 rounded-full transition-colors ${tempSettings.darkMode ? 'bg-pink-400' : 'bg-gray-300'}`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${tempSettings.darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    className="w-full mt-6 py-3 rounded-xl font-bold text-white shadow-lg hover:opacity-90 active:scale-95 transition-all"
                    style={{ background: "linear-gradient(135deg, #864958 0%, #ffb1c1 100%)" }}
                >
                    Save
                </button>
            </div>
        </div>
    )
}

function Countdown({ duration, isRunning, activeButton, hasStarted, onTimeChange, darkMode }) {
    const [time, setTime] = useState(duration)

    useEffect(() => {
        setTime(duration)
    }, [duration])

    useEffect(() => {
        if (!isRunning) return
        if (time <= 0) return
        const interval = setInterval(() => {
            setTime(prev => {
                const newTime = prev - 1
                onTimeChange(newTime)
                return newTime
            })
        }, 1000)
        return () => clearInterval(interval)
    }, [time, isRunning, onTimeChange])

    const minutes = Math.floor(time / 60)
    const secs = time % 60
    const format = (n) => String(n).padStart(2, "0")

    const descriptions = {
        work: "Focusing on deep work",
        short: "On short break",
        long: "On long break",
    }
    const description = descriptions[activeButton]

    if (!hasStarted) {
        return (
            <div className="text-center">
                <p className={`text-center text-sm opacity-80 uppercase font-semibold tracking-widest transition-colors duration-300 ${darkMode ? 'text-gray-300' : ''}`}>start working now</p>
                <h1 className={`uppercase font-bold text-7xl transition-colors duration-300 ${darkMode ? 'text-pink-300' : 'text-[#864958]'}`}>{format(minutes)}:{format(secs)}</h1>
            </div>
        )
    }

    return (
        <div>
            <p className={`text-center text-sm opacity-80 uppercase font-semibold tracking-widest transition-colors duration-300 ${darkMode ? 'text-gray-300' : ''}`}>{description}</p>
            <h1 className={`uppercase font-bold text-7xl transition-colors duration-300 ${darkMode ? 'text-pink-300' : 'text-[#864958]'}`}>{format(minutes)}:{format(secs)}</h1>
        </div>
    )
}

function Components({ showSettings: externalShowSettings, onCloseSettings, onDarkModeChange }) {
    const [settings, setSettings] = useState({
        imageUrl: "/img/monkey.jpg",
        workDuration: 25,
        shortBreakDuration: 5,
        longBreakDuration: 20,
        darkMode: false,
        playMusic: false
    })
    const [minute, setMinute] = useState(25 * 60)
    const [activeButton, setActiveButton] = useState("work")
    const [isRunning, setIsRunning] = useState(false)
    const [hasStarted, setHasStarted] = useState(false)
    const [currentTime, setCurrentTime] = useState(25 * 60)
    const [audioRef] = useState(new Audio())

    const handleCloseSettings = () => {
        onCloseSettings()
    }

    const getDuration = () => {
        if (activeButton === "work") return settings.workDuration * 60
        if (activeButton === "short") return settings.shortBreakDuration * 60
        if (activeButton === "long") return settings.longBreakDuration * 60
    }

    const handleSaveSettings = (newSettings) => {
        setSettings(newSettings)
        onDarkModeChange(newSettings.darkMode)
        const duration = activeButton === "work" ? newSettings.workDuration * 60 :
                        activeButton === "short" ? newSettings.shortBreakDuration * 60 :
                        newSettings.longBreakDuration * 60
        setMinute(duration)
        setCurrentTime(duration)
        setIsRunning(false)
        setHasStarted(false)

        if (newSettings.playMusic) {
            audioRef.src = './music/bgMusic.mp3'
            audioRef.loop = true
            audioRef.play()
        } else {
            audioRef.pause()
        }
    }

    const handleModeChange = (mode) => {
        setActiveButton(mode)
        const duration = mode === "work" ? settings.workDuration * 60 :
                        mode === "short" ? settings.shortBreakDuration * 60 :
                        settings.longBreakDuration * 60
        setMinute(duration)
        setCurrentTime(duration)
        setIsRunning(false)
        setHasStarted(false)
    }

    const handleReset = () => {
        const duration = getDuration()
        setMinute(duration)
        setCurrentTime(duration)
        setIsRunning(false)
        setHasStarted(false)
    }

    const handleStartPause = () => {
        setIsRunning(!isRunning)
        setHasStarted(true)
    }

    const progress = ((getDuration() - currentTime) / getDuration()) * 100

    return (
        <>
            <SettingsModal
                isOpen={externalShowSettings}
                onClose={handleCloseSettings}
                settings={settings}
                onSave={handleSaveSettings}
            />
            <section className="flex justify-center items-center flex-col transition-all duration-300">
                <div className={`relative ${settings.darkMode ? 'bg-gray-800' : 'bg-[#ffffff]'} w-xl h-[500px] rounded-4xl flex justify-around flex-col items-center mt-14 transition-all duration-300`}>
                    <img className="absolute w-36 bottom-0 -right-10 shadow-2xl rounded-2xl rotate-2 hover:rotate-0 transition-transform" src={settings.imageUrl} alt="pomodoro" />
                <div className={`flex p-1 ${settings.darkMode ? 'bg-gray-700' : 'bg-[#d6dfda]'} rounded-3xl w-fit gap-4 transition-all duration-300`}>
                    <button
                        onClick={() => handleModeChange("work")}
                        className={`cursor-pointer py-0.5 px-2 rounded-3xl font-semibold transition-all duration-300 ${activeButton === "work" ? "bg-pink-400 text-[#4d1b29]" : settings.darkMode ? "bg-transparent hover:text-pink-300 text-gray-300" : "bg-transparent hover:text-[#4d1b29]"}`}>
                        Work
                    </button>
                    <button
                        onClick={() => handleModeChange("short")}
                        className={`cursor-pointer py-0.5 px-2 rounded-3xl font-semibold transition-all duration-300 ${activeButton === "short" ? "bg-pink-400 text-[#4d1b29]" : settings.darkMode ? "hover:text-pink-300 text-gray-300" : "hover:text-[#4d1b29]"}`}>
                        Short Break
                    </button>
                    <button
                        onClick={() => handleModeChange("long")}
                        className={`cursor-pointer py-0.5 px-2 rounded-3xl font-semibold transition-all duration-300 ${activeButton === "long" ? "bg-pink-400 text-[#4d1b29]" : settings.darkMode ? "hover:text-pink-300 text-gray-300" : "hover:text-[#4d1b29]"}`}>
                        Long Break
                    </button>
                </div>

                <Countdown
                    duration={minute}
                    isRunning={isRunning}
                    activeButton={activeButton}
                    hasStarted={hasStarted}
                    onTimeChange={setCurrentTime}
                    darkMode={settings.darkMode}
                />

                <div className="flex gap-20 items-center">
                    <button onClick={handleReset} className="cursor-pointer">
                        <RefreshIcon className="w-8 h-8" />
                    </button>

                    <button
                        onClick={handleStartPause}
                        className="font-bold text-xl px-10 py-5 gap-2 rounded-3xl flex items-center cursor-pointer shadow-lg hover:opacity-90 active:scale-95 transition-all"
                        style={{ background: "linear-gradient(135deg, #864958 0%, #ffb1c1 100%)" }}>
                        {isRunning ? <PauseIcon className="w-6 h-6" /> : <PlayerIcon className="w-6 h-6" />}
                        {isRunning ? "Pause" : "Start"}
                    </button>

                    <div className="w-8 h-8" />
                </div>

                
            </div>
            <div className="w-xl transition-all duration-300">
                <div className="flex justify-between p-1">
                    <p className={`${settings.darkMode ? 'text-gray-300' : ''} transition-colors duration-300`}>progress</p>
                    <p className={`${settings.darkMode ? 'text-gray-300' : ''} transition-colors duration-300`}>{Math.round(progress)}%</p>
                </div>
                <div className={`${settings.darkMode ? 'bg-gray-700' : 'bg-[#d6dfda]'} w-full h-1.5 rounded-3xl overflow-hidden transition-all duration-300`}>
                    <div 
                        className="bg-pink-400 h-full rounded-3xl transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
            </section>
        </>
    )
}

export default Components