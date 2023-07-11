import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import ProductCard from '../../../global_components/ProductCard'
import 'swiper/css';
import '../../../slider.css'
import { Autoplay, Navigation } from 'swiper';
import "swiper/css/navigation";
import TitlePage from '../../../global_components/TitlePage';
import Loading from '../../../global_components/Loading';
import { GetAllOrderedData } from '../../../api/CRUD_API';
const BestSeller = () => {
    const [bestSellers, setBestSellers] = useState([])

    function FetchData() {
        GetAllOrderedData('sold', 'products').then((products) => {
            setBestSellers(products.slice(0, 8));            
        })
    }

    useEffect(() => {
        FetchData()
    }, [window.location])

    return (
        <div className='my-8'>
            <TitlePage title='Best Seller' />
            {
                bestSellers.length > 0 ?
                    <Swiper loop={true}
                    slidesPerView={2}
                    modules={[Navigation, Autoplay]}
                    longSwipesMs={10000}
                    navigation={true}
                    speed={800}
                    longSwipes={false}
                    autoplay={{
                        delay: 3000
                    }}
                    breakpoints={{
                        1536: {
                            slidesPerView: 4

                        },
                        1024: {
                            slidesPerView: 3
                        }
                    }}
                >
                    {bestSellers.map((item: any) => {
                        return (
                            <SwiperSlide key={item.id}>
                                <ProductCard item={item} />
                            </SwiperSlide>
                        )
                    }
                    )}
                    </Swiper> : 
                    <Loading />
            }
        </div>
    )
}

export default BestSeller
