import React, { useEffect, useState } from 'react'
import '../tailwind.css'
import PropTypes from 'prop-types'
import { useFilter } from '../contexts/FilterContext'
import { FilterDataset } from '../interface'
import { useParams } from 'react-router-dom'

const CustomCheckbox = (props: any) => {
    const { filterValue,setFilterValue } = useFilter()
    const propertyName: keyof FilterDataset = props.nameGroup.toLowerCase()
    const [isChecked, setChecked] = useState(filterValue.selectedValue[propertyName].includes(props.value))
    let { param1,param2 } = useParams()
    
    const toggleFilterValue = (value: any, isChecked: boolean) => {
        if (!isChecked)
            filterValue.selectedValue[propertyName].push(value)
        else filterValue.selectedValue[propertyName] =
            filterValue.selectedValue[propertyName].filter(selectedValue => selectedValue !== value)
    }

    useEffect(() => {
        if (props.unCheckedAll) {
            setChecked(false)
            props.resetUnCheckAll()
        }
    }, [props.unCheckedAll])

    useEffect(() => {
        setChecked(false)
    }, [param1])

    useEffect(() => {
        if (param2 === '1') {
            filterValue.selectedValue[propertyName].length = 0
        }
        setChecked(filterValue.selectedValue[propertyName].includes(props.value))
    }, [param2])

    return (
        <>
            {
                props.value === '' ? 
                    <></>
                : <label className='text-2xl capitalize cursor-pointer'>
                    <input type='checkbox' className='checkbox'
                        checked={isChecked && !props.unCheckedAll} onChange={() => {
                            toggleFilterValue(props.value, isChecked)
                            setChecked(!isChecked)
                        }} />
                    {props.value}
                </label>
            }
        </>

    )
}

CustomCheckbox.propTypes = {
    value: PropTypes.string,
    unCheckedAll: PropTypes.bool.isRequired,
    nameGroup: PropTypes.string,
    resetUnCheckAll: PropTypes.func
}


export default CustomCheckbox
