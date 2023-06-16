import React from 'react'
import taiji from '../assets/images/global/colortaiji.png'
import './global_style.css'

const Loading = () => {
    return (
        <div className="flex flex-col items-center my-12 h-72">
            <img src={taiji} 
                className='rotate h-auto'
            />
            <p className="m-auto text-3xl sm:text-5xl"
            >Waiting a moment ...</p>
        </div>
    )
}

export default Loading
