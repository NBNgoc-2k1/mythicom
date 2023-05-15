import React from 'react'
import { useParams } from 'react-router-dom'
import OrderInfo from '../components/OrderInfo'
import CheckoutInfo from '../components/CheckoutInfo'
import TitlePage from '../../../global_components/TitlePage'
import RequiredAuth from '../../error/screens/RequiredAuth'

const CheckoutPage = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')

  return (<>
    {
      Object.keys(currentUser).length > 0 ?
        <div className='my-8 px-4'>
          <TitlePage title='Check out' />
          <div className='lg:flex sm:px-10 xl:px-20 2xl:px-40 justify-between'>
            <CheckoutInfo />
            <div className='lg:w-2/5'>
              <OrderInfo />
            </div>
          </div>
        </div>
        : <RequiredAuth />
    }
  </>

  )
}

export default CheckoutPage
