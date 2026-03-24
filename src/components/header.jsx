import { AcademicCapIcon } from '@heroicons/react/24/solid' 
import GearIcon from './ui/gear-icon';
function Header({ onSettingsClick, darkMode }){
    return <div className={`flex items-center ${darkMode ? 'text-pink-300' : 'text-[#864958]'} p-3 justify-between flex-wrap gap-2`}>
        <div className='flex items-center gap-1'>
             <AcademicCapIcon className='w-6 sm:w-8' />
             <h1 className={`text-lg sm:text-2xl font-bold ${darkMode ? 'text-pink-300' : 'text-[#864958]'} tracking-tight font-headline`}>Pomodoro para sa mga TAMAD</h1>
        </div>
       
        <button onClick={onSettingsClick}>
            <GearIcon className={`h-5 w-5 sm:h-6 sm:w-6 ${darkMode ? 'text-pink-300' : 'text-[#864958]'}`} />
        </button>
    </div>
}

export default Header;