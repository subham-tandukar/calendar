import Image from 'next/image'
import React from 'react'

const Loading = () => {
    return (
        // <div className='ok-loader'>
        //      <Image width={200} height={30} src="/img/ok-calendar-logo.png" alt="Online Khabar Calendar" />
        // </div>
        <div className='ok-my__loader ok-main-loader'>
            <span className="loader"></span>
        </div>
    )
}

export default Loading