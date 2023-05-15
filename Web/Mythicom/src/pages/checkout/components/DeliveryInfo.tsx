import React, { useEffect, useState } from 'react'
import TextField from '../../../global_components/TextField'
import Dropdown from './Dropdown';
import axios from 'axios'

const DeliveryInfo = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
    const [email, setEmail] = useState(currentUser.userEmail);
    const [fullname, setFullname] = useState(currentUser.fullName);
    const [address, setAddress] = useState(currentUser.address);
    const [phoneNumber, setPhoneNumber] = useState(currentUser.phoneNumber);
    const [country,setCountry] = useState('Vietnam')
    const [postalCode, setPostalCode] = useState('');
    const [countryList,setCountryList] = useState([])

    const getCountry = async () => {
        try {
            const respond = await axios.get('https://restcountries.com/v3.1/all')
            const countries:any = []

            respond.data.map((data: any) => countries.push(data.name.common))
            setCountryList(countries.sort());
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCountry()
    }, [])
    
    return (
        <div className='mb-8'>
            <p className='text-3xl mb-8'> Delivery Information</p>
            <TextField label='Fullname' value={fullname} onChange={(e: any) => setFullname(e.target.value)} />
            <div className='sm:flex justify-between '>
                <TextField value={email} onChange={(e:any) => setEmail(e.target.value)} label='Email' className='sm:w-[65%]' />
                <TextField value={phoneNumber} onChange={(e:any) => setPhoneNumber(e.target.value)} label='Phone number' className='sm:w-1/3'/>
            </div>
            <TextField label='Address' value={address} onChange={(e: any) => setAddress(e.target.value)} />
            <div className='sm:flex justify-between items-center'>
                <TextField value={postalCode} onChange={(e: any) => setPostalCode(e.target.value)} label='Postal/Zip code'
                    className='sm:w-2/5'
                />
                <Dropdown dataSet={countryList} defaultValue={country} onChange={(event: any) => setCountry(event.target.value)}
                    label='Country/Region'
                />
            </div>
        </div>
    )
}

export default DeliveryInfo
