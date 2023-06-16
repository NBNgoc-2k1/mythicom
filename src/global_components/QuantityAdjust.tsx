import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import IconButton from './IconButton'
import PropTypes from 'prop-types'
import { errorSnackbar } from '../services'

const QuantityAdjust = (props: any) => {
    return (
        <div className={`flex bg-light-silver justify-center h-10 rounded-full border border-dark-grey ${props.className}`}>
            <IconButton icon={faMinus}
                className={`rounded-l-full w-[30%] text-center flex items-center justify-center
                ${props.initValue > 1 && 'bg-dark-grey text-white'}  
            `}
                disabled={props.initValue == 1}
                onClick={() => props.onChange(props.initValue - 1)}
            />
            <input value={props.initValue} min='1' className='text-center w-[46%] text-dark-grey focus:ring-0 focus:ring-offset-0
                focus:outline-none
                '
                onChange={(e) => {
                    if (e.target.value !== '') {
                        props.onChange(parseInt(e.target.value, 10))
                    }
                    else props.onChange(1)
                }}
                onBlur={(e) => {
                    if (e.target.value !== '') {
                        if (e.target.value > props.inventory) {
                            props.onChange(props.inventory)
                            errorSnackbar('Not enough stock')
                        }
                        else props.onChange(parseInt(e.target.value, 10))
                    }
                    else props.onChange(1)
                }}
            />
            <IconButton icon={faPlus}
                className={`rounded-r-full w-[30%] text-center flex items-center justify-center
            ${props.initValue < props.inventory && 'bg-dark-grey text-white'}
            `}
                disabled={props.initValue >= props.inventory}
                onClick={() => props.onChange(props.initValue + 1)}
            />
        </div>
    )
}

QuantityAdjust.propTypes = {
    initValue: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string
}


export default QuantityAdjust
