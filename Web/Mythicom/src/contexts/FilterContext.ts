import { createContext, useContext } from 'react'

export interface FilterDataset {
    category: string[],
    material: string[],
    origin: string[],
}

export interface RangePrice {
    minPrice: number,
    maxPrice:number
}

export type FilterContextType = {
    filterValue: {
        selectedValue: FilterDataset,
        rangePrice:RangePrice
    };
    setFilterValue: (filterValue: any) => void
}

export const FilterContext = createContext<FilterContextType>({
    filterValue: {
        selectedValue: {
        category: [],
        material: [],
        origin: [],
        },
        rangePrice: {
            minPrice: 0,
            maxPrice:0        
        }
    },
    setFilterValue: filterValue => { }
})

export const useFilter = () => useContext(FilterContext);