import { UpdateData } from "./api/CRUD_API"
import { errorSnackbar, successSnackbar } from "./services"

export const AddToCart = (newItem: any) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
    try {
        if (Object.keys(currentUser).length > 0) {
            const isExist = currentUser.cart.filter((value: any) => value.id === newItem.id).length > 0 ? true : false
            const newCart = isExist ? currentUser.cart.map((item: any) => item.id === newItem.id && {
                ...item,
                quantity:item.quantity + newItem.quantity
            }) : [
                ...currentUser.cart,
                newItem
            ]
            const newUserData = {
                ...currentUser, "cart": newCart,
            }
            
            UpdateData(currentUser.id, 'users', newUserData, () => { })
            localStorage.setItem('currentUser', JSON.stringify(newUserData))
            successSnackbar('Add to cart')
        }
        else errorSnackbar('Login to use cart feature')
    } catch (error: any) {
        errorSnackbar('Something went wrong')
    }
}

export const UpdateQuantity = (newItem: any) => {
    try {
        const currentUserInfo = JSON.parse(localStorage.getItem('currentUser') || '')
        const isExist = currentUserInfo.cart.filter((value: any) => value.id === newItem.id).length > 0 ? true : false
        const newCart = isExist ? currentUserInfo.cart.map((item: any) => item.id !== newItem.id ? item : newItem) : [
            ...currentUserInfo.cart,
            newItem
        ]
        const newUserData = {
            ...currentUserInfo, "cart": newCart,
        }
        UpdateData(currentUserInfo.uid, 'users', newUserData, () => { })
        localStorage.setItem('currentUser', JSON.stringify(newUserData))
    } catch (error: any) {
        errorSnackbar('Something went wrong')
    }
}

export const ToggleWishlist = (newItem:any) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
    
    try {
        const isExist = currentUser.favoriteProducts.filter((value: any) => value.id === newItem.id).length > 0 ? true : false
        const newWishlist = isExist ? currentUser.favoriteProducts.filter((item: any) => item.id !== newItem.id) : [
            ...currentUser.favoriteProducts,
            newItem
        ]
        const newUserData = {
            ...currentUser, "favoriteProducts": newWishlist,
        }
        UpdateData(currentUser.id, 'users', newUserData, () => { })
        localStorage.setItem('currentUser', JSON.stringify(newUserData))
        {isExist ? errorSnackbar('Remove from wishlist successfully') : successSnackbar('Add to wishlist') }
                
    } catch (error) {
        errorSnackbar('Something went wrong')
    }
}
