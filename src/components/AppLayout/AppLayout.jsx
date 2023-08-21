import React, { useState } from 'react'
import MainNav from '../MainNav/MainNav'
import ActualContent from '../ActualContent/ActualContent'

const AppLayout = () => {
    const [overviewMenu, setOverviewMenu] = useState(false)

    return (
        <section className='w-screen h-full sm:h-[90%] flex flex-col sm:flex-row'>
            <div className='w-full border sm:w-[10%] lg:w-1/5 text-center px-1 lg:px-3'><MainNav overviewMenu={overviewMenu} setOverviewMenu={setOverviewMenu} /></div>
            {overviewMenu ?
                <div className='border flex-1 p-2'><ActualContent /></div>
                :
                <div className='border-[10px] border-black w-full h-full flex items-center justify-center p-4'>
                    <h2 className='text-3xl font-bold'>Generate the mask for Image by going to overview section.</h2>
                </div>}
        </section>
    )
}

export default AppLayout