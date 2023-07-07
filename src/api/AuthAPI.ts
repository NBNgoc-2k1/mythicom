import { authentication, database } from '../firebase-config'
import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { GetSingleData } from './CRUD_API'
import { errorSnackbar } from '../services';
import { OrderInfo } from '../interface'
import { useCart } from '../contexts/CartContext';

export function LoginAPI(email: string, password: string, clearField?: any, closePopup?: any) {
    signInWithEmailAndPassword(authentication, email, password)
        .then((userAuth) => {
            GetSingleData('users', userAuth.user.uid).then((user: any) => {
                const orderInfo: OrderInfo = {
                    customerInfo: {
                        fullName: user.fullName,
                        phoneNumber: user.phoneNumber,
                        address: user.address,
                        country: 'Vietnam',
                        postal: '',
                    },
                    deliverMethod: 'Standard international',
                    paymentMethod: 'Pay with Paypal',
                    products: [],
                    total: 0,
                    shipping: 0,
                    discount: 0
                }

                localStorage.setItem('currentUser', JSON.stringify({ ...user, uid: userAuth.user.uid }))
                sessionStorage.setItem('orderInfo', JSON.stringify(orderInfo))
                window.location.reload()
            })
            closePopup()
        })
        // display the error if any
        .catch((err) => {
            clearField()
            errorSnackbar(err.message)
        });
}

export async function Register(newUser: any, password: string) {
    // Create a new user with Firebase
    await createUserWithEmailAndPassword(authentication, newUser.userEmail, password).then((userAuth) => {
        // Update the newly created user with a display name and a picture
        updateProfile(userAuth.user, {
            displayName: `${newUser.fullName}`,
        })
        setDoc(doc(database, "users", userAuth.user.uid), newUser)
        LoginAPI(newUser.userEmail, password)
    }).catch((error) => {
        errorSnackbar(error.message)
    })
}

export function Logout() {
    authentication.signOut().then(() => {
        localStorage.removeItem('currentUser')
        sessionStorage.removeItem('orderInfo')
    })
}


