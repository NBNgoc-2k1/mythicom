export const AddToCart = (newItem:object,) => {
    const currentUserInfo = JSON.parse(localStorage.getItem('currentUser') || '')
    localStorage.setItem('cart',JSON.stringify({}))

}