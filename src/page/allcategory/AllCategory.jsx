import React, { useEffect, useState } from 'react'
import Heading1 from '../../components/heading/Heading1';
import CatCard from '../../components/cards/CatCard';

import SEO from '../../seo/SEO';

const SEO_DATA = {
    title: "Product Category",
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

const AllCategory = () => {

    const [catList, setcatList] = useState();

    function getCat() {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        let url = import.meta.env.VITE_API_USER_GET_ALL_CAT;
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.msg == 'success') {
                    setcatList(result.all_cat)
                }
            })
            .catch((error) => console.error(error));
    }

    //  ===category List=====
    useEffect(() => {
        getCat()
    }, [])

    return (
        <>

            <SEO SEO_DATA={SEO_DATA} />

            <section className='categoryItems my-3 bg-white'>
                <div className="container">
                    <div className='row'>
                        <Heading1 title={"All Category"} />
                    </div>

                    <div className="categoryBox jac flex-wrap">

                        {
                            catList
                                ?
                                catList.map((catData, index) => {
                                    return (
                                        <CatCard productData={catData} key={index} />
                                    )
                                })
                                : null
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default AllCategory 