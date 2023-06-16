import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'

const Dropdown = (props: any) => {
    const handleChange = (e: any) => {
        props.onChange(e)
    }

    return (
        <div className={`sm:w-1/2 relative my-4 sm:my-2`}
        >
            <select className="text-xl sm:text-xl text-dark-grey w-full bg-light-silver focus:ring-brown focus:border-brown peer
                    rounded-lg h-10 cursor-pointer" id='country' name='country'
                onChange={handleChange}
            >
                {
                    props.dataSet.map((data: any) => <option selected={data === props.defaultValue}
                        value={data}
                    >
                        {data}</option>)
                }
            </select>
            <label className='capitalize left-0 absolute z-10 px-3 -translate-y-3 scale-90 text-placeholder peer-focus:text-brown bg-light-silver'
                >
                {props.label}</label>
        </div>
    )
}

export default Dropdown
