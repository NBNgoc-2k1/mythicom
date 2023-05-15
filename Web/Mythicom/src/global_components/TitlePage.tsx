import React from 'react'
import taiji from '../assets/images/global/taiji.png'
import PropTypes from 'prop-types'

const TitlePage = (props: any) => {
    return (
        <div className={`${props.className} capitalize place-content-center items-center flex mb-8 text-3xl lg:text-5xl`}>
            <img src={taiji}
                className='w-10 lg:w-14'
            />
            <p className='mx-4 text-center'>{props.title}</p>
            <img src={taiji}
                className='w-10 lg:w-14'
                />
        </div>
    )
}

TitlePage.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
}

export default TitlePage
