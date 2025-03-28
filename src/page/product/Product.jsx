import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PreLoader from '../../components/preloader/PreLoader';
import MyContext from '../../useContext/MyContext';
import './product.css';
import Slider3 from '../../components/slider/Slider3';
import axios from 'axios';
import SEO from '../../seo/SEO';
import Bottom_notify from '../../components/popup/Bottom_notify';
import AddToCart_Btn from '../../components/button/AddToCart_Btn';
import { GoToCart, Checkout_button } from '../../components/button/Checkout_button';
import Card5 from '../../components/cards/Card5';

import { SwiperSlide } from 'swiper/react';
import { Swiper } from 'swiper/react'; // Import Swiper for usage in the component
import { Autoplay } from 'swiper/modules';
import CustomerRating from '../../components/rating/CustomerRating';

const ainmate_fadeIn = "animate__animated animate__fadeIn animate__faster";

const SEO_DATA = {
    title: "",
    description: "Goolu Store is India's premier online shopping destination for electronics, fashion, home goods, and more. Shop with the best deals and discounts on a wide range of products.",
    keywords: "online shopping, India, electronics, fashion, gadgets, home goods, discounts, Goolu store",
    author: "Goolu Store",
    og_site_name: "Goolu Store",

    og_image: "https://www.goolu.in/assets/og-image.jpg",
    og_url: "https://www.goolu.in",

    twitter_card: "Goolu Store",
    twitter_title: "https://www.goolu.in/assets/og-image.jpg",
    twitter_description: "https://www.goolu.in",
    twitter_image: "https://www.goolu.in/assets/twitter-image.jpg",
    twitter_creator: "https://www.goolu.in",
    twitter_site: "https://www.goolu.in",

    canonical: "https://www.goolu.in",

};

