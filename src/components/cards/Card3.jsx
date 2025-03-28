import React, { useEffect, useState } from 'react'
import "./card1.css"
import axios from 'axios';
import { Link } from 'react-router-dom';
var api_base_url = import.meta.env.VITE_API_BASE_URL + "/files/products/";

const Card3 = ({ order_status, detail, pro_id, select_cancel_Order, trackOrder }) => {

  const [img1, setImg1] = useState(null);
  const [slug, setSlug] = useState(null);
  const [title, setTitle] = useState(null);
  const [Cat_id, setCat_id] = useState(null);
  const [Pro_id, setPro_id] = useState(null);
  const [catName, setCatName] = useState(null);

  const getDeldate = (dateString) => {
    const date = new Date(dateString);
    // Add 5 days
    date.setDate(date.getDate() + 5);
    // Output the new date
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options);

    return formattedDate;
  }
  useEffect(() => {


    const getProductData = async (pro_id) => {

      let url = import.meta.env.VITE_API_USER_GET_PRODUCT_BY_PRO_ID + `${pro_id}`;
      return axios.get(url)
        .then((response) => {
          if (response.data.msg === "success") {
            return response.data.pro_detail;
          }
        })
        .catch((error) => {
          console.error('Error fetching product data:', error);
          throw error;
        });
    }

    getProductData(pro_id)
      .then((product) => {
        // console.log(product);
        setImg1(product.img1);
        setSlug(product.slug)
        setTitle(product.slug.replace(/ /g, '-'));
        setCatName(product.cat_name);
        setCat_id(product.cat_id)
        setPro_id(product.product_id)
      })
      .catch((error) => {

      });

    console.log(detail.order_date);

  }, [])

  return (
    <>
      <div className='col-md-12 col-12 border p-2 rounded bg-white mb-2'>

        <div className='row  flex-row justify-content-between '>

          <div className="col-md-6 col-7 ">
            <Link to={`/${catName}/${title}/${pro_id}`} style={{ textDecoration: "none" }}>
              <img src={`${api_base_url}/${Cat_id}/${Pro_id}/${img1}`} alt="" className='' style={{ width: "50%" }} />
            </Link>
            <div className="col-md-12  text-dark f12 py-1 "> {slug} </div>
            <div className="col-md-12  text-dark f12 py-1 fw-bold"> Delivery Date: <br/> {getDeldate(detail.order_date)}</div>
          </div>

          <div className='col-md-2 col-5 '>

            <div className='mb-2 text-dark fw-bold'>
              {order_status === 'new' ? "Order Placed" : order_status}
            </div>

            <button className='btn btn-outline-primary p-1 f14 fw-normal mb-2 w-100' onClick={() => trackOrder(detail.order_id)}
              data-bs-toggle="modal" data-bs-target="#trackingDetail" ><i className='fa fa-truck'></i> Tracking</button>

            {
              order_status === 'Shipped' || order_status === 'outForDelivery' || order_status === 'Cancelled' || order_status === 'Delivered' || order_status === 'Return' ?
                <>
                  {
                    order_status === 'Cancelled' ?
                      <div className='col-md-12   '>
                        <h4 className='text-danger'>Cancelled</h4>
                      </div>
                      :
                      <>{order_status}</>
                  }
                </>
                :
                <>
                  <button className='btn btn-outline-danger p-1 f14 fw-normal mb-3  w-100' onClick={() => select_cancel_Order(detail.order_id)}>
                    <i className='fa fa-close' ></i> Cancel</button>
                </>
            }
          </div>

        </div>



        {/* <div className='col-12  d-flex justify-content-md-end justify-content-center'>
          {
            order_status === 'Shipped' || order_status === 'outForDelivery' || order_status === 'Cancelled' || order_status === 'Delivered' || order_status === 'Return' ?
              <>
                {
                  order_status === 'Cancelled' ?

                    <div className='col-md-3 col-12  text-center'>
                      <h6 className='text-danger'>Order has been cancelled</h6>
                      <button className='btn btn4 f12 ' onClick={() => trackOrder(detail.order_id)}
                        data-bs-toggle="modal" data-bs-target="#trackingDetail" ><i className='fa fa-truck'></i> Track order</button>
                    </div>

                    :
                    <div className='col-md-3 col-12  text-center'>
                      <button className='btn btn4 f12 ' onClick={() => trackOrder(detail.order_id)}
                        data-bs-toggle="modal" data-bs-target="#trackingDetail" ><i className='fa fa-truck'></i> Track order</button>
                    </div>
                }
              </>
              :
              <>
                <div className='col-md-3 col-5 me-3 text-center'>
                  <button className='btn btn5 f12 ' onClick={() => select_cancel_Order(detail.order_id)}><i className='fa fa-close' ></i> Cancel order</button>
                </div>

                <div className='col-md-3 col-5 me-3 text-center'>
                  <button className='btn btn4 f12 ' onClick={() => trackOrder(detail.order_id)}
                    data-bs-toggle="modal" data-bs-target="#trackingDetail" ><i className='fa fa-truck'></i> Track order</button>
                </div>
              </>
          }

        </div>

        <div className='col-12  d-flex justify-content-md-end justify-content-center'>
          {
            order_status === 'Shipped' || order_status === 'outForDelivery' || order_status === 'Cancelled' || order_status === 'Delivered' || order_status === 'Return' ?
              <>
                {
                  order_status === 'Cancelled' ?

                    <div className='col-md-3 col-12  text-center'>
                      <h6 className='text-danger'>Order has been cancelled</h6>
                      <button className='btn btn4 f12 ' onClick={() => trackOrder(detail.order_id)}
                        data-bs-toggle="modal" data-bs-target="#trackingDetail" ><i className='fa fa-truck'></i> Track order</button>
                    </div>

                    :
                    <div className='col-md-3 col-12  text-center'>
                      <button className='btn btn4 f12 ' onClick={() => trackOrder(detail.order_id)}
                        data-bs-toggle="modal" data-bs-target="#trackingDetail" ><i className='fa fa-truck'></i> Track order</button>
                    </div>
                }
              </>
              :
              <>
                <div className='col-md-3 col-5 me-3 text-center'>
                  <button className='btn btn5 f12 ' onClick={() => select_cancel_Order(detail.order_id)}><i className='fa fa-close' ></i> Cancel order</button>
                </div>

                <div className='col-md-3 col-5 me-3 text-center'>
                  <button className='btn btn4 f12 ' onClick={() => trackOrder(detail.order_id)}
                    data-bs-toggle="modal" data-bs-target="#trackingDetail" ><i className='fa fa-truck'></i> Track order</button>
                </div>
              </>
          }

        </div> */}


      </div>
    </>
  )
}

export default Card3