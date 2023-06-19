export interface userData {
    fullName: string,
    phoneNumber: string,
    address: string,
    country: string,
    postal: string,
}

export interface OrderInfo {
    userInfo: userData,
    deliverMethod: string,
    paymentMethod: string,
    products: any[],
    total: number,
    shipping: number,
    discount: number
}

export interface FilterDataset {
    category: string[],
    material: string[],
    origin: string[],
    author: string[]
}

export interface RangePrice {
    minPrice: number,
    maxPrice:number
}

export interface CartInfo {
    selectedItem: any[],
    totalValue: number
}

export interface Rating {
    star: number,
    textReview: '',
    mediaProducts: [],
    
}