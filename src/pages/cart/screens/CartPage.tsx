import React from 'react'
import TitlePage from '../../../global_components/TitlePage'
import CartInfo from '../components/CartInfo'
import CartPriceSummary from '../components/CartPriceSummary'
import RequiredAuth from '../../error/screens/RequiredAuth'
import AppButton from '../../../global_components/AppButton'
import fastcart from '../../../assets/images/cart/shopping-cart.png'
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
    const navigation = useNavigate()

    return (<>
        {
            Object.keys(currentUser).length > 0 ?
                <div className='my-8 px-4'>
                    <TitlePage title='My Cart' />
                    {
                        currentUser.cart.length > 0 ?
                            <div className='justify-between 
                                lg:flex 
                                2xl:px-20'>
                                <CartInfo cartInfo={currentUser.cart} />
                                <CartPriceSummary />
                            </div>
                            :
                            <div className='bg-dark-silver rounded-xl py-10'>
                                <div className='mx-auto w-fit mb-8'>
                                    <img src={fastcart} className='mx-auto' />
                                    <p className='text-xl'>Your cart doesn't have any products now</p>
                                </div>
                                <AppButton content='Continue shopping' onClick={() => { navigation('/')}}
                                    className='text-white mx-auto'
                                />
                            </div>
                    }

                </div>
                : <RequiredAuth />
        }

    </>
    )
}

export default CartPage
