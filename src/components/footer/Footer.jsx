import React, { useContext, useEffect, useState } from 'react'
import './footer.css'
import { Link } from 'react-router-dom'
import MyContext from '../../useContext/MyContext';

const Footer = () => {

    const { myCartList } = useContext(MyContext);

    const [IsLogined, setIsLogined] = useState(false);
    const [SelectedIcon, setSelectedIcon] = useState(1);

    const border_bottom = `MenuList_border_bottom mb-3`;

    const currentPath = window.location.pathname;

    // / cart  categories orders dashboard

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLogined(true)
        }

        if (currentPath === '/') { setSelectedIcon(1) }
        else if (currentPath == '/cart') { setSelectedIcon(2) }
        else if (currentPath == '/categories') { setSelectedIcon(3) }
        else if (currentPath == '/orders') { setSelectedIcon(4) }
        else if (currentPath == '/dashboard') { setSelectedIcon(5) }

    }, [])

    return (
        <div className='d-md-none d-block ' style={{ marginTop: "68px" }}>
            <div className=" footerMenu jac p-0 ">

                <Link to={`/`}>
                    <div className={`MenuList ${SelectedIcon === 1 ? border_bottom : ''}`} onClick={() => setSelectedIcon(1)} >
                        <img src="/assets/menu2/home.png" alt="" className='mb-2' />
                    </div>
                </Link>

                <Link to={`/categories`}>
                    <div className={`MenuList ${SelectedIcon === 3 ? border_bottom : ''}`} onClick={() => setSelectedIcon(3)} >
                        <img src="/assets/menu2/category.png" alt="" className='mb-2' />
                    </div>
                </Link>

                {
                    IsLogined
                        ?
                        <Link to={`/orders`}>
                            <div className={`MenuList ${SelectedIcon === 4 ? border_bottom : ''}`} onClick={() => setSelectedIcon(4)} >
                                <img src="/assets/menu2/order.png" alt="" className='mb-2' />
                            </div>
                        </Link> : null
                }

                {/* <Link to={`/cart`}>
                    <div className={`MenuList ${SelectedIcon === 2 ? border_bottom : ''}`} onClick={() => setSelectedIcon(2)} >
                        <img src="/assets/menu2/cart.png" alt="" className='mb-2' />
                    </div>
                </Link> */}

                <Link className='' to="/cart" onClick={() => setopenMenu(0)} >
                    <div className={`position-relative MenuList ${SelectedIcon === 2 ? border_bottom : ''}`} onClick={() => setSelectedIcon(2)} >
                        <img src="/assets/menu2/cart.png" alt="" className='mb-2' />
                        <p className='bg-primary jcc text-white' style={{
                            position: "absolute", width: "17px", height: "17px", top: "13px", right: "10px",
                            fontSize: "12px", borderRadius: "42px"
                        }}
                        >{myCartList.myCart.length}
                        </p>
                    </div>
                </Link>

                {
                    IsLogined
                        ?
                        <>

                            <Link to={`/dashboard`}>
                                <div className={`MenuList ${SelectedIcon === 5 ? border_bottom : ''}`} onClick={() => setSelectedIcon(5)} >
                                    <img src="/assets/menu2/account.png" alt="" className='mb-2' />
                                </div>
                            </Link>
                        </>

                        :
                        <Link to={`/login`}>
                            <div className={`MenuList ${SelectedIcon === 5 ? border_bottom : ''}`} onClick={() => setSelectedIcon(5)} >
                                <img src="/assets/menu2/account.png" alt="" className='mb-2' />
                            </div>
                        </Link>
                }

            </div>
        </div>
    )
}

export default Footer