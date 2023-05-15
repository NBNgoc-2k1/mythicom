import React, { useState } from 'react'
import RequiredAuth from '../../error/screens/RequiredAuth'
import SidebarNav from '../components/SidebarNav'
import { useParams } from 'react-router-dom'
import Profile from '../components/Profile'
import ChangePassword from '../components/ChangePassword'
import Wishlist from '../components/Wishlist/Wishlist'
import OrderList from '../components/OrderList/OrderList'

const Account = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
    let { param } = useParams()

    return (
        <>
            {
                Object.keys(currentUser).length > 0 ? <div className='my-8 flex justify-evenly '>
                    <SidebarNav user={currentUser} pathname={param} />
                    {param === 'profile' && <Profile user={currentUser} />}
                    {param === 'password' && <ChangePassword />}
                    {param === 'wishlist' && <Wishlist />}
                    {param === 'orders' && <OrderList />}
                </div>
                    : <RequiredAuth />
            }
        </>
    )
}

export default Account
