import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Card2 from '../../components/cards/Card2';
import Heading1 from '../../components/heading/Heading1';

import SEO from '../../seo/SEO';
import Card1 from '../../components/cards/Card1';

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


const Category = () => {

    const { catName, cat_id } = useParams();
    const [productList, setproductList] = useState();

    // =====products List====
    useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        let url = import.meta.env.VITE_API_USER_GET_PRODUCT_BY_CAT_ID;
        fetch(url + cat_id, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                // console.log(result);
                if (result.msg == 'success') {
                    setproductList(result.pro_detail)
                }
            })
            .catch((error) => console.error(error));

        SEO_DATA.title = catName + " | Category ";

    }, [])


    return (
        <>

            <SEO SEO_DATA={SEO_DATA} />

            <section className='categoryItems '>
                <div className="container-fluid">
                    <div className='row'>
                        <Heading1 title={catName} />
                    </div>

                    <div className='col-12 d-flex flex-wrap justify-content-start '>
                        {
                            productList ?
                                productList.map((productData, index) => {
                                    return (
                                        <Card2 productData={productData} catName={catName} key={index} />
                                        // <Card1 productData={productData} key={index} />
                                    )
                                })
                                :
                                <div className='col-12 jcc bg-white p-md-2 p-0'>
                                    <img src={'/assets/category/no-products-found.png'} alt="" style={{ width: "150px" }} />
                                </div>
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Category