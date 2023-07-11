import React from 'react'
import PropTypes from 'prop-types'

const Label = (props:any) => {
    return (
        <p className='text-dark-grey capitalize bg-gold w-fit text-2xl px-4 rounded-r-lg'>{props.content}</p>
    )
}

Label.propTypes = {
    content: PropTypes.string.isRequired,
}

export default Label
