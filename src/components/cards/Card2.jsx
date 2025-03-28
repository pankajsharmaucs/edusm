import React from 'react'
// import { Link } from 'react-router-dom';
import "./card1.css"



const Card2 = ({ productData, catName }) => {

  var api_base_url = import.meta.env.VITE_API_BASE_URL + "/files/products/";

  // console.log(productData);


  return (
    <>
      <div className=' col-xl-2 col-lg-4 col-md-5 col-sm-6 col-6   p-md-3 p-1 mb-1' >
        <a style={{ textDecoration: "none" }} href={`/${catName}/${productData.slug.replace(" ", "-")}/${productData.product_id}`}
          className=' '>
          <div className='border text-center  animate__animated animate__fadeIn bg-white'>
            <div className='imageBox'>
              <img src={`${api_base_url}${productData.cat_id}/${productData.product_id}/${productData.img1}`} alt="" className='w-100 p-3' />
            </div>
            <div className='col-12 text-center my-1'>
              <h6 className='mt-0 f12'>{productData.title}</h6>

              <div className='jcc mb-3'>
                <h6 className='mt-1 f12 text-muted me-2 pt-2 '><strike>₹{productData.price}</strike></h6>
                <h3 className='mt-1 f20 text-success '>
                  ₹{productData.price - Math.floor(productData.price * productData.discount / 100)}
                </h3>
              </div>

              {/* <h5 className='mt-1  '>
                Discount {productData.discount}%
              </h5> */}

              {/* <div className=''><span className='text-primary'>( 2000+ Reviews )</span></div>
              <div className='mb-2 jcc rating'>
                <i className="fa fa-star me-1 " ></i>
                <i className="fa fa-star me-1 " ></i>
                <i className="fa fa-star me-1 " ></i>
                <i className="fa fa-star me-1 " ></i>
                <i className="fa fa-star me-1 " ></i>
              </div> */}

              {/* <div className='col-12 text-center' >
                <button className='btn btn1 me-2 btn-sm mb-1 w-100' >Add to cart</button>
                <button className='btn btn2 btn-sm mb-1 w-100'>Buy</button>
              </div> */}

            </div>
          </div>
        </a>
      </div>

    </>
  )
}

export default Card2