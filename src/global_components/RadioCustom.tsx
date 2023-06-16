import React from 'react'

const RadioCustom = (props: any) => {    
    return (
        <label className={`cursor-pointer flex items-center text-lg sm:text-xl my-2 p-2 rounded-xl border border-brown
            ${props.checked && 'bg-dark-grey text-white'}
        `}
            >
            <input type='radio' name={props.name} value={props.data.content}
                className='cursor-pointer focus:outline-none focus:ring-0 focus:ring-offset-0'
                checked={props.checked}
                onChange={(event) => props.onChange(event)}
            />
            <img src={props.data.imgSrc}
                className={`h-10 ${props.data.imgSrc ? 'mx-4 ' : 'ml-4'} rounded-lg`}
            />
            {props.data.content}
        </label>
    )
}

export default RadioCustom
