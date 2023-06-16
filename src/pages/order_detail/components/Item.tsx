import React, { useState } from 'react'
import { currencyFormatter } from '../../../services'
import AppButton from '../../../global_components/AppButton'
import { AddToCart } from '../../../globalFunctions'
import Modal from '../../../global_components/Modal'
import StarRating from '../../../global_components/StarRating'

const Item = (props: any) => {
    const [openRatePopup, setRatePopup] = useState(false)
    const BuyAgain = () => {
        const productInfo = {
            ...props.data,
            quantity: 1
        }
        AddToCart(productInfo)
    }

    const ToggleRatePopup = () => {
        setRatePopup(!openRatePopup)

    }

    const RateProduct = () => {
    }

    return (
        <div className='bg-dark-silver lg:table-row text-xl last:border-none border-b border-dark-grey'>
            <div className='w-full lg:table-cell p-4'>
                <div className='flex'>
                    <img src={props.data.img}
                        className='w-20 h-20'
                    />
                    <div className='ml-4'>
                        <p className='max-sm:text-base line-clamp-2'>{props.data.name}</p>
                        <div className='flex items-center justify-between lg:hidden'>
                            <div className='flex items-center lg:hidden'>
                                <p className='max-sm:text-lg font-semibold inline-block mr-2'>{currencyFormatter.format(props.data.price)}</p>
                                <span className='inline-block max-sm:text-lg mr-2'>
                                    x{props.data.quantity}
                                </span>
                            </div>
                            <AppButton content='rate' className='lg:hidden !bg-gold !text-dark-grey' onClick={() => {
                                ToggleRatePopup()
                            }} />
                        </div>
                        <div className='hidden lg:flex text-white'>
                            <AppButton content='rate' className='!bg-gold !text-dark-grey' onClick={() => {
                                ToggleRatePopup()
                            }} />
                            <AppButton content='Buy again' className='ml-4 !bg-dark-grey' onClick={BuyAgain} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='hidden lg:table-cell p-4 align-top text-center'>
                {currencyFormatter.format(props.data.price)}
            </div>
            <div className='hidden lg:table-cell p-4 align-top text-center'>
                {props.data.quantity}
            </div>
            <div className='hidden lg:table-cell p-4 align-top text-center'>
                {currencyFormatter.format(0)}
            </div>
            <div className='hidden lg:table-cell p-4 align-top text-center'>
                {currencyFormatter.format(props.data.quantity * props.data.price)}
            </div>
            {/* <Modal open={openRatePopup} onClose={ToggleRatePopup}>
                <div className='mx-auto w-4/5 lg:w-1/3 rounded-xl bg-white'>
                    <p className='bg-brown text-white text-center py-4 rounded-t-xl'>Product Rating</p>
                    <div className='my-4'>
                        <p className='py-3 text-center'>Amazing </p>
                        <StarRating star={0} className='justify-center' />
                    </div>
                </div>
            </Modal> */}
        </div>
    )
}

export default Item
