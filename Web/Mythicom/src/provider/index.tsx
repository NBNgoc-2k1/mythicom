import React, { useState } from 'react'
import { AuthContext, AuthState } from '../contexts/AuthContext'
import { FilterContext } from '../contexts/FilterContext'

const index = (props: any) => {
    const [authPopup, setAuthPopup] = useState({ open: false, authState: AuthState.login })
    const [filterValue, setFilterValue] = useState({
        selectedValue: {
            category: [],
            material: [],
            origin: [],
        },
        rangePrice: {
            minPrice: 0,
            maxPrice: 0
        }
    })

    return (
        <AuthContext.Provider value={{ authPopup, setAuthPopup }} >
            <FilterContext.Provider value={{ filterValue, setFilterValue }} >
                {props.children}
            </FilterContext.Provider>
        </AuthContext.Provider>
    )
}

export default index
