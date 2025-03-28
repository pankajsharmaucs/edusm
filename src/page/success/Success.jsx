import React, { useEffect, useState } from 'react'
import Button1 from '../../components/button/Button1'
import orderPlacedImg from '/assets/orderPlaced.gif'
import { Link, useNavigate } from 'react-router-dom'
import { SwiperSlide } from 'swiper/react';
import { Swiper } from 'swiper/react'; // Import Swiper for usage in the component
import { Autoplay } from 'swiper/modules';
import axios from 'axios';

const Success = () => {

    const navigate = useNavigate();
    const [latestProduct, setlatestProduct] = useState([]);
    var base_url = import.meta.env.VITE_API_BASE_URL;
    var api_base_url = import.meta.env.VITE_API_BASE_URL + "/files/products/";


    // ===latest===products====
    useEffect(() => {
        const requestOptions = {
            method: "GET",
            url: import.meta.env.VITE_API_USER_GET_PRODUCT_SECION_LATEST + "?section=latest&limit=4",
        };

        axios(requestOptions)
            .then((response) => {
                const result = response.data;
                if (result.msg === 'success') {
                    // console.log(result.pro_list);

                    setlatestProduct(result.pro_list);
                }
            })
            .catch((error) => console.error(error));
    }, []);


    return (
        <>
            <div>
                <div className='container'>
                    <div className='row jcc p-4'>
                        <div className='col-12 text-center p-4' style={{ background: "#e1f4e5" }}>
                            <img src={orderPlacedImg} alt="order confirmed" className='orderPlacedImg' style={{ width: "170px" }} />
                            <h2 className='mb-3'>Order Successfully Booked</h2>
                            <div className='' onClick={() => navigate("/orders")} >
                                <div className='add_to_cart_button my-3 text-center  text-decoration-none '>My Orders</div>
                            </div>

                            <div className='' onClick={() => navigate("/")} >
                                <div className='verify_otp_button my-3 f17 text-center text-white text-decoration-none '>Continue shopping</div>
                            </div>
                        </div>

                        {/* ========Latest Products==== */}
                        <div className='container-fluid bg-white   p-3'>

                            <div className="row">
                                <div className='col-12 '><h4 className='text-uppercase text1 f14'>Recommonded Product</h4></div>
                            </div>

                            <div className='categoryBox jsc flex-wrap'>
                                <>
                                    <Swiper
                                        slidesPerView={6}
                                        spaceBetween={1}
                                        loop={true} // Enable looping
                                        autoplay={{
                                            delay: 2000, // Auto slide every 3 seconds
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
                                                slidesPerView: 5,
                                            },
                                            // when window width is >= 1024px (large devices)
                                            1024: {
                                                slidesPerView: 6,
                                            },
                                        }}
                                    >
                                        {
                                            latestProduct ?
                                                latestProduct.map((data, index) => {
                                                    return (
                                                        // <Card1 catData={data} productData={data} key={index} />
                                                        <SwiperSlide key={index} className=' p-2 border' >
                                                            <Link to={`${base_url}/${data.cat_name}/${(data.slug).replace(' ', '-')}/${data.product_id}`}
                                                                className='text-center '>
                                                                <img src={`${api_base_url}${data.cat_id}/${data.product_id}/${data.img1}`} alt="" className='w-100' />
                                                                <p style={{ fontSize: "12px", height: "54px", }} className='mt-2' >
                                                                    {data.title.length > 25 ? data.title.slice(0, 45) + "..." : data.title}
                                                                </p>
                                                            </Link>
                                                        </SwiperSlide>
                                                    )
                                                })
                                                : null
                                        }

                                    </Swiper>
                                </>


                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Success