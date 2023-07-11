import React, { useState } from 'react'
import TextField from '../../../global_components/TextField'
import AppButton from '../../../global_components/AppButton';
import TitlePage from '../../../global_components/TitlePage';
import isEmail from 'validator/lib/isEmail';
import { updateEmail, updateProfile } from 'firebase/auth';
import { authentication } from '../../../firebase-config';
import { UpdateData } from '../../../api/CRUD_API';
import { errorSnackbar, successSnackbar } from '../../../services';
import "react-toastify/dist/ReactToastify.css";
import '../../../toastify.css'

const Profile = (props: any) => {
    const [email, setEmail] = useState(props.user.userEmail);
    const [fullName, setFullName] = useState(props.user.fullName);
    const [address, setAddress] = useState(props.user.address);
    const [phoneNumber, setPhoneNumber] = useState(props.user.phoneNumber);
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo') || '{}')

    const UpdateUserInfo = (currentUser: any, email: any, fullName: any, address: any, phoneNumber: any) => {
        if (!isEmail(email) || fullName.match(/^\s*$/) || address.match(/^\s*$/) || phoneNumber.match(/^\s*$/)) {
            errorSnackbar('Please do not empty any information field')
            return
        }
        var updateUser = {
            ...currentUser, 'userEmail': email,
            'fullName': fullName,
            'address': address,
            'phoneNumber': phoneNumber,
        }
        const loggedUser: any = authentication.currentUser

        try {
            updateEmail(loggedUser, updateUser.userEmail).then(async () => {
                UpdateData(loggedUser.uid, 'users', updateUser, () => { }).then(() => {
                    updateProfile(loggedUser, {
                        displayName: `${updateUser.fullName}`,
                    }).then(() => {
                        localStorage.setItem('currentUser', JSON.stringify(updateUser))
                        sessionStorage.setItem('orderInfo', JSON.stringify({
                            ...orderInfo,
                            customerInfo: {
                                ...orderInfo.customerInfo,
                                fullName: fullName,
                                phoneNumber: phoneNumber,
                                address: address,
                                userEmail: email
                            }
                        }))

                        successSnackbar('Change information')
                    })
                })
            })

        } catch (error: any) {
            errorSnackbar(error.message)
        }
    }


    return (
        <div className=''>
            <TitlePage title='Account information' />
            <div className='bg-dark-silver p-8 rounded-xl'>
                <TextField label='Fullname' type='text' value={fullName} className='capitalize'
                    onChange={(event: any) => setFullName(event.target.value)} />
                <div className='sm:flex justify-between '>
                    <TextField value={email} onChange={(e: any) => setEmail(e.target.value)} label='Email' className='sm:w-[65%]'
                        error={email !== '' && !isEmail(email)}
                        errorMessage={(email !== '' && !isEmail(email)) ? 'wrong email format' : ''}
                    />
                    <TextField value={phoneNumber} onChange={(e: any) => setPhoneNumber(e.target.value)} label='Phone number' className='sm:w-1/3' />
                </div>
                <TextField label='Address' value={address} onChange={(e: any) => setAddress(e.target.value)}
                    placeholder='Must include city/province'
                />
                <AppButton content='save changes'
                    disabled={fullName === '' || email === '' || phoneNumber === '' || address === '' || !isEmail(email)}
                    title='Fill data'
                    className='!bg-dark-grey text-white mx-auto' onClick={() => {
                        UpdateUserInfo(props.user, email, fullName, address, phoneNumber)
                    }}
                />
                <p className={` ${!(fullName === '' || email === '' || phoneNumber === '' || address === '' || !isEmail(email)) && 'hidden'} 
            lg:hidden text-sm text-green text-center`}>
                    Fill all information fields to enable this button</p>
            </div>
        </div>
    )
}

export default Profile
