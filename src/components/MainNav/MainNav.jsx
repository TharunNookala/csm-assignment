import React from 'react'
import { LuLayoutDashboard } from 'react-icons/lu'
import { PiCubeFocusLight } from 'react-icons/pi'
import { AiOutlineMenuUnfold } from 'react-icons/ai'

const MainNav = ({ overviewMenu, setOverviewMenu }) => {
    return (
        <section className='w-full h-full flex sm:flex-col items-center justify-center px-2 lg:px-4 text-[#2B2A70]'>
            <div className='w-full h-full flex sm:flex-col justify-evenly sm:justify-start gap-2 p-1'>
                <button className={`flex items-center gap-4 p-2 hover:bg-gray-100 rounded-md ${overviewMenu && 'bg-gray-200'}`} onClick={() => { setOverviewMenu(!overviewMenu) }}>
                    <LuLayoutDashboard size={25} />
                    <span className='hidden lg:block text-sm font-normal active:font-semibold'>Overview</span>
                </button>
                <button className='flex items-center gap-4 p-2 hover:bg-gray-100 rounded-md'>
                    <AiOutlineMenuUnfold size={25} />
                    <span className='hidden lg:block text-sm font-normal active:font-semibold'>Video Segmentation</span>
                </button>
            </div>
            <div className='w-full flex items-center justify-center h-[10%] p-2'>
                <button className='flex items-center gap-4 p-2 hover:bg-gray-100 rounded-md w-full'>
                    <PiCubeFocusLight size={25} /><span className='hidden lg:block text-sm lg:text-base font-normal active:font-semibold'>Submit Feedback</span>
                </button>
            </div>
        </section>
    )
}

export default MainNav