import React, { useEffect, useState } from 'react'
import ProductCard from '../../../global_components/ProductCard'
import TitlePage from '../../../global_components/TitlePage'
import Filter from '../components/FilterSidebar'
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
  const [filteredProducts, setFilteredProducts] = useState([])
  const [filterValueSet, setFilterValueSet] = useState<Object>({})
  let { param1, param2 } = useParams()
  const location = useLocation()
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false)
  const { filterValue, setFilterValue } = useFilter()

  const ResetFilter = () => {
    setFilterValue({
      ...filterValue,
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
    setFilteredProducts(allProducts)
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

  const RemoveDuplicateItem = (array: any) => {
    return [...new Set(array)]
  }
  async function FetchData() {
    const category: string[] = []
    const material: string[] = []
    const origin: string[] = []
    const author: string[] = []

    await GetAllOrderedData('createdAt', 'products').then((products) => {
      const productsByCategory = products.filter((data: any) => data.category === param1)
      if (productsByCategory.length > 0)
        setAllProducts(productsByCategory);
      else setAllProducts(products)
      if (param1 === 'result') {
        setFilteredProducts(products.filter(((data: any) => data.name.includes(param2))))
      } else {
        if (param2 !== '1') {
          const productsBySubCategory = productsByCategory.filter((data: any) => data.subCategory === param2)
          setFilteredProducts(productsBySubCategory)
          productsBySubCategory.map((data: any) => {
            category.push(data.subCategory)
            material.push(data.material)
            origin.push(data.origin)
          })
        }
        else {
          setFilteredProducts(productsByCategory)
          productsByCategory.map((data: any) => {
            category.push(data.subCategory)
            material.push(data.material)
            origin.push(data.origin)
          })
        }
      }
    })

    setFilterValueSet({
      category: RemoveDuplicateItem(category),
      material: RemoveDuplicateItem(material),
      origin: RemoveDuplicateItem(origin),
      author: RemoveDuplicateItem(author)
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
    filterValue.selectedValue['category'].length = 0
    if (param2 !== '1' && param2 !== undefined) {
      filterValue.selectedValue['category'].push(param2)
    }
  }, [location])


  return (
    <div className='my-10'>
      <TitlePage title={param1 || ''} />
      <div className='flex'>
        <Filter filterValue={filterValueSet} className='max-lg:hidden'
          onFilterByCategory={() => FilterByCategory(allProducts)}
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
            className='overflow-y-scroll overflow-x-hidden !w-4/5 sm:!w-1/2'
          >
            <IconButton icon={faClose} className='relative left-[85%] my-2' iconClass='text-dark-grey text-3xl'
              onClick={ToggleFilterDrawer}
            />
            <Filter filterValue={filterValueSet}
              onFilterByCategory={() => FilterByCategory(allProducts)}
              onFilterByPrice={() => FilterByPrice(filteredProducts,
                filterValue.rangePrice.maxPrice.toString(),
                filterValue.rangePrice.minPrice.toString()
              )}
              onReset={ResetFilter} />
          </Drawer>
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
