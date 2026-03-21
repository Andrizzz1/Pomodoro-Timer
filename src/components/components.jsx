import { useState, useEffect } from "react"
import RefreshIcon from "./ui/refresh-icon"
import { PauseIcon } from "@heroicons/react/24/outline";
import PlayerIcon from "./ui/player-icon";

function Countdown({duration}){
    const [time, setTime] = useState(duration)
    
    useEffect(()=>{
        setTime(duration)
    },[duration])
    useEffect(()=>{
        if (time <=0) return
        const interval = setInterval(() =>{
            setTime(prev => prev -1)
        },1000)
        return () => clearInterval(interval)
    },[time])

    const minutes = Math.floor(time / 60)  // 1500 / 60 = 25
    const secs = time % 60                 // 1500 % 60 = 0
    const format = (n) => String(n).padStart(2, "0")
    //  Check the number BEFORE formatting
    if (isNaN(time)){
        return <h1 className="uppercase font-bold text-4xl text-[#864958]">Timer</h1>
    }

    return (<h1 className="uppercase font-bold text-4xl text-[#864958]">{format(minutes)}:{format(secs)}</h1>)
    
    
}

function Components(){
   const [Time, setTime] = useState()
   const [minute,setMinute] = useState(25*60)
   const [activeButton, setActiveButton] = useState("work")
   const [resetKey, setResetKey] = useState(0)

     const getDuration = () => {
        if (activeButton === "work") return 25 * 60
        if (activeButton === "short") return 5 * 60
        if (activeButton === "long") return 20 * 60
    }

    return <section className="flex justify-center items-center ">
        <div className=" bg-[#ffffff] w-xl h-[500px] rounded-2xl flex justify-around flex-col items-center ">
            <div className="flex  p-1 bg-[#d6dfda] rounded-3xl w-fit gap-4">
                <button onClick={()=>{setMinute(25 * 60);setActiveButton("work")}} className={`cursor-pointer  py-0.5 px-2  rounded-3xl font-semibold ${activeButton === "work"?"bg-pink-400 text-[#4d1b29]":"bg-transparent hover:text-[#4d1b29]"}`}>Work</button>
                <button onClick={()=>{setMinute(5 * 60); setActiveButton("short")}} className={`cursor-pointer  py-0.5 px-2  rounded-3xl font-semibold ${activeButton === "short"?"bg-pink-400 text-[#4d1b29]":"hover:text-[#4d1b29]"}`}>Short Break</button>
                <button onClick={()=>{setMinute(20 * 60); setActiveButton("long")}} className={`cursor-pointer  py-0.5 px-2  rounded-3xl font-semibold ${activeButton === "long"?"bg-pink-400 text-[#4d1b29]":"bg-transparen hover:text-[#4d1b29]"}`}>Long Break</button>
            </div> 
            <Countdown key={resetKey} duration={Time} />

        <div className="flex gap-20 items-center">
            <button onClick={() => { setTime(getDuration()); setResetKey(k => k + 1) }} >
                <RefreshIcon  className="w-8 h-8" />
            </button>
            
            <button onClick={()=>setTime(minute)} className="px-10 py-5 gap-1 rounded-3xl flex items-center cursor-pointer" style={{background: "linear-gradient(135deg, #864958 0%, #ffb1c1 100%)"}}>
                <PlayerIcon className="w-6 h-6" />
                Start
            </button>
            <PauseIcon className="w-8 h-8 cursor-pointer" />
        </div>
        </div>
    </section>
}


export default Components