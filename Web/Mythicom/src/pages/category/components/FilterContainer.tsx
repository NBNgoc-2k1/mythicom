import React, { useEffect, useState } from 'react'
import Label from './Label'
import CustomCheckbox from '../../../global_components/CustomCheckbox'
import { useFilter, FilterDataset } from '../../../contexts/FilterContext'

const FilterContainer = (props: any) => {
    const { filterValue } = useFilter()
    const propertyName: keyof FilterDataset = props.label.toLowerCase()

    const toggleFilterValue = (value: any, isChecked: boolean) => {
        if (!isChecked)
            filterValue.selectedValue[propertyName].push(value)
        else filterValue.selectedValue[propertyName] =
            filterValue.selectedValue[propertyName].filter(selectedValue => selectedValue !== value)
    }

    return (
        <div className='my-4'>
            <Label content={props.label} />
            <div className='flex flex-col mt-1 mx-4 items-start'>
                {
                    props.valueSet.map((value: any) => {
                        const [isChecked, setChecked] = useState(filterValue.selectedValue[propertyName].includes(value))

                        useEffect(() => {
                            if (props.unCheckedAll) {
                                setChecked(false)
                                props.resetUnCheckAll()
                            }
                        }, [props.unCheckedAll])

                        return (
                            <CustomCheckbox isChecked={isChecked && !props.unCheckedAll}
                                value={value} onChange={() => {
                                    toggleFilterValue(value, isChecked)
                                    setChecked(!isChecked)
                                }} />
                        )

                    })
                }
            </div>
        </div>
    )
}

export default FilterContainer
