import React, { useEffect, useState } from 'react'
import TitlePage from '../../../global_components/TitlePage'
import ItemList from '../components/ItemList'
import RequiredAuth from '../../error/screens/RequiredAuth'
import { GetSingleData } from '../../../api/CRUD_API'
import Loading from '../../../global_components/Loading'
import { useParams } from 'react-router-dom'

const OrderDetail = (props: any) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
    const [orderInfo, setOrderInfo] = useState<any>({})
    const {id} = useParams()

    useEffect(() => {
        GetSingleData('orders', id).then((data: any) => {
            setOrderInfo(data);
        })
    }, [])


    return (
        <>
            {Object.keys(currentUser).length > 0 ? (
                <div className='my-10 mx-2 sm:mx-auto sm:w-5/6 2xl:w-[64%]'>
                    <TitlePage title='Detail Order' />
                    {
                        Object.keys(orderInfo).length > 0 ? <>
                            <div className='lg:flex justify-between text-xl
                        max-lg:bg-dark-silver max-lg:p-4 max-lg:rounded-xl
                    '>
                                <p>Order ID: #{orderInfo.id}</p>
                                <p className='max-lg:text-base max-lg:text-dark-grey'>Placed on: 16:00 16/4/2023</p>
                            </div>
                            <div className='flex justify-between my-4'>
                                <div className='w-full lg:w-2/5'>
                                    <p className='uppercase font-bold'>Address</p>
                                    <div className='bg-dark-silver p-4 rounded-xl'>
                                        <p className='capitalize lg:font-semibold'>{orderInfo.userInfo.name}</p>
                                        <p className='text-dark-grey'>
                                            Address: {orderInfo.userInfo.address}
                                        </p>
                                        <p className='text-dark-grey'>
                                            Điện thoại: {orderInfo.userInfo.phoneNumber}
                                        </p>
                                    </div>
                                </div>
                                <div className='w-2/5 max-lg:hidden'>
                                    <p className='uppercase'>delivery method</p>
                                    <div className='text-lg sm:text-xl my-2 p-2 rounded-xl bg-dark-grey text-white'>
                                        {orderInfo.deliverMethod}
                                    </div>
                                    <p className='uppercase'>payment method</p>
                                    <div className='text-lg sm:text-xl my-2 p-2 rounded-xl bg-dark-grey text-white'>
                                        {orderInfo.paymentMethod}
                                    </div>
                                </div>
                            </div>
                            <ItemList data={orderInfo} />
                        </> : <Loading />
                    }
                </div>
            ) : <RequiredAuth />
            }
        </>
    )
}

export default OrderDetail
