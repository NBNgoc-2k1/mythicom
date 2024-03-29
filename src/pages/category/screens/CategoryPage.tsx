import React, { useEffect, useState } from 'react'
import ProductCard from '../../../global_components/ProductCard'
import TitlePage from '../../../global_components/TitlePage'
import Filter from '../components/Filter/FilterSidebar'
import SortDropdown from '../components/SortDropdown'
import { useLocation, useParams } from 'react-router-dom'
import Loading from '../../../global_components/Loading'
import NoProduct from '../components/NoProduct'
import AppButton from '../../../global_components/AppButton'
import { faClose, faFilter } from '@fortawesome/free-solid-svg-icons'
import Drawer from 'react-modern-drawer'
import IconButton from '../../../global_components/IconButton'
import LazyLoad from 'react-lazy-load'
import { useFilter } from '../../../contexts/FilterContext'
import { errorSnackbar } from '../../../services'
import { GetAllOrderedData } from '../../../api/CRUD_API'

const CategoryPage = () => {
  const [allProducts, setAllProducts] = useState([])
  const [resultProducts, setResultProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  let { param1, param2 } = useParams()
  const location = useLocation()
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false)
  const { filterValue, setFilterValue } = useFilter()
  const [filterValueSet, setFilterValueSet] = useState<any>({})

  const ResetFilter = () => {
    setFilterValue({
      ...filterValue,
      selectedValue: {
        category: [],
        material: [],
        origin: [],
        author: [],
        language: []
      },
      rangePrice: {
        minPrice: 0,
        maxPrice: 0
      }
    })
    setFilteredProducts(resultProducts)
    setOpenFilterDrawer(false)
  }

  const CheckBlogHasFilterValue = (product: any) => {
    const materialList = filterValue.selectedValue.material
    const originList = filterValue.selectedValue.origin
    const categoryList = filterValue.selectedValue.category

    const hasMaterial = materialList.length > 0 ? materialList.includes(product.material) : true
    const hasYear = originList.length > 0 ? originList.includes(product.origin) : true
    const hasCategory = categoryList.length > 0 ? categoryList.includes(product.subCategory) : true

    return hasMaterial && hasYear && hasCategory
  }

  const FilterByPrice = (products: any, maxPrice: string, minPrice: string) => {
    if (parseFloat(maxPrice) < parseFloat(minPrice)) {
      errorSnackbar('The max price must larger than the min price')
      setFilterValue({
        ...filterValue, rangePrice: {
          maxPrice: 0,
          minPrice: 0,
        }
      })
    }
    else {
      setFilteredProducts(products.filter((product: any) => (parseFloat(product.price) <= parseFloat(maxPrice)
        && parseFloat(product.price) >= parseFloat(minPrice))));
      setOpenFilterDrawer(false)
    }
  }

  const FilterByCategory = (products: any) => {
    setFilteredProducts(products.filter((product: any) => CheckBlogHasFilterValue(product) === true));
    setOpenFilterDrawer(false)
  }

  async function FetchData() {
    await GetAllOrderedData('sold', 'products').then((products) => {
      setAllProducts(products)
      const valueSet: any = {
        category: [],
        material: [],
        origin: [],
        author: [],
        language: []
      }

      if (param1 === 'result') {
        setResultProducts(products)
        const result = products.filter(((data: any) => data.name.toLowerCase().includes(param2?.toLowerCase())))
        setFilteredProducts(result)
        result.map((item: any) => {
          !valueSet.author.includes(item.author) && valueSet.author.push(item.author)
          !valueSet.category.includes(item.subCategory) && valueSet.category.push(item.subCategory)
          !valueSet.language.includes(item.language) && valueSet.language.push(item.language)
          !valueSet.material.includes(item.material) && valueSet.material.push(item.material)
          !valueSet.origin.includes(item.origin) && valueSet.origin.push(item.origin)
        })
      }
      else {
        const productsByCategory = products.filter((data: any) => data.category === param1)
        setResultProducts(productsByCategory)
        setFilteredProducts(productsByCategory)

        if (param2 !== '1') {
          const productsBySubCategory = products.filter((data: any) => data.subCategory.replaceAll(/\s/g, '').toLowerCase() === param2?.toLowerCase())
          if (productsBySubCategory.length > 0) {
            setResultProducts(productsBySubCategory)
            setFilteredProducts(productsBySubCategory)
            productsBySubCategory.map((item: any) => {
              !valueSet.author.includes(item.author) && valueSet.author.push(item.author)
              !valueSet.category.includes(item.subCategory) && valueSet.category.push(item.subCategory)
              !valueSet.language.includes(item.language) && valueSet.language.push(item.language)
              !valueSet.material.includes(item.material) && valueSet.material.push(item.material)
              !valueSet.origin.includes(item.origin) && valueSet.origin.push(item.origin)
            })
          }
          else setFilteredProducts([])
        }
        else {
          productsByCategory.map((item: any) => {
            !valueSet.author.includes(item.author) && valueSet.author.push(item.author)
            !valueSet.category.includes(item.subCategory) && valueSet.category.push(item.subCategory)
            !valueSet.language.includes(item.language) && valueSet.language.push(item.language)
            !valueSet.material.includes(item.material) && valueSet.material.push(item.material)
            !valueSet.origin.includes(item.origin) && valueSet.origin.push(item.origin)
          })
        }
      }

      setFilterValueSet(valueSet)
    })
  }

  const ToggleFilterDrawer = () => {
    {
      openFilterDrawer ? document.body.style.overflowY = ""
        : document.body.style.overflowY = "hidden"
    }
    setOpenFilterDrawer(!openFilterDrawer)
  }

  function SortProducts(sortedProducts: any) {
    setFilteredProducts(sortedProducts)
  }

  useEffect(() => {
    FetchData()
    if (param2 !== '1' && param2 !== undefined) {
      filterValue.selectedValue['category'].push(param2)
    }
  }, [location])

  return (
    <div className='my-10'>
      <TitlePage title={param1 || ''} />
      <div className='flex'>
        <Filter className='max-lg:hidden' filterValue={filterValueSet}
          onFilterByCategory={() => FilterByCategory(resultProducts)}
          onFilterByPrice={() => FilterByPrice(filteredProducts,
            filterValue.rangePrice.maxPrice.toString(),
            filterValue.rangePrice.minPrice.toString()
          )}
          onReset={ResetFilter} />
        <div className='w-full lg:w-4/5'>
          <div className='flex justify-between items-center mx-2 xl:mx-10 2xl:mx-6'>
            <AppButton content='Filter' icon={faFilter} className='hidden sm:max-lg:flex text-white' onClick={ToggleFilterDrawer} />
            <IconButton icon={faFilter} iconClass='text-teal text-3xl mt-2'
              className='sm:hidden'
              onClick={ToggleFilterDrawer} />
            <p className='text-xl sm:text-2xl lg:text-3xl text-dark-grey'>{`${filteredProducts.length} products`}</p>
            <SortDropdown handleSort={SortProducts} data={[...filteredProducts]} />
          </div>
          {
            allProducts.length > 0 ? <>
              {
                filteredProducts.length > 0 ? <div className='grid my-8 justify-items-center
                grid-cols-2
                md:grid-cols-3
                2xl:grid-cols-4 
                gap-y-10
              '>
                  {
                    filteredProducts.map((item: any) => {
                      return (
                        <LazyLoad>
                          <ProductCard item={item} />
                        </LazyLoad>
                      )
                    })
                  }
                </div>
                  : <NoProduct />
              }
            </>
              : <Loading />
          }
        </div>
        <div className='absolute'>
          <Drawer open={openFilterDrawer} direction='right' onClose={ToggleFilterDrawer}
            className='overflow-y-auto overflow-x-hidden !w-4/5 sm:!w-1/2'
          >
            <IconButton icon={faClose} className='relative left-[85%] my-2' iconClass='text-dark-grey text-3xl'
              onClick={ToggleFilterDrawer}
            />
            <Filter filterValue={filterValueSet}
              onFilterByCategory={() => {
                FilterByCategory(resultProducts)
                ToggleFilterDrawer()
              }}
              onFilterByPrice={() => {
                FilterByPrice(filteredProducts,
                  filterValue.rangePrice.maxPrice.toString(),
                  filterValue.rangePrice.minPrice.toString()
                )
                ToggleFilterDrawer()
              }}
              onReset={ResetFilter} />
          </Drawer>
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
