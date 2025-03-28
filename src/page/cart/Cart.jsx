import React, { useContext, useEffect, useState } from 'react';
import Heading1 from '../../components/heading/Heading1';
import './cart.css';
import MyContext from '../../useContext/MyContext';
import PreLoader from '../../components/preloader/PreLoader';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Checkout_button } from '../../components/button/Checkout_button';
import AddToCart_Btn2 from '../../components/button/AddToCart_Btn2';

const Cart = () => {
  const { myCartList } = useContext(MyContext);
  const user_id = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const [loading, setLoading] = useState(true);
  const [cartList, setCartList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const [freeDelLimit] = useState(300);
  const [delCharge, setDelCharge] = useState(50);
  const maxQtyMsg = 'Only 5 quantity allowed per product';

  var base_url = import.meta.env.VITE_API_BASE_URL;
  var api_base_url = import.meta.env.VITE_API_BASE_URL + "/files/products/";

  // Update quantity for both logged-in and guest users
  const updateCartQty = async (status, qty, pro_id) => {

    let updatedQty = parseInt(qty, 10);

    // For guest users: if decreasing quantity when it's 1, remove product from the cart
    if (!token && status === 'minus' && updatedQty === 1) {
      let guestCart = JSON.parse(localStorage.getItem('guestCart')) || [];
      const updatedCart = guestCart.filter((item) => item.product_id !== pro_id);
      localStorage.setItem('guestCart', JSON.stringify(updatedCart));
      myCartList.setMycart(updatedCart)
      setCartList(updatedCart);
      calculateSubtotal(updatedCart);
      setLoading(false);
      return;
    }

    if (status === 'minus') {
      if (updatedQty < 1) return;
      updatedQty -= 1;
    } else if (status === 'plus') {
      if (updatedQty === 5) {
        setErrorMsg(maxQtyMsg);
        return;
      }
      updatedQty += 1;
    }

    setErrorMsg('');
    setLoading(true);


    if (token) {
      // Logged-in user: Update cart via API
      try {
        const url = import.meta.env.VITE_API_USER_ADD_TO_CART;
        const response = await axios.post(
          url,
          {
            user_id,
            token,
            pro_id,
            updated_qty: updatedQty,
          },
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (response.data.msg === 'success') {
          // console.log(response.data.cart_item);
          myCartList.setMycart(response.data.cart_item)
          setCartList(response.data.cart_item);
          getCartList();
        }
      } catch (error) {
        console.error('Error updating cart quantity:', error);
        setLoading(false);
      }
    } else {

      // Guest user: Update localStorage cart
      let guestCart = JSON.parse(localStorage.getItem('guestCart')) || [];
      const updatedCart = guestCart.map((item) =>
        item.product_id === pro_id ? { ...item, qty: updatedQty } : item
      );
      localStorage.setItem('guestCart', JSON.stringify(updatedCart));
      setCartList(updatedCart);
      calculateSubtotal(updatedCart);
      setLoading(false);
      // console.log(cartList);

    }
  };

  // Fetch cart list either from API or localStorage
  const getCartList = async () => {
    setLoading(true);
    let cartItems = [];

    if (token) {
      try {
        const url = import.meta.env.VITE_API_USER_CARTLIST;
        const response = await axios.post(
          url,
          { user_id, token },
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (response.data.msg === 'success') {
          cartItems = response.data.cart_item;
        }
      } catch (error) {
        console.error('Error fetching cart list:', error);
      }
    } else {
      cartItems = JSON.parse(localStorage.getItem('guestCart')) || [];
    }

    setCartList(cartItems);
    calculateSubtotal(cartItems);
    setLoading(false);
    // console.log(cartItems);

  };

  // Calculate subtotal and adjust delivery charge based on free delivery limit
  const calculateSubtotal = (cartItems) => {
    const newSubtotal = cartItems.reduce((acc, item) => {
      const discountedPrice = parseInt(item.price, 10) - Math.floor(parseInt(item.price, 10) * item.discount / 100);
      return acc + discountedPrice * item.qty;
    }, 0);

    setSubtotal(newSubtotal);
    setDelCharge(newSubtotal >= freeDelLimit ? 0 : 50);
  };

  useEffect(() => {
    getCartList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <PreLoader />
      ) : (
        <section className='container-fluid p-0'>
          <div className="container">
            <div className='row'>
              <Heading1 title="My Bag" />
            </div>

            <div className='row'>
              <div className="col-md-8 col-12 px-md-5 px-2">
                {cartList.map((item, i) => {
                  const pro_id = token ? item.pro_id : item.product_id;
                  return (
                    <div key={i} className="col-12 p-md-3 p-2 ">
                      <div className='carBox flex-wrap'>
                        <div className='col-sm-3 col-4 p-2'>
                          {
                            token && user_id ?
                              <img src={item.img1} alt={item.pro_name} width="100%" />
                              :
                              <img src={`${api_base_url}/${item.cat_id}/${item.product_id}/${item.img1}`} alt={item.pro_name} width="100%" />
                          }
                        </div>

                        <div className='col-sm-8 col-8 p-2'>
                          <h5 className='f14'>{item.pro_name}</h5>
                          <div>
                            <span className='text-dark fw-bold f26 me-2'>
                              ₹{item.price - Math.floor(item.price * item.discount / 100)}
                            </span>
                            <strike className="f13 text-muted me-3">₹{item.price}</strike>

                            <i className='fa fa-arrow-down text-success'>{item.discount}%</i>

                          </div>
                          {/* <div className='mb-1'>
                          <span className='text-dark f13'>Discount {item.discount}%</span>
                        </div> */}

                          <div className='my-2 f14 text-secondary'>
                            ₹{item.price - Math.floor(item.price * item.discount / 100)}
                            {` x ${item.qty}`} :&nbsp;
                            <span className='text-success'>
                              ₹{(item.price - Math.floor(item.price * item.discount / 100)) * item.qty}
                            </span>
                          </div>

                          <div className="col-12">
                            <div className='QuantityBox jsc'>
                              {
                                item.qty > 1 ?
                                  <div className='option jcc' onClick={() => updateCartQty('minus', item.qty, pro_id)}>
                                    -
                                  </div>
                                  :
                                  <div className='option jcc' onClick={() => updateCartQty('minus', item.qty, pro_id)}>
                                    <i className='fa fa-trash f12'></i>
                                  </div>
                              }
                              <input className='qtyInput' type="text" value={item.qty} readOnly />
                              <div className='option jcc' onClick={() => updateCartQty('plus', item.qty, pro_id)}>
                                +
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}

                {errorMsg && <div className='col-12 text-center text-danger py-3'>{errorMsg}</div>}
              </div>

              {cartList.length > 0 ? (
                <div className='col-md-4 col-12 p-md-3 p-2 price_summary_box'>
                  <div className='bg-white shadow-sm'>
                    <h3 className='col-12 text-center p-2'>Price Summary</h3>

                    <div className='border-top jbc px-3 py-2'>
                      <h6>Item total</h6>
                      <h6>₹{subtotal}</h6>
                    </div>

                    <div className='border-top jbc px-3 py-2'>
                      <h6 className='text-danger'>Delivery Charge</h6>
                      <h6 className='text-danger'>+₹{delCharge}</h6>
                    </div>

                    <div className='border-top jbc px-3 pt-2 pb-2 grandTotal'>
                      <h5 className='fw-bold'>Grand Total</h5>
                      <h5 className='fw-bold'>₹{subtotal + delCharge}</h5>
                    </div>

                    <div className='jbc mx-3 pt-2 pb-2 row'>
                      {
                        token && user_id ?
                          <Link className="verify_otp_button my-3 text-center text-white text-decoration-none" to="/address">
                            Checkout
                          </Link> :
                          <AddToCart_Btn2 text={`Checkout`} linkTo={`/login?redirect=cart`} />
                      }

                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className='col-12 jcc bg-white p-md-5 p-0'>
                    <img src={'/assets/emptyCart.png'} alt="" style={{ width: "150px" }} />
                  </div>
                  <Checkout_button text="Continue Shopping" linkTo="/" />
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Cart;
