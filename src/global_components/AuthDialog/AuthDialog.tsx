import { faClose } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import IconButton from '../IconButton'
import Login from './components/Login'
import Reset from './components/Reset'
import SignUp from './components/SignUp'
import auth_image from "../../assets/images/global/logo2.png"
import { AuthState, useAuth } from '../../contexts/AuthContext'
import Modal from '../Modal'

const AuthDialog = () => {
    const { authPopup, setAuthPopup } = useAuth()

    function toggleOpenAuthDialog() {
        setAuthPopup({ authState: AuthState.login, open: false })
        document.body.style.overflowY = ""
    }

    return (
        <Modal open={authPopup.open} onClose={toggleOpenAuthDialog}>
            <IconButton icon={faClose} className='absolute left-[85%]
                top-[21%]
                sm:top-[30%]
                lg:top-[28%]
                2xl:top-[22%]
                xl:left-[80%]'
                iconClass='text-3xl text-teal lg:text-white'
                onClick={toggleOpenAuthDialog}
            />
            <div className="flex w-5/6 bg-light-silver rounded-xl
                sm:w-4/5
                xl:w-2/3
            ">
                <div className="w-full lg:w-1/2 my-2">
                    {authPopup.authState === 'login' && <Login onClose={toggleOpenAuthDialog} />}
                    {authPopup.authState === 'register' && <SignUp onClose={toggleOpenAuthDialog} />}
                    {authPopup.authState === 'reset' && <Reset />}
                </div>
                <div className='bg-brown lg:w-1/2 rounded-r-xl m-0 flex place-items-center'>
                    <img className="max-lg:hidden"
                        src={auth_image}
                        alt="god in auth"
                    />
                </div>
            </div>

        </Modal>
    )
}

export default AuthDialog
