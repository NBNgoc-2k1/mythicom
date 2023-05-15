import React from 'react'
import sad_face from '../../../assets/images/error/sad_face.png'

const NoProduct = () => {
    return (
        <div className='my-16'>
            <img
                src={sad_face}
                alt="Sad Face"
                className="m-auto"
            />
            <p className="text-center text-4xl mt-8"
            >Oops...! There are no products that match your needs</p>
        </div>
    )
}

export default NoProduct
