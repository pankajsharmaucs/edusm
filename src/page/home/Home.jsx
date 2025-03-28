import React, { useContext, useEffect, useState } from "react";
import Card5 from "../../components/cards/Card5";
import CardLoader from "../../components/preloader/CardLoader";
import Slider1 from "../../components/slider/Slider1";
import MyContext from "../../useContext/MyContext";
import axios from "axios";
import SEO from "../../seo/SEO";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Category_section from "../../components/category/Category_section";
import "./home.css";

const Home = () => {
  const { isLogin } = useContext(MyContext);
  const [catList, setCatList] = useState([]);
  const [latestProduct, setLatestProduct] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true); // Track product loading

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // Fetch category list
  useEffect(() => {
    fetch(import.meta.env.VITE_API_USER_GET_ALL_CAT)
      .then((response) => response.json())
      .then((result) => {
        if (result.msg === "success") {
          setCatList(result.all_cat);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  // Fetch latest products
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_USER_GET_PRODUCT_SECION_LATEST}?section=latest&limit=10`)
      .then((response) => {
        if (response.data.msg === "success") {
          setLatestProduct(response.data.pro_list);
          setLoadingProducts(false); // Products are loaded
        }
      })
      .catch((error) => console.error(error));
  }, []);



  return (
    <>
      <SEO SEO_DATA={{ title: "Home", description: "Goolu Store's best products..." }} />

      <div className="animate__animated animate__fadeIn my-md-2 my-1">
        {/* ======== Category List ======= */}
        <div className="container-fluid p-0 bg-white">
          <div className="container">
            <div className="row">{catList ? <Slider1 catList={catList} /> : null}</div>
          </div>
        </div>

        {/* ======== Latest Products (Lazy Load with Loader) ======= */}
        <div className="container-fluid bg-white my-md-2 my-1 p-3">
          <div className="row">
            <div className="col-12">
              <h4 className="text-uppercase text1">Latest</h4>
            </div>
          </div>
          <div className="categoryBox jsc flex-wrap">
            <Swiper
              slidesPerView={2}
              spaceBetween={1}
              loop={true}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              modules={[Autoplay]}
              className="mySwiper"
              breakpoints={{ 320: { slidesPerView: 2 }, 768: { slidesPerView: 5 }, 1024: { slidesPerView: 6 } }}
            >
              {latestProduct
                ?
                latestProduct.map((data, index) => (
                  <SwiperSlide key={index} className="p-1 ">
                    <Card5 data={data} />
                  </SwiperSlide>
                )) : null
              }
            </Swiper>
          </div>
        </div>

        {/* ======== Categories (Lazy Load) ======= */}
        <div className="categorySection my-md-2 my-1">
          <div className="container-fluid p-0">
            {catList
              ? catList.map((cat_data, cat_key) =>
                cat_data.cat_name !== "categories" ? (
                  <div key={cat_key} className="bg-white my-2 p-md-4 p-2">
                    <div className="row p-2">
                      <div className="col-12 d-flex justify-content-between align-items-center px-2 h45">
                        <Link to={`${cat_data.linkTo}`} style={{ textDecoration: "none" }}>
                          <h4 className="text-capitalize font-bold text-dark pt-2">{cat_data.cat_name}</h4>
                        </Link>
                        <Link to={`${cat_data.linkTo}`}>
                          <h6 className="text-primary f15">Explore All</h6>
                        </Link>
                      </div>
                    </div>
                    <div className="categoryBox jcs flex-wrap">
                      <Category_section cat_id={cat_data.cat_id} />
                    </div>
                  </div>
                ) : null
              )
              : null}
          </div>
        </div>
      </div>

    </>
  );
};

export default Home;
