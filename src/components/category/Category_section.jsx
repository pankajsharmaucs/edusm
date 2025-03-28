import React, { useContext, useEffect, useState } from 'react'
import Card1 from '../cards/Card1';
import axios from 'axios';
import { SwiperSlide } from 'swiper/react';
import { Swiper } from 'swiper/react'; // Import Swiper for usage in the component
import { Autoplay } from 'swiper/modules';
import Card5 from '../cards/Card5';

const Category_section = ({ cat_id }) => {

    const [catProducts, setcatProducts] = useState([]);

    function get_product_cat_id(cat_id) {
        const requestOptions = {
            method: "GET",
            url: import.meta.env.VITE_API_USER_GET_PRODUCT_BY_CAT_ID + cat_id,
        };

        axios(requestOptions)
            .then((response) => {
                const result = response.data;
                if (result.msg === 'success') {
                    setcatProducts(result.pro_detail);
                }
            })
            .catch((error) => console.error(error));
    }

    useEffect(() => {
        get_product_cat_id(cat_id);
    }, [])

    return (

        <Swiper
            slidesPerView={2} // Default value for larger screens
            spaceBetween={1}
            loop={true} // Enable looping
            autoplay={{
                delay: 2500, // Auto slide every 3 seconds
                disableOnInteraction: false, // Keep autoplay running even after user interaction
            }}
            modules={[Autoplay]}
            pagination={{
                clickable: true,
            }}
            className="mySwiper"
            breakpoints={{
                // when window width is >= 320px (mobile)
                320: {
                    slidesPerView: 2,
                },
                // when window width is >= 768px (medium devices)
                768: {
                    slidesPerView: 3,
                },
                // when window width is >= 1024px (large devices)
                1024: {
                    slidesPerView: 6,
                },
            }}
        >
            {
                catProducts ?
                    catProducts.map((data, index) => {
                        return (
                            // <Card1 catData={data} productData={data} key={index} />
                            <SwiperSlide key={index} className=' p-1' >
                                <Card5 data={data} />
                            </SwiperSlide>
                        )
                    })
                    : null
            }

        </Swiper>
    )
}

export default Category_section