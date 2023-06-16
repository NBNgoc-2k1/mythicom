import React, { useEffect, useState } from 'react'
import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import ProductCard from '../../../global_components/ProductCard'
import TitlePage from '../../../global_components/TitlePage'
import 'swiper/css';
import 'swiper/css/bundle'
import '../../../slider.css'
import { GetAllOrderedData } from '../../../api/CRUD_API'
import Loading from '../../../global_components/Loading'

const RelatedProduct = (props: any) => {
    const [relatedProducts, setRelatedProducts] = useState([])

    function FetchData() {
        GetAllOrderedData('createdAt', 'products').then((products) => {
            setRelatedProducts(products
                .filter((item: any) => item.subCategory === props.data.subCategory)
                .sort(() => Math.random() - Math.random())
                .slice(0, 3));
        })
    }

    useEffect(() => {
        FetchData()
    }, [props.data])

    return (
        <div className='my-10'>
            <TitlePage title='Related Product' />
            {
                relatedProducts.length > 0 ? (
                    <>
                        <div className='hidden lg:flex justify-between'>
                            {
                                relatedProducts.map((item: any) => <ProductCard item={item} />)
                            }
                        </div>
                        <Swiper className='lg:!hidden pb-8'
                            loop={true}
                            slidesPerView={1}
                            modules={[Autoplay]}
                            longSwipesMs={10000}
                            speed={800}
                            longSwipes={false}
                            autoplay={{
                                delay: 3000
                            }}
                            breakpoints={{
                                414: {
                                    slidesPerView: 2,
                                }
                            }}
                        >
                            {
                                relatedProducts.map((item: any) => {
                                    return (
                                        <SwiperSlide key={item.id}>
                                            <ProductCard item={item} />
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                    </>
                ) : <Loading />
            }
        </div>
    )
}

export default RelatedProduct
