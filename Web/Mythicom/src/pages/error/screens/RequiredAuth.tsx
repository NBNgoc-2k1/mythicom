import React from 'react'
import authen from '../../../assets/images/error/authentication.png'
import { useAuth } from '../../../contexts/AuthContext'
import AppButton from '../../../global_components/AppButton'

const RequiredAuth = () => {
    const {authPopup,setAuthPopup} = useAuth()

    function toggleOpenAuthDialog() {
        setAuthPopup({...authPopup,open:true})
    }


    return (
        <div className="lg:flex items-center justify-around py-8">
            <div>
                <img
                    src={authen}
                    alt="Authen"
                    className="w-52 lg:w-64 xl:w-80 mx-auto"
                />
            </div>
            <div className="flex flex-col items-baseline justify-center lg:w-2/3 max-lg:mx-auto
                lg:mt-20
            ">
                <p className="text-brown max-lg:mx-auto text-xl sm:text-3xl xl:text-4xl">AUTHENTICATION REQUIRED PAGE</p>
                <p className="max-sm:hidden max-lg:mx-auto w-8/12 my-8 text-lg max-lg:text-center min-[414px]:text-xl lg:max-w-4xl leading-relaxed">
                    This page contains information or benefits that require a MythWorld account.
                    So please login or register to experience. <br/> Sincere thanks to everyone's contributions to Myth World
                </p>
                <AppButton content="Login/Register" className='max-lg:mx-auto text-white' onClick={toggleOpenAuthDialog} />
            </div>
        </div>
    )
}

export default RequiredAuth
