import React from 'react'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { BiSolidUser } from 'react-icons/bi'

const Header = () => {
    return (
        <header className='w-screen h-[12%] px-6 py-2 text-black flex items-center justify-between border-2 bg-[rgba(255, 255, 255, 0.6)]'>
            <div className='text-lg font-bold'>LOGO</div>
            <div className='flex items-center space-x-4 p-1 justify-between'>
                <select name='instructions' id='instructions' className='outline-none bg-transparent cursor-pointer'>
                    <option value="none">Instructions</option>
                    <option value="www.google.com">Capture instructions</option>
                    <option value="www.instagram.com">Usage instructions</option>
                </select>
                <button className='bg-gray-100 p-1 rounded-full'><IoMdNotificationsOutline size={25} /></button>
                <button className='bg-gray-100 p-1 rounded-full'><BiSolidUser size={23} /></button>
            </div>
        </header>
    )
}

export default Header