import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const IconButton = (props:any) => {
    return (
        <div className={`cursor-pointer ${props.className} 
            ${props.disabled ? '!bg-dark-silver !cursor-not-allowed pointer-events-none' : 'hover:brightness-75'}
        `} onMouseDown={props.onClick} >
            <FontAwesomeIcon icon={props.icon} className={`${props.iconClass}  ${props.disabled && '!text-dark-grey'}`}/>
        </div>
    )
}

IconButton.propsTypes = {
    icon: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    iconClass: PropTypes.string.isRequired,
    disabled:PropTypes.bool
}

export default IconButton
