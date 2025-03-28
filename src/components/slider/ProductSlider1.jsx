import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ImageCard1 from "../cards/ImageCard1";

export default function ProductSlider1({ sliderList }) {

    console.log(sliderList);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <Slider {...settings}>

            {
                sliderList.map((image, index) => {
                    (
                        <div key={index}>
                            <h3>{<ImageCard1 imageUrl={image} />} </h3>
                        </div>
                    )
                })
            }

        </Slider>
    );
}