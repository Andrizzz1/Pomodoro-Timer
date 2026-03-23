import { useState, useEffect } from "react"
import RefreshIcon from "./ui/refresh-icon"
import { PauseIcon } from "@heroicons/react/24/outline";
import PlayerIcon from "./ui/player-icon";

function Countdown({ duration, isRunning, activeButton, hasStarted }) {
    const [time, setTime] = useState(duration)

    useEffect(() => {
        setTime(duration)
    }, [duration])

    useEffect(() => {
        if (!isRunning) return
        if (time <= 0) return
        const interval = setInterval(() => {
            setTime(prev => prev - 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [time, isRunning])

    const minutes = Math.floor(time / 60)
    const secs = time % 60
    const format = (n) => String(n).padStart(2, "0")

    const descriptions = {
        work: "Focusing on deep work",
        short: "On short break",
        long: "On long break",
    }
    const description = descriptions[activeButton]

    // Show placeholder before user clicks Start
    if (!hasStarted) {
        return (
            <div className="text-center">
                <p className="text-center text-sm opacity-80 uppercase font-semibold tracking-widest">start working now</p>
                <h1 className="uppercase font-bold text-7xl text-[#864958]">{format(minutes)}:{format(secs)}</h1>
            </div>
        )
    }

    return (
        <div>
            <p className="text-center text-sm opacity-80 uppercase font-semibold tracking-widest">{description}</p>
            <h1 className="uppercase font-bold text-7xl text-[#864958]">{format(minutes)}:{format(secs)}</h1>
        </div>
    )
}

function Components() {
    const [minute, setMinute] = useState(25 * 60)
    const [activeButton, setActiveButton] = useState("work")
    const [isRunning, setIsRunning] = useState(false)
    const [hasStarted, setHasStarted] = useState(false)  // tracks first click

    const getDuration = () => {
        if (activeButton === "work") return 25 * 60
        if (activeButton === "short") return 5 * 60
        if (activeButton === "long") return 20 * 60
    }

    const handleModeChange = (mode, time) => {
        setActiveButton(mode)
        setMinute(time)
        setIsRunning(false)
        setHasStarted(false)  // reset placeholder when switching modes
    }

    const handleReset = () => {
        setMinute(getDuration())
        setIsRunning(false)
        setHasStarted(false)  // reset placeholder on reset
    }

    const handleStartPause = () => {
        setIsRunning(!isRunning)
        setHasStarted(true)   // mark as started on first click
    }

    return (
        <section className="flex justify-center items-center flex-col">
            <div className="bg-[#ffffff] w-xl h-[500px] rounded-4xl flex justify-around flex-col items-center mt-14">
                <div className="flex p-1 bg-[#d6dfda] rounded-3xl w-fit gap-4">
                    <button
                        onClick={() => handleModeChange("work", 25 * 60)}
                        className={`cursor-pointer py-0.5 px-2 rounded-3xl font-semibold ${activeButton === "work" ? "bg-pink-400 text-[#4d1b29]" : "bg-transparent hover:text-[#4d1b29]"}`}>
                        Work
                    </button>
                    <button
                        onClick={() => handleModeChange("short", 5 * 60)}
                        className={`cursor-pointer py-0.5 px-2 rounded-3xl font-semibold ${activeButton === "short" ? "bg-pink-400 text-[#4d1b29]" : "hover:text-[#4d1b29]"}`}>
                        Short Break
                    </button>
                    <button
                        onClick={() => handleModeChange("long", 20 * 60)}
                        className={`cursor-pointer py-0.5 px-2 rounded-3xl font-semibold ${activeButton === "long" ? "bg-pink-400 text-[#4d1b29]" : "hover:text-[#4d1b29]"}`}>
                        Long Break
                    </button>
                </div>

                <Countdown
                    duration={minute}
                    isRunning={isRunning}
                    activeButton={activeButton}
                    hasStarted={hasStarted}
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
            <div className="w-xl">
                <div className="flex justify-between p-1">
                    <p>progress</p>
                    <p>0%</p>
                </div>
                <div className="bg-[#d6dfda] w-full h-1.5 rounded-3xl"></div>
            </div>
        </section>
    )
}

export default Components