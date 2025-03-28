import React, { useContext, useEffect, useState } from 'react'
import Card3 from '../../components/cards/Card3';
import Heading1 from '../../components/heading/Heading1';
import axios from 'axios';
import PreLoader from '../../components/preloader/PreLoader';
import { useNavigate } from 'react-router-dom';
import MyContext from '../../useContext/MyContext';
import './dashboard.css'
import TrackingVertical from '../../components/orderTracking/TrackingVertical';
import Bottom_notify from '../../components/popup/Bottom_notify';

const MyOrders = () => {

  const navigate = useNavigate();
  let [orderList, setorderList] = useState([]);
  let [TrackingOrderData, setTrackingOrderData] = useState([]);
  const [loading, SetLoading] = useState(false);
  const [cancel_order_id, setcancel_order_id] = useState(null);
  const [isTraking, setisTraking] = useState(null);

  const [selectedCancelReason, setSelectedCancelReason] = useState('');
  const [AllData, setAllData] = useState([]);
  const [OrderStatusCount, setOrderStatusCount] = useState(1)
  const [UpDot, setUpDot] = useState(2)
  const [isOrderUpdated, setisOrderUpdated] = useState(null)
  const [msgPopup, setmsgPopup] = useState(null)

  var api_base_url = import.meta.env.VITE_API_BASE_URL + "/files/products/";

  const { isLogin } = useContext(MyContext);

  let jcc = `justify-content-start align-items-center`

  function select_cancel_Order(order_id) {
    setcancel_order_id(order_id);
  }

  const chooseCancelOption = (event) => {
    setSelectedCancelReason(event.target.value);
  };

  async function cancelOrder() {

    let order_id = cancel_order_id;
    let reason = selectedCancelReason;
    let order_status = "Cancelled";

    if (reason === '') {
      setmsgPopup("Please Select a Cancel Reason");
      close_pop_up();
      return;
    }

    if (localStorage.getItem('token')) {
      let user_id = localStorage.getItem('userId');
      let token = localStorage.getItem('token');

      const myHeaders = {
        'Content-Type': 'application/json'
      };

      const requestData = {
        user_id: user_id,
        token: token,
        order_id: order_id,
        order_status: order_status,
        reason: reason,
      };

      try {
        let url = import.meta.env.VITE_API_USER_UPDATE_ORDER_BY_ID;
        const response = await axios.post(url, requestData, { headers: myHeaders });
        if (response.data.msg === 'success') {
          setmsgPopup("Order " + order_status + " successfully")
          close_pop_up();
          setcancel_order_id(null)
          get_all_orders()
          return
        } else {
          setAllData([]);
        }
      } catch (error) {
        console.error('Error fetching order list:', error);
      }
    }
  }


  async function get_orderData(order_id) {
    if (localStorage.getItem('token')) {
      let user_id = localStorage.getItem('userId');

      const myHeaders = {
        'Content-Type': 'application/json'
      };

      const requestData = {
        user_id: user_id,
        order_id: order_id
      };

      try {
        let url = import.meta.env.VITE_API_USER_GET_ORDER_BY_ID;
        const response = await axios.post(url, requestData, { headers: myHeaders });

        if (response.data.msg === 'success') {

          // console.log(response.data.orderData[0]);
          setAllData(response.data.orderData[0]);
          setTrackingOrderData(response.data.orderData[0]);

          let order_status = response.data.orderData[0].order_status;

          if (order_status === "New") {
            setOrderStatusCount(1);
            setUpDot(2)
          }
          else if (order_status === "Packed") {
            setOrderStatusCount(2);
            setUpDot(3)
          }
          else if (order_status === "Shipped") {
            setOrderStatusCount(3);
            setUpDot(4)
          }
          else if (order_status === "outForDelivery") {
            setOrderStatusCount(4);
            setUpDot(5)
          }
          else if (order_status === "Delivered") {
            setOrderStatusCount(5);
            setUpDot(6)
          }
          else if (order_status === "Cancelled") {
            setOrderStatusCount(6);
            setUpDot(7)
          }
          else if (order_status === "Return") {
            setOrderStatusCount(7);
            setUpDot(8)
          }

        } else {
          setAllData([]);
        }
      } catch (error) {
        console.error('Error fetching order list:', error);
      }
    }
  }

  function trackOrder(order_id) {
    setisTraking(order_id);
    get_orderData(order_id);
  }

  function get_all_orders() {
    try {

      let pro_id = localStorage.getItem('pro_id');
      let userId = localStorage.getItem('userId');
      let token = localStorage.getItem('token');
      let url = import.meta.env.VITE_API_USER_GET_ALL_ORDERS;

      let productUrl = `${url}?user_id=${userId}&token=${token}&pro_id=${pro_id}`;
      axios.get(productUrl)
        .then((response) => {
          // console.log(response);
          if (response.data.msg == "success") {
            setorderList(response.data.allOrders)
          }
        });

    } catch (error) {
      SetLoading(false)
      console.error('Order failed:', error);
    }
  }

  function close_pop_up() {

    setTimeout(() => {
      setisOrderUpdated(null);
      setmsgPopup(null);
    }, 2000)

  }

  useEffect(() => {


    get_all_orders()

    if (!localStorage.getItem('token')) {
      navigate('/')
    }
  }, [isOrderUpdated])

  return (
    <>
      {
        loading ? <PreLoader msg={"Booking order, please wait..."} />
          :
          <div className='Section-wrapper bg-white jcc ' >
            <div className="container"  >

              <div className={`row p-2  mb-2 ${jcc} `} >
                <Heading1 title={"My Orders"} />
                {
                  orderList.map((item, i) => {
                    return (
                      <Card3 order_status={item.order_status} detail={item} select_cancel_Order={select_cancel_Order} trackOrder={trackOrder} pro_id={item.product_id} key={i} />
                    )
                  })
                }
              </div>

              

            </div>

            <div className='popupBox'>
              {
                /* cancel popup==== */
                cancel_order_id !== null
                  ?
                  <div className="modal fade show" style={{ display: 'block', }} tabIndex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title f14" id="cancelReasonLabel">Cancel My Order  </h5>
                          <button type="button" className="btn-close" onClick={() => { setcancel_order_id(null) }} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <div className='form-group col-12'>
                            <select value={selectedCancelReason} className='form-select ' onChange={chooseCancelOption} >
                              <option value="">Choose Reason</option>
                              <option value="Delivery is slow">Delivery is slow</option>
                              <option value="High Price">High Price</option>
                              <option value="Need other product">Need other product</option>
                            </select>
                          </div>
                          <button type="button" onClick={() => cancelOrder()} className="checkout_button w-100 mt-5 mb-2">Cancel Order</button>
                          {/* <button type="button" className="btn btn-dark w-100  mb-2" onClick={() => { setcancel_order_id(null) }}  >Close</button> */}
                        </div>

                      </div>
                    </div>
                  </div>
                  : null
              }


              {/* Tracking popup==== */
                isTraking !== null
                  ?
                  <div className="modal fade show" style={{ paddingBottom: "60px", display: 'block',zIndex:'1000000' }} tabIndex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title f18" id="trackingDetailLabel">Order Tracking   </h5>
                          <button type="button" className="btn-close" onClick={() => { setisTraking(null) }} ></button>
                        </div>
                        <div className="modal-body">
                          <section className="root">
                            <figure>
                              <img src={`${api_base_url}/${AllData.cat_id}/${AllData.product_id}/${AllData.img1}`} alt="mainImage" />
                              <figcaption>
                                <h4>{AllData.title}</h4>
                                <h2>₹ {AllData.sell_price}</h2>
                              </figcaption>
                            </figure>
                            <div className="order-track">

                              <div className="order-track-step">
                                <div className="order-track-status">
                                  <span className={`order-track-status-dot ${OrderStatusCount >= 1 ? "active-dot" : ""}`} />
                                  <span className={`order-track-status-line ${OrderStatusCount >= 1 ? "active-line" : ""}`} />
                                </div>
                                <div className="order-track-text">
                                  <p className="order-track-text-stat">Order Placed</p>
                                  <span className="order-track-text-sub">{TrackingOrderData.order_date}</span>
                                </div>
                              </div>

                              <div className="order-track-step">
                                <div className="order-track-status">
                                  {/* <span className="order-track-status-dot up-dot " /> */}
                                  <span className={`order-track-status-dot ${OrderStatusCount >= 2 ? "active-dot" : ""} ${UpDot == 2 ? "up-dot" : ""}`} />
                                  <span className={`order-track-status-line ${OrderStatusCount >= 2 ? "active-line" : ""}`} />
                                </div>
                                <div className="order-track-text">
                                  <p className="order-track-text-stat">Order Packed</p>
                                  {/* <span className="order-track-text-sub">21st November, 2019</span> */}
                                </div>
                              </div>

                              <div className="order-track-step">
                                <div className="order-track-status">
                                  <span className={`order-track-status-dot ${OrderStatusCount >= 3 ? "active-dot" : ""} ${UpDot == 3 ? "up-dot" : ""} `} />
                                  <span className={`order-track-status-line ${OrderStatusCount >= 3 ? "active-line" : ""}`} />
                                </div>
                                <div className="order-track-text">
                                  <p className="order-track-text-stat">Shipped</p>
                                  <span className="order-track-text-sub">{TrackingOrderData.shipped_date}</span>
                                </div>
                              </div>

                              <div className="order-track-step">
                                <div className="order-track-status">
                                  <span className={`order-track-status-dot ${OrderStatusCount >= 4 ? "active-dot" : ""} ${UpDot == 4 ? "up-dot" : ""}`} />
                                  <span className={`order-track-status-line ${OrderStatusCount >= 4 ? "active-line" : ""}`} />
                                </div>
                                <div className="order-track-text">
                                  <p className="order-track-text-stat">Out for Delivery</p>
                                  {/* <span className="order-track-text-sub">21st November, 2019</span> */}
                                </div>
                              </div>

                              <div className="order-track-step">
                                <div className="order-track-status">
                                  <span className={`order-track-status-dot ${OrderStatusCount >= 5 ? "active-dot" : ""} ${UpDot == 5 ? "up-dot" : ""}`} />
                                  <span className={`order-track-status-line ${OrderStatusCount >= 5 ? "active-line" : ""}`} />
                                </div>
                                <div className="order-track-text">
                                  <p className="order-track-text-stat">Deliverd</p>
                                  <span className="order-track-text-sub">{TrackingOrderData.del_date}</span>
                                </div>
                              </div>

                              {
                                OrderStatusCount == 6
                                  ?
                                  <div className="order-track-step">
                                    <div className="order-track-status">
                                      <span className={`order-track-status-dot ${OrderStatusCount >= 6 ? "active-dot" : ""} ${UpDot == 6 ? "up-dot" : ""}`} />
                                      <span className={`order-track-status-line ${OrderStatusCount >= 6 ? "active-line" : ""}`} />
                                    </div>
                                    <div className="order-track-text">
                                      <p className="order-track-text-stat">Cancelled</p>
                                      <span className="order-track-text-sub">Reason : {TrackingOrderData.reason} </span>
                                    </div>
                                  </div>
                                  : null
                              }


                              {
                                // OrderStatusCount >= 7
                                //   ?
                                //   <div className="order-track-step">
                                //     <div className="order-track-status">
                                //       <span className={`order-track-status-dot ${OrderStatusCount >= 7 ? "active-dot" : ""} ${UpDot == 7 ? "up-dot" : ""}`} />
                                //       <span className={`order-track-status-line ${OrderStatusCount >= 7 ? "active-line" : ""}`} />
                                //     </div>
                                //     <div className="order-track-text">
                                //       <p className="order-track-text-stat">Canceled</p>
                                //       <span className="order-track-text-sub">21st November, 2019</span>
                                //     </div>
                                //   </div>
                                //   : null
                              }

                            </div>
                          </section>
                        </div>

                        <div className="modal-footer jcc">
                          <button className='btn btn-outline-dark' onClick={() => { setisTraking(null) }} >Close</button>
                        </div>

                      </div>
                    </div>
                  </div>
                  : null
              }

            </div>

          </div>
      }

      {
        isOrderUpdated
          ?
          <Bottom_notify msg={isOrderUpdated} icon={"/assets/icons/check.png"} />
          :
          null
      }

      {
        msgPopup !== null
          ?
          <Bottom_notify msg={msgPopup} icon={"/assets/icons/check.png"} />
          :
          null
      }


    </>
  )
}

export default MyOrders