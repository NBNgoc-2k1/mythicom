import React, { useState } from 'react'
import TitlePage from '../../../global_components/TitlePage'
import TextField from '../../../global_components/TextField'
import { authentication } from '../../../firebase-config'
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth'
import { Logout } from '../../../api/AuthAPI'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import AppButton from '../../../global_components/AppButton'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import '../../../toastify.css'
import { successSnackbar } from '../../../services'

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPass, setShowPass] = useState(false)

    const submitChangePassword = async (newPassword: string, oldPassword: string) => {
        const loggedUser: any = authentication.currentUser
        const credential = EmailAuthProvider.credential(loggedUser.email, oldPassword);
        reauthenticateWithCredential(loggedUser, credential)
            .then(() => {
                updatePassword(loggedUser, newPassword).then(() => {
                    successSnackbar('Change password')
                    Logout()
                    window.location.reload()
                })
            })
            .catch((error) => {
                alert(error.message)
                setOldPassword('')
            })

    }

    function toggleShowPass() {
        setShowPass(!showPass)
    }

    return (
        <div>
            <ToastContainer style={{ fontFamily: 'Itim, cursive' }} />
            <TitlePage title='change password' />
            <div className='bg-dark-silver p-8 rounded-xl'>
                <TextField label="Old Password" type="password" value={oldPassword} className='lg:w-1/2 mx-auto !mb-8'
                    onChange={(event: any) => setOldPassword(event.target.value)}
                />
                <TextField label="New Password" type={showPass ? 'text' : "password"} value={newPassword} className='lg:w-1/2 mx-auto !mb-8'
                    icon={showPass ? faEyeSlash : faEye} iconClick={toggleShowPass}
                    onChange={(event: any) => setNewPassword(event.target.value)}
                />
                <TextField label="Confirm Password" type={showPass ? 'text' : "password"} value={confirmPassword}
                    icon={showPass ? faEyeSlash : faEye} iconClick={toggleShowPass}
                    className='lg:w-1/2 mx-auto !mb-4'
                    onChange={(event: any) => setConfirmPassword(event.target.value)}
                />
                <AppButton content='change' className='text-white mx-auto !bg-dark-grey !mb-4'
                    title='Fill old password and confirm password same as new password'
                    disabled={!((newPassword !== '') && (confirmPassword === newPassword))}
                    onClick={() => {
                        submitChangePassword(newPassword, oldPassword)
                    }} />
            </div>
        </div>
    )
}

export default ChangePassword
