import React from 'react'
import TitlePage from '../../../../global_components/TitlePage'
import OrderSummary from './components/OrderSummary'

const OrderList = () => {
    return (
        <div>
            <TitlePage title='my orders' />
            <OrderSummary />
            <OrderSummary />
        </div>
    )
}

export default OrderList
