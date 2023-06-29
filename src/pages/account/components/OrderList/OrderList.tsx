import React, { useEffect, useRef, useState } from 'react'
import TitlePage from '../../../../global_components/TitlePage'
import OrderSummary from './components/OrderSummary'
import emptybox from '../../../../assets/images/account/box.png'
import AppButton from '../../../../global_components/AppButton'
import { useNavigate } from 'react-router-dom';
import { GetSingleData } from '../../../../api/CRUD_API'
import Loading from '../../../../global_components/Loading'

const OrderList = (props: any) => {
    const navigation = useNavigate()
    const [orderList, setOrderList] = useState<any>([])
    const isEffectRan = useRef(false)

    useEffect(() => {
        if (props.user && !isEffectRan.current){
            props.user.orders.map((orderId:any) => 
                GetSingleData('orders', orderId).then((order:any) => {
                    setOrderList((prevOrders:any) => [...prevOrders,order]);
                })
            )
            isEffectRan.current = true
        }
    }, [])

    return (
        <div>
            <TitlePage title='my orders' />
            {
                props.user.orders.length > 0 ?
                    <>
                        {
                            orderList.length > 0 ? orderList.map((product: any) => <OrderSummary data={product} />)
                                : <Loading />
                        }
                    </>
                    : <div>
                        <div className='mx-auto mb-8 w-4/5'>
                            <img src={emptybox} className='mx-auto' />
                            <p className='text-xl text-center mx-auto'>Oops, you have not buy our products yet. Look forward you'll do this in the future.</p>
                        </div>
                        <AppButton content='Continue shopping' onClick={() => { navigation('/') }}
                            className='text-white mx-auto'
                        />
                    </div>
            }
        </div>
    )
}

export default OrderList
