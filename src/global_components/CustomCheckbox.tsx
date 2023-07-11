import React from 'react'
import '../tailwind.css'
import PropTypes from 'prop-types'

const CustomCheckbox = (props: any) => {
    return (
        <>
            {
                props.value === '' ?
                    <></>
                    : <label className='text-2xl capitalize cursor-pointer'>
                        <input type='checkbox' className='checkbox'
                            checked={props.isChecked} onChange={props.onChange} />
                        {props.value}
                    </label>
            }
        </>

    )
}

CustomCheckbox.propTypes = {
    value: PropTypes.string,
    isChecked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
}


export default CustomCheckbox