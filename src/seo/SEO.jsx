import React from 'react'
import { Helmet } from 'react-helmet'


const SEO = ({ SEO_DATA, isPorductPage = null }) => {
    return (
        <>
            <Helmet>
                {/* Title Tag */}
                {/* <title> {SEO_DATA.title === "Home" ? '' : SEO_DATA.title + " | "}  Goolu Store | Online Shopping Store in India | Mobile | Smartphone | Home Appliancies | Online Viral  products | Make in India </title> */}
                {/* Basic Meta Tags */}
                <meta name="description" content={SEO_DATA.description} />
                <meta name="keywords" content={SEO_DATA.keywords} />
                <meta name="author" content={SEO_DATA.author} />
                <meta name="theme-color" content="#ff5722" />

                {/* Open Graph Meta Tags (For Facebook, LinkedIn, etc.) */}
                <meta property="og:title" content={SEO_DATA.title} />
                <meta property="og:description" content={SEO_DATA.description} />
                <meta property="og:image" content={SEO_DATA.og_image} />
                <meta property="og:url" content={SEO_DATA.og_url} />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content={SEO_DATA.og_site_name} />

                {/* Twitter Card Meta Tags */}
                <meta name="twitter:card" content={SEO_DATA.twitter_card} />
                <meta name="twitter:title" content={SEO_DATA.twitter_title} />
                <meta name="twitter:description" content={SEO_DATA.twitter_description} />
                <meta name="twitter:image" content={SEO_DATA.twitter_image} />
                <meta name="twitter:creator" content={SEO_DATA.twitter_creator} />
                <meta name="twitter:site" content={SEO_DATA.twitter_site} />

                {/* Canonical Link */}
                <link rel="canonical" href={SEO_DATA.canonical} />

                {
                    isPorductPage === "yes" ?
                        (
                            <script type="application/ld+json">
                                {`
                        {
                            "@context": "https://schema.org",
                            "@type": "Product",
                            "name": "${SEO_DATA.product_name}",
                            "description": "${SEO_DATA.product_description}",
                            "image": "${SEO_DATA.product_image}",
                            "sku": "${SEO_DATA.product_sku}",
                            "offers": {
                                "@type": "Offer",
                                "url": "${SEO_DATA.product_url}",
                                "priceCurrency": "${SEO_DATA.priceCurrency}",
                                "price": "${SEO_DATA.product_price}",
                                "availability": "${SEO_DATA.product_availability}"
                                }
                                }
                                `}
                            </script>
                        )
                        : ""
                }

            </Helmet>
        </>
    )
}

export default SEO