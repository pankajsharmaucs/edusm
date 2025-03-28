import React from 'react'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


function Slider1({ catList }) {
    var api_base_url = import.meta.env.VITE_API_BASE_URL + "/files/category/";
    return (
        <>
            <Swiper

                spaceBetween={1}
                slidesPerView={3}

            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            
            >

                {catList.map((cat, i) => {
                    return (
                        <SwiperSlide key={i}>
                            {
                                cat.id === 1
                                    ?
                                    <Link to={`categories`} >
                                        <img src={`${api_base_url}${cat.cat_id}/${cat.image}`} style={{ width: "66px" }} />
                                    </Link>
                                    :
                                    <Link to={`${cat.linkTo}`} style={{ fontSize: '10px',textDecoration:'none',color:"#000" }} >
                                        <div className='text-center'>
                                            <img src={`${api_base_url}${cat.cat_id}/${cat.image}`} style={{ width: "66px" }} />
                                            <p >{cat.cat_name}</p>
                                        </div>
                                    </Link>
                            }

                        </SwiperSlide>
                    )
                })}

            </Swiper>
        </>
    )
}

export default Slider1
