import React from 'react'
import { currencyFormatter } from '../../../../../services'

const SelectedProduct = (props: any) => {
    return (
        <>
            <hr className='first:hidden border border-white my-2' />
            <div className='flex'>
                <img src={props.data.img}
                    className='w-20 h-20'
                />
                <div className='flex justify-between w-full'>
                    <div className='mx-3 w-2/3'>
                        <p className='mr-4 font-bold line-clamp-2 text-white'>{props.data.name}</p>
                        <p className='text-dark-silver'>Quant: {props.data.quantity} </p>
                    </div>
                    <p className='text-xl my-auto sm:text-2xl text-gold'>{currencyFormatter.format(props.data.price * props.data.quantity)}</p>
                </div>
            </div>
        </>
    )
}

export default SelectedProduct
