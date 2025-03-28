import React from 'react'
import { Link } from 'react-router-dom';
import "./card1.css"



const Card1 = ({ productData }) => {

  var product_url = import.meta.env.VITE_API_BASE_URL + "/files/products/";
  // console.log(productData);
  return (
    <>
      <div className=' col-xl-2 col-lg-4 col-md-4 col-sm-6 col-sm-4 col-6 animate__animated animate__fadeIn mb-md-3 mb-1 p-1' >
        <a style={{ textDecoration: "none", color: "#083c44" }} href={`/${productData.cat_name}/${(productData.slug).replace(' ', '-')}/${productData.product_id}`} >
          <div className='border p-1 text-center rounded shadow-sm'>
            <div className='card1 bg-white  jcc p-0'>
              <img src={`${product_url}${productData.cat_id}/${productData.product_id}/${productData.img1}`} alt="" className='w-100' />
            </div>
            <h5 className="mt-3 f12  text-dark" >{productData.title.length > 25 ? productData.title.slice(0, 30) + "..." : productData.title} </h5>
            {/* <p className="my-1 font-bold text-success" >Discount {Math.floor(productData.discount)}% OFF</p> */}
          </div>
        </a>
      </div>

    </>
  )
}

export default Card1