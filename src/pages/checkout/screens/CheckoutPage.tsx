import React from 'react'
import PriceSummary from '../components/PriceSummary/PriceSummary'
import CheckoutInfo from '../components/CheckoutInfo/CheckoutInfo'
import TitlePage from '../../../global_components/TitlePage'

const CheckoutPage = () => {

  return (
    <div className='my-8 px-4'>
      <TitlePage title='Check out' />
      <div className='lg:flex sm:px-10 xl:px-20 2xl:px-40 justify-between'>
        <CheckoutInfo />
        <div className='lg:w-2/5'>
          <PriceSummary />
        </div>
      </div>
    </div>

  )
}

export default CheckoutPage
