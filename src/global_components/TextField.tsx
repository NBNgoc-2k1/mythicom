import React from 'react'
import PropTypes from 'prop-types'
import IconButton from './IconButton'

const TextField = (props: any) => {
    return (
        <div className={`${props.className} relative text-xl max-lg:mb-8 my-4`}>
            
            <input id={props.label} className={`w-full h-10 px-3 rounded-lg border-2 border-placeholder cursor-text outline-none peer bg-light-silver
                    ${props.error && 'border-red border-2'}
                    focus:border-brown focus:outline-none focus:ring-0 text-lg
                `}
                required={props.required}
                value={props.value}
                type={props.type}
                placeholder={props.placeholder}
                onChange={(event) => props.onChange(event)}
            />
            <label htmlFor={props.label} className={`absolute flex items-center px-3 duration-300 left-0 transform capitalize cursor-text
                peer-focus:text-dark-grey peer-focus:-top-7 ${props.error && 'text-red'}
                ${props.label === undefined && 'hidden'}
                ${((props.value !== '' && props.value !== undefined) || (props.placeholder !== '' && props.placeholder !== undefined))
                    ? 'text-dark-grey -top-7' : 'top-1 text-placeholder'}
            `}>
                {props.label }
                <p className='text-xs ml-2'>{props.errorMessage}</p>
            </label>
            <IconButton icon={props.icon} className='absolute top-1.5 left-[85%]' onClick={props.iconClick} />
        </div>
    )
}

TextField.propsType = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.object,
    iconClick: PropTypes.func,
    placeholder: PropTypes.string,
    value:PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    className:PropTypes.string,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    required: PropTypes.bool
}

export default TextField
