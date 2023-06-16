import React, { useEffect, useState } from 'react'
import TextField from '../../../../../global_components/TextField'
import Dropdown from './Dropdown';
import axios from 'axios'
import { userOrder } from '../../../../../contexts/TempOrderContext';

const DeliveryInfo = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo') || '{}')
    const [email, setEmail] = useState(orderInfo.userInfo.userEmail || '');
    const [fullname, setFullname] = useState(orderInfo.userInfo.fullName || '');
    const [address, setAddress] = useState(orderInfo.userInfo.address || '');
    const [phoneNumber, setPhoneNumber] = useState(orderInfo.userInfo.phoneNumber || '');
    const [country, setCountry] = useState('Vietnam')
    const [postalCode, setPostalCode] = useState(orderInfo.userInfo.postal || '');
    const [countryList, setCountryList] = useState([])
    const {setOrderInfo} = userOrder()
    const getCountry = async () => {
        try {
            const respond = await axios.get('https://restcountries.com/v3.1/all')
            const countries: any = []

            respond.data.map((data: any) => countries.push(data.name.common))
            setCountryList(countries.sort());

        } catch (error) {
            console.log(error)
        }
    }

    const ChangeUserInfoState = (label: string, value: any) => {
        const newOrderInfo = {
            ...orderInfo,
            userInfo: {
                ...orderInfo.userInfo,
                [label]: value
            }
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(newOrderInfo))
        setOrderInfo(newOrderInfo)
    }

    useEffect(() => {
        getCountry()
    }, [])

    return (
        <div className='mb-8'>
            <p className='text-3xl mb-8'> Delivery Information</p>
            <TextField label='Fullname' value={fullname}
                required={true}
                onChange={(e: any) => {
                setFullname(e.target.value)
                ChangeUserInfoState('fullName', e.target.value)
            }} />
            <div className='sm:flex justify-between '>
                <TextField value={email} onChange={(e: any) => {
                    setEmail(e.target.value)
                }} label='Email' className='sm:w-[65%]'

                />
                <TextField value={phoneNumber} onChange={(e: any) => {
                    setPhoneNumber(e.target.value)
                    ChangeUserInfoState('phoneNumber', e.target.value)

                }} label='Phone number' className='sm:w-1/3' />
            </div>
            <TextField label='Address'
                placeholder='Must include city/province'
                value={address} onChange={(e: any) => {
                    setAddress(e.target.value)
                    ChangeUserInfoState('address', e.target.value)
                }} />
            <div className='sm:flex justify-between items-center'>
                <TextField value={postalCode} onChange={(e: any) => {
                    setPostalCode(e.target.value)
                    ChangeUserInfoState('postal', e.target.value)
                }} label='Postal/Zip code'
                    className='sm:w-2/5'
                />
                <Dropdown dataSet={countryList} defaultValue={country} onChange={(event: any) => {
                    setCountry(event.target.value)
                    ChangeUserInfoState('country', event.target.value)
                }}
                    label='Country/Region'
                />
            </div>
        </div>
    )
}

export default DeliveryInfo
