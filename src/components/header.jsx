import { AcademicCapIcon } from '@heroicons/react/24/solid' 
import GearIcon from './ui/gear-icon';
function Header(){
    return <div className='flex items-center text-[#864958] p-3 justify-between'>
        <div className='flex items-center gap-1'>
             <AcademicCapIcon className='w-8' />
             <h1 className="text-2xl font-bold text-[#864958] tracking-tight font-headline ">Pomodoro para sa mga TAMAD</h1>
        </div>
       
        <GearIcon className="h-6 w-6 text-[#864958]" />
    </div>
}

export default Header;