import { useState, useEffect } from "react"
import RefreshIcon from "./ui/refresh-icon"
import { PauseIcon } from "@heroicons/react/24/outline";
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
    return <section className="flex justify-center items-center ">
        <div className=" bg-[#ffffff] w-xl h-[500px] rounded-2xl flex justify-around flex-col items-center ">
            <div className="flex  p-1 bg-[#d6dfda] rounded-3xl w-fit gap-4">
                <button onClick={()=>setTime(25 * 60)} className="cursor-pointer bg-pink-400 py-0.5 px-2  rounded-3xl text-[#4d1b29] font-semibold">Work</button>
                <button onClick={()=>setTime(5 * 60)} className="cursor-pointer py-0.5 px-2 rounded-3xl text-[#575d5a] font-semibold">Short Break</button>
                <button onClick={()=>setTime(20 * 60)} className="cursor-pointer py-0.5 px-2 rounded-3xl text-[#575d5a] font-semibold">Long Break</button>
            </div> 
            <Countdown duration={Time} />

        <div className="flex gap-20">
            <RefreshIcon />
            <button>Start</button>
            <PauseIcon />
        </div>
        </div>
    </section>
}


export default Components