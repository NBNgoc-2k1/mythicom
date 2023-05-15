import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import PropTypes from 'prop-types'

const AppButton = (props: any) => {
    return (
        <div className={`flex justify-around w-fit px-4 my-2 rounded-full
            ${props.disabled ? '!bg-dark-silver cursor-not-allowed border border-dark-grey' : 'bg-teal cursor-pointer hover:brightness-75'}
            ${props.className}
        `}
            title={props.disabled ? `${props.title} to enable this button` : ''}
            onClick={() => {props.disabled ? () => {} : props.onClick()}}
        >
            <p className={`text-center my-1.5 sm:my-2.5 first-letter:uppercase lg:text-xl w-fit
                ${props.disabled && 'text-dark-grey'} 
                ${props.icon ? 'lg:text-xl' : 'lg:text-xl'} 
            `}
            >{props.content}</p>
            {
                props.icon && (
                    <FontAwesomeIcon icon={props.icon} className={`${props.iconClassName} ml-3 text-xl lg:text-2xl mt-4 ${props.disabled ? 'text-dark-grey' : 'text-white'}`}/>
                )
            }
        </div>
    )
}

AppButton.propTypes = {
    content: PropTypes.string.isRequired,
    icon: PropTypes.object,
    className: PropTypes.string,
    iconClassName: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    title:PropTypes.string
}

export default AppButton
