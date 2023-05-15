import React from 'react'
import { currencyFormatter } from '../../../services'

const SelectedProduct = (props: any) => {
    return (
        <>
            <div className='flex'>
                <img src='https://i.pinimg.com/474x/1c/1d/37/1c1d37cbcd7ea724fc04c52c4bca3ace.jpg'
                    className='w-20 h-20'
                />
                <div className='mx-3'>
                    <p className='mr-4 font-bold line-clamp-2 text-white'>1/6 Story of A Journey to The West - Sha Wujing</p>
                    <p className='text-dark-silver'>Quant: 4</p>
                </div>
                <p className='text-xl my-auto sm:text-2xl text-gold '>{currencyFormatter.format(25)}</p>
            </div>
            <hr className='last:hidden border border-white my-2' />
        </>
    )
}

export default SelectedProduct
