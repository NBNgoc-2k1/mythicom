import { createContext, useContext } from 'react'
import { FilterDataset, RangePrice } from '../interface';

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
        author: []
        },
        rangePrice: {
            minPrice: 0,
            maxPrice:0        
        }
    },
    setFilterValue: filterValue => { }
})

export const useFilter = () => useContext(FilterContext);