const Product = () => {

    const navigate = useNavigate();
    const { isLogin } = useContext(MyContext);
    const { myCartList } = useContext(MyContext);
    const { cat_name, product_name, pro_id } = useParams();
    const [simillarPro, setsimillarPro] = useState([]);
    const [latestPro, setlatestPro] = useState([]);
    const [Highlights, setHighlights] = useState([]);
    const [CustomerReview, setCustomerReview] = useState([]);


    // ============State====================
    const [inCart, SetInCart] = useState(false);
    const [isAddedInCart, SetisAddedInCart] = useState(false);
    const [loading, SetLoading] = useState(true);
    const [productData, setproductData] = useState([]);
    const [productPrice, setproductPrice] = useState(null);
    const [MainImage, setMainImage] = useState(null);
    const [sliderList, setsliderList] = useState([]);
    const [ZoomSlider, setZoomSlider] = useState(false);

    var base_url = import.meta.env.VITE_API_BASE_URL;
    var api_base_url = import.meta.env.VITE_API_BASE_URL + "/files/products/";

    // ============Functions=====================

    const handlesetMainImage = (img) => {
        let url = `${api_base_url}${productData.cat_id}/${productData.product_id}/${img}`;
        setMainImage(url)
    }

    const showAddCartPopUp = () => {

        SetisAddedInCart(true);
        setTimeout(() => {
            SetisAddedInCart(false);
        }, 2000)
    }

    function addToCart() {
        if (localStorage.getItem('token')) {

            let user_id = localStorage.getItem("userId");
            let token = localStorage.getItem("token");
            let title = productData.title;
            let imgLink = `${api_base_url}${productData.cat_id}/${productData.product_id}/${productData.img1}`;

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const data = JSON.stringify({
                "user_id": user_id,
                "token": token,
                "pro_id": productData.product_id,
                "pro_name": title,
                "img1": imgLink,
            });

            const url = import.meta.env.VITE_API_USER_ADD_TO_CART;
            axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                const result = response.data;
                if (result.msg === 'success') {
                    SetInCart(true);
                    myCartList.setMycart(result.cart_item);
                    showAddCartPopUp();
                } else {
                    SetInCart(false);
                }
            }).catch(() => {
                SetInCart(false);
            });

        } else {
            // Extract only required fields from productData
            const productToAdd = {
                product_id: productData.product_id,
                cat_id: productData.cat_id,
                pro_name: productData.title,
                price: productData.price,
                discount: productData.discount,
                img1: productData.img1,
                qty: 1, // Always set quantity to 1
            };

            // Retrieve cart from localStorage
            let cart = JSON.parse(localStorage.getItem("guestCart")) || [];

            // Check if product already exists in the cart
            const productIndex = cart.findIndex(item => item.product_id === productToAdd.product_id);

            if (productIndex !== -1) {
                // If product exists, update the quantity (add one more)
                cart[productIndex].quantity += 1;
            } else {
                // Otherwise, add the new product to the cart
                cart.push(productToAdd);
            }

            // Save updated cart back to localStorage
            localStorage.setItem("guestCart", JSON.stringify(cart));

            // Update state/UI
            myCartList.setMycart(cart);
            SetInCart(true);
            showAddCartPopUp();

            // console.log(localStorage.getItem("guestCart"));

        }
    }

    const get_product_cart_status = () => {
        if (localStorage.getItem('token')) {
            let user_id = localStorage.getItem("userId");
            let token = localStorage.getItem("token");

            const url = import.meta.env.VITE_API_USER_GET_CART_BY_PRO_ID;
            const headers = {
                'Content-Type': 'application/json'
            };

            const data = {
                user_id: user_id,
                token: token,
                pro_id: pro_id
            };

            axios.post(url, data, { headers })
                .then(response => {
                    if (response.data.msg === 'success') {
                        SetInCart(true);
                    } else {
                        SetInCart(false);
                    }
                })
                .catch(error => {
                    console.error('Error fetching cart status:', error);
                });
        } else {
            // For guest users: Check the localStorage "guestCart" to see if the product exists
            let guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
            const isProductExist = guestCart.some(item => item.product_id === productData.product_id);
            SetInCart(isProductExist);
            // localStorage.clear()

        }
    };

    // ===latest===products====
    function get_products_simillar(cat_id) {
        const requestOptions = {
            method: "GET",
            url: import.meta.env.VITE_API_USER_GET_PRODUCT_SECION_LATEST + "?section=simillar&limit=4&cat_id=" + cat_id,
        };

        axios(requestOptions)
            .then((response) => {
                const result = response.data;
                if (result.msg === 'success') {
                    setsimillarPro(result.pro_list);
                    // return  result.pro_list;
                }
            })
            .catch((error) => console.error(error));
    }

    // ===simillar===products====
    function get_products_latest(cat_id) {
        const requestOptions = {
            method: "GET",
            url: import.meta.env.VITE_API_USER_GET_PRODUCT_SECION_LATEST + "?section=latest&limit=4&cat_id=" + cat_id,
        };

        axios(requestOptions)
            .then((response) => {
                const result = response.data;
                if (result.msg === 'success') {
                    setlatestPro(result.pro_list);
                    // return result.pro_list;
                }
            })
            .catch((error) => console.error(error));
    }

    const fetchData = async () => {
        const url = `${import.meta.env.VITE_API_USER_GET_PRODUCT_BY_PRO_ID}${pro_id}`;

        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        try {
            const response = await axios.get(url, requestOptions);
            const result = response.data;

            if (result.msg === 'success') {

                setproductData(result.pro_detail);
                let discount = result.pro_detail.discount;
                let price = result.pro_detail.price;
                let cat_id = result.pro_detail.cat_id;

                setproductPrice(price - Math.floor(price * discount / 100))

                get_products_simillar(cat_id);
                get_products_latest(cat_id);
                setHighlights(result.all_highlights);

                var api_base_url = import.meta.env.VITE_API_BASE_URL + "/files/products/";
                const newSliderList = [];

                // Check if each img field is not empty, and only add to the list if valid
                if (result.pro_detail.img1) {
                    newSliderList.push({
                        id: 1,
                        image: `${api_base_url}${result.pro_detail.cat_id}/${result.pro_detail.product_id}/${result.pro_detail.img1}`,
                        linkTo: ""
                    });
                }

                if (result.pro_detail.img2) {
                    newSliderList.push({
                        id: 2,
                        image: `${api_base_url}${result.pro_detail.cat_id}/${result.pro_detail.product_id}/${result.pro_detail.img2}`,
                        linkTo: ""
                    });
                }

                if (result.pro_detail.img3) {
                    newSliderList.push({
                        id: 3,
                        image: `${api_base_url}${result.pro_detail.cat_id}/${result.pro_detail.product_id}/${result.pro_detail.img3}`,
                        linkTo: ""
                    });
                }

                if (result.pro_detail.img4) {
                    newSliderList.push({
                        id: 4,
                        image: `${api_base_url}${result.pro_detail.cat_id}/${result.pro_detail.product_id}/${result.pro_detail.img4}`,
                        linkTo: ""
                    });
                }

                if (result.pro_detail.img5) {
                    newSliderList.push({
                        id: 5,
                        image: `${api_base_url}${result.pro_detail.cat_id}/${result.pro_detail.product_id}/${result.pro_detail.img5}`,
                        linkTo: ""
                    });
                }

                let url = `${api_base_url}${result.pro_detail.cat_id}/${result.pro_detail.product_id}/${result.pro_detail.img1}`;
                setMainImage(url)

                setsliderList(newSliderList);

                get_product_cart_status();
                SetLoading(false);
            } else {
                SetLoading(false);

            }
        } catch (error) {
            SetLoading(false);
        }
    };

    // ===latest===products====
    function get_products_review() {

        const url = import.meta.env.VITE_API_USER_GET_PRODUCT_REVIEW;
        const headers = {
            'Content-Type': 'application/json'
        };

        const data = {
            product_id: pro_id
        };

        axios.post(url, data, { headers })
            .then(response => {
                // console.log(response);
                if (response.data.msg === 'success') {
                    setCustomerReview(response.data.product_rating);
                } else {
                    setCustomerReview([]);
                }
            })
            .catch(error => {
                console.error('Error fetching cart status:', error);
            });
    }

    useEffect(() => {

        fetchData();

        get_product_cart_status();

        get_products_review();

        SEO_DATA.title = product_name + " | " + cat_name;
        SEO_DATA.product_name = product_name;
        SEO_DATA.product_description = productData.description;
        SEO_DATA.product_image = `${api_base_url}${productData.cat_id}/${productData.product_id}/${productData.img1}`
        SEO_DATA.product_sku = "";
        SEO_DATA.product_url = `${import.meta.env.VITE_API_BASE_URL}/${cat_name}/${product_name}/${pro_id}`;
        SEO_DATA.priceCurrency = "INR";
        SEO_DATA.product_price = productData.price;
        SEO_DATA.product_availability = "https://schema.org/InStock";

        SEO_DATA.og_image = `${api_base_url}${productData.cat_id}/${productData.product_id}/${productData.img1}`;
        SEO_DATA.og_url = `${import.meta.env.VITE_API_BASE_URL}/${cat_name}/${product_name}/${pro_id}`;

        SEO_DATA.twitter_card = "Goolu Store";
        SEO_DATA.twitter_title = product_name;
        SEO_DATA.twitter_description = productData.description;
        SEO_DATA.twitter_image = `${api_base_url}${productData.cat_id}/${productData.product_id}/${productData.img1}`;
        SEO_DATA.twitter_creator = `${import.meta.env.VITE_API_BASE_URL}`;
        SEO_DATA.twitter_site = `${import.meta.env.VITE_API_BASE_URL}`;


    }, [productPrice])


    return (
        <>

            <SEO SEO_DATA={SEO_DATA} isPorductPage={"yes"} />

            {
                loading ? <PreLoader />
                    :
                    <section className={ainmate_fadeIn + ' productDetailPage  '} >
                        <div className="container  bg-white ">
                            <div className="row  p-0 align-items-md-start align-items-center">

                                <div className='col-xl-6 col-lg-5 col-md-5 col-sm-12 p-2'>
                                    <nav aria-label="breadcrumb " className='px-1'>
                                        <ol className="breadcrumb mb-0">
                                            <li className="breadcrumb-item"><Link style={{ color: "black" }} to={"/"}>Home</Link></li>
                                            <li className="breadcrumb-item"><Link style={{ color: "black" }} to={`/category/${cat_name}/${productData.cat_id}`}>{cat_name}</Link></li>
                                        </ol>
                                    </nav>
                                    <div className='row jcc my-2' style={{ padding: "1%" }}>

                                        <div className="col-12 order-first cp p-0 border jcc" style={{ cursor: "pointer" }}

                                        >

                                            <Swiper
                                                slidesPerView={1}
                                                spaceBetween={1}
                                                loop={true} // Enable looping
                                                autoplay={{
                                                    delay: 2000, // Auto slide every 2 seconds
                                                    disableOnInteraction: false, // Keep autoplay running even after user interaction
                                                }}
                                                modules={[Autoplay]}
                                                pagination={{
                                                    clickable: true,
                                                    dynamicBullets: true, // Enable dynamic bullets
                                                }}
                                                className="mySwiper"
                                            >
                                                {productData.img1 && (
                                                    <SwiperSlide className="p-2">
                                                        <img
                                                            src={`${api_base_url}${productData.cat_id}/${productData.product_id}/${productData.img1}`}
                                                            className="w-100"
                                                            alt="Product Image 1"
                                                        />
                                                    </SwiperSlide>
                                                )}

                                                {productData.img2 && (
                                                    <SwiperSlide className="p-2">
                                                        <img
                                                            src={`${api_base_url}${productData.cat_id}/${productData.product_id}/${productData.img2}`}
                                                            className="w-100"
                                                            alt="Product Image 2"
                                                        />
                                                    </SwiperSlide>
                                                )}

                                                {productData.img3 && (
                                                    <SwiperSlide className="p-2">
                                                        <img
                                                            src={`${api_base_url}${productData.cat_id}/${productData.product_id}/${productData.img3}`}
                                                            className="w-100"
                                                            alt="Product Image 3"
                                                        />
                                                    </SwiperSlide>
                                                )}

                                                {productData.img4 && (
                                                    <SwiperSlide className="p-2">
                                                        <img
                                                            src={`${api_base_url}${productData.cat_id}/${productData.product_id}/${productData.img4}`}
                                                            className="w-100"
                                                            alt="Product Image 4"
                                                        />
                                                    </SwiperSlide>
                                                )}

                                                {productData.img5 && (
                                                    <SwiperSlide className="p-2">
                                                        <img
                                                            src={`${api_base_url}${productData.cat_id}/${productData.product_id}/${productData.img5}`}
                                                            className="w-100"
                                                            alt="Product Image 5"
                                                        />
                                                    </SwiperSlide>
                                                )}
                                            </Swiper>

                                        </div>

                                    </div>
                                </div>

                                <div className='col-xl-6 col-lg-7 col-md-7 col-sm-12 p-md-5 p-0 py-md-2 px-3 '>
                                    <div className="row  pt-1">
                                        <div className='col-12 '>

                                            <h4 className=' text-capitalize text-dark f14'>{productData.title}</h4>
                                            <h6>
                                                <span className='text-muted f13 me-1'><strike>&#8377; {productData.price}</strike></span>
                                                <span className='text-success f24 fw-bold'>&#8377; {productPrice}</span>

                                            </h6>

                                            <div className='col-12 warrantyBox mb-3'>
                                                <h6 className='mt-2 f13 '>
                                                    <img src="/assets/icons/checklist.png" className='cp checklist' alt="checklist" />
                                                    Free Delivery
                                                </h6>

                                                <h6 className='mt-2 f13 '>
                                                    <img src="/assets/icons/checklist.png" className='cp checklist' alt="checklist" />
                                                    Only Pure & Authentic Products
                                                </h6>

                                                <h6 className='mt-2 f13 '>
                                                    <img src="/assets/icons/checklist.png" className='cp checklist' alt="checklist" />
                                                    100% Money-Back Guarantee
                                                </h6>
                                            </div>

                                            <div className='col-12'>
                                                {
                                                    inCart
                                                        ?
                                                        <div className='w-100'>
                                                            <GoToCart text={`Go to cart`} linkTo={'/cart'} />
                                                        </div>
                                                        :
                                                        <div className='' onClick={() => addToCart()} >
                                                            {/* <Button3 text={`Add to Cart`} /> */}
                                                            <AddToCart_Btn text={`Add to cart`} />
                                                        </div>
                                                }
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                {/* ========Similar Products==== */}
                                <section className='categorySection p-0 mt-3 '>
                                    <div className='container-fluid bg-white   p-3'>

                                        <div className="row">
                                            <div className='col-12 '><h4 className='text-uppercase f16 fw-bold'>Simillar Product</h4></div>
                                        </div>

                                        <div className='categoryBox  flex-wrap'>
                                            <>
                                                <Swiper
                                                    slidesPerView={2}
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
                                                            slidesPerView: 4,
                                                        },
                                                        // when window width is >= 1024px (large devices)
                                                        1024: {
                                                            slidesPerView: 6,
                                                        },
                                                    }}
                                                >
                                                    {
                                                        simillarPro ?
                                                            simillarPro.map((data, index) => {
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
                                            </>
                                        </div>
                                    </div>
                                </section>

                                {/* ========Product===decription========= */}
                                <div className='col-xl-12 text-md-start p-md-4 p-0 px-3 ProductDescription'>
                                    <div className='col-12 '><h4 className='text-uppercase f16 fw-bold'>Product Description</h4></div>
                                    <p className='f13' >{productData.description}</p>
                                    <div className='col-12 mt-3 '><h4 className='text-uppercase f16 fw-bold'>Highlights</h4></div>

                                    <div className='col-12 warrantyBox border-0 mb-3'>
                                        {Highlights && Highlights.length > 0 ? (
                                            Highlights.map((data, index) => (
                                                <h6 className='mt-2 f13 '>
                                                    <img src="/assets/icons/check2.png" className='cp checklist' alt="checklist" />
                                                    {data.name}
                                                </h6>
                                            ))
                                        ) : (
                                            <li className="list-group-item text-muted">No Product highlights </li>
                                        )}
                                    </div>
                                </div>

                                {/* ========Latest Products==== */}
                                <section className='categorySection p-0 mt-3 '>
                                    <div className='container-fluid bg-white   p-3'>

                                        <div className="row">
                                            <div className='col-12 '><h4 className='text-uppercase f16 fw-bold'>Latest Product</h4></div>
                                        </div>

                                        <div className='categoryBox p-0 jsc flex-wrap'>
                                            <>
                                                <Swiper
                                                    slidesPerView={2}
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
                                                        latestPro ?
                                                            latestPro.map((data, index) => {
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
                                            </>


                                        </div>
                                    </div>
                                </section>

                                {/* ========Rating Module======== */}

                                {
                                    CustomerReview.length ?
                                        <div className='col-xl-12 text-md-start  p-md-4 p-0 px-4 ratingBox'>
                                            <CustomerRating CustomerReview={CustomerReview} />
                                        </div> : null
                                }


                            </div>
                        </div>
                    </section >
            }

            {
                ZoomSlider
                    ?
                    <section className='zoomSlider   my-0 animate__animated animate__fadeIn animate__faster '>
                        <div className='container bg-white   p-md-1 p-3 animate__animated animate__slideInUp animate__faster '>
                            <div className="row jcc">
                                <div className="col-md-5">
                                    <Slider3 sliderList={sliderList} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 text-center my-5" onClick={() => setZoomSlider(false)}>
                            <div className='checkout_button px-2 cp' >Close</div>
                        </div>
                    </section>
                    :
                    null
            }

            {
                isAddedInCart
                    ?
                    <Bottom_notify msg={"Added to cart Successfully"} icon={"/assets/icons/check.png"} />
                    :
                    null
            }


        </>
    )
}

export default Product