import React from 'react'

const Card5 = ({ data }) => {
    var base_url = import.meta.env.VITE_API_BASE_URL;
    var api_base_url = import.meta.env.VITE_API_BASE_URL + "/files/products/";

    return (
        <>
            <a href={`/${data.cat_name}/${(data.slug).replace(' ', '-')}/${data.product_id}`}
                className='text-center border rounded p-1 shadow-sm'>
                <img src={`${api_base_url}${data.cat_id}/${data.product_id}/${data.img1}`} alt="" className='w-100' />
                <p style={{ fontSize: "14px", height: "40px", }} className='mt-2' >
                    {data.title.length > 25 ? data.title.slice(0, 27) + "..." : data.title}
                </p>
            </a></>
    )
}

export default Card5