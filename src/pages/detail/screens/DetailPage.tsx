import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductInfo from '../components/ProductInfo';
import RelatedProduct from '../components/RelatedProduct';
import { GetSingleData } from '../../../api/CRUD_API';
import Loading from '../../../global_components/Loading';

const DetailPage = () => {
  const [productInfo, setProductInfo] = useState(null)
  let { id } = useParams()

  async function FetchData() {
    GetSingleData('products', id).then((returnedProduct: any) => {
      setProductInfo(returnedProduct);
    })
  }


  useEffect(() => {
    FetchData()
  }, [id])

  return (
    <>
      {
        productInfo ? (
          <div className='2xl:mx-40 max-[414px]:mb-0 my-4' >
            <ProductInfo data={productInfo} />
            <RelatedProduct data={productInfo} />
          </div >
        ) : <Loading />
      }
    </>
  )
}

export default DetailPage