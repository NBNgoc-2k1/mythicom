import React from 'react'
import TitlePage from '../../../global_components/TitlePage'
import CartInfo from '../components/CartInfo'
import OrderInfo from '../components/TempOrderInfo'
import RequiredAuth from '../../error/screens/RequiredAuth'

const CartPage = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
    return (<>
        {
            Object.keys(currentUser).length > 0 ?
                <div className='my-8 px-4'>
                    <TitlePage title='My Cart' />
                    <div className='justify-between 
                lg:flex 
                2xl:px-20'>
                        <CartInfo />
                        <OrderInfo />
                    </div>
                </div>
            : <RequiredAuth />
        }

    </>
    )
}

export default CartPage
