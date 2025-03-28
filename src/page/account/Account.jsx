import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PreLoader from '../../components/preloader/PreLoader';
import Back_Button from '../../components/button/Back_Button';
import Heading1 from '../../components/heading/Heading1';
import MyContext from '../../useContext/MyContext';
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import GoogleLoginButton from '../../components/google/GoogleLoginButton';

import axios from "axios";
// import { jwtDecode } from "jwt-decode";


const Account = () => {

    const navigate = useNavigate();
    const { isLogin } = useContext(MyContext);
    const { myCartList } = useContext(MyContext);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const clientId = '1087070935266-shnvvvt79nl9pilrnum6m2grsbmrbqdo.apps.googleusercontent.com';
    var base_url = import.meta.env.VITE_API_BASE_URL;
    var api_base_url = import.meta.env.VITE_API_BASE_URL + "/files/products/";


    // Access individual query parameters

    let redirect = null;

    if (queryParams.get('redirect')) {
        redirect = queryParams.get('redirect');
    }

    // const handleSuccess = async (response) => {
    //     const decoded = jwtDecode(response.credential); // Decode Google JWT token
    //     const userData = {
    //         email: decoded.email,
    //         name: decoded.name,
    //     };

    //     const url = import.meta.env.VITE_API_USER_GOOGLE_SIGNIN;
    //     try {
    //         const response = await axios.post(url, userData);

    //         if (response.data.msg == "success" || response.data.msg == "already") {
    //             localStorage.setItem('userId', userData.email);
    //             localStorage.setItem('token', response.data.token);
    //             isLogin.setState(true)

    //             if (cat_name != null) {

    //                 addToCart();
    //                 return;

    //             } else {
    //                 window.location.href = '/';
    //             }
    //             return;

    //         } else {
    //             setErrorMsg(response.data.msg);
    //             SetLoading(false)
    //             return;
    //         }

    //     } catch (error) {
    //         console.error("Error during Google Sign-in:", error);
    //     }
    // };

    // const handleError = () => {
    //     console.log("Login Failed");
    // };

    let otpsec = 60;
    const [VerifyBox, SetVerifyBox] = useState(false);

    const [resendOTP, SetresendOTP] = useState(false);
    const [loading, SetLoading] = useState(false);

    const [OTP, setOTP] = useState('');
    const [OTPTry, setOTPTry] = useState(0);

    const [Email, setEmail] = useState('pspankajsharma222@gmail.com');
    const [Name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const [ExpirySec, setExpirySec] = useState(otpsec);
    const [intervalId, setIntervalId] = useState(null);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            // Call your function here
            sendOTP();
        }
    };

    const handleKeyPress2 = (event) => {
        if (event.key === 'Enter') {
            // Call your function here
            verifyOTP();
        }
    };


    const otpTimer = () => {

        const id = setInterval(() => {
            if (ExpirySec <= 0) {
                clearInterval(intervalId);
            }
            setExpirySec((prevCount) => prevCount - 1);
        }, 1000);

        setIntervalId(id);
    }

    // Stop the counter
    const stopCounter = () => {
        clearInterval(intervalId);
        SetresendOTP(true);
    };

    const sendOTP = async () => {
        try {
            if (Email == "") { setErrorMsg("Please fill Email "); return; }
            SetLoading(true)
            let url = import.meta.env.VITE_API_USER_LOGIN_WITH_OTP;
            const response = await axios.post(url,
                {
                    email: Email,
                    type: "send"
                });

            // console.log(response); return;

            if (response.data.msg == "sent") {
                const msg = response.data.msg;
                SetVerifyBox(true)
                SetLoading(false)
                otpTimer();
                return;
            }
            else {
                setErrorMsg(response.data.msg);
                SetLoading(false)
                return;
            }
        } catch (error) {
            SetLoading(false)
            console.error('Login failed:', error);
        }
    }

    function addToCart() {

        let user_id = localStorage.getItem("userId");
        let token = localStorage.getItem("token");

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "user_id": user_id,
            "token": token,
            "pro_id": pro_id,
            "pro_name": product_name,
            "img1": img1,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        let url = import.meta.env.VITE_API_USER_ADD_TO_CART;
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {

                if (result.msg == 'success') {
                    window.location.href = '/cart';
                    return;
                } else {
                    // location.reload();
                    return;
                }
            }
            ).catch((error) => {
                SetInCart(false);
            });

    }

    const moveGuestCartToDB = async () => {
        let user_id = localStorage.getItem("userId");
        let token = localStorage.getItem("token");
        if (!user_id || !token) return;

        let guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];

        if (guestCart.length === 0) return;

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        for (let product of guestCart) {
            let imgLink = `${api_base_url}${product.cat_id}/${product.product_id}/${product.img1}`;

            const data = JSON.stringify({
                "user_id": user_id,
                "token": token,
                "pro_id": product.product_id,
                "pro_name": product.title,
                "img1": imgLink,
                "qty": product.qty // Added quantity field
            });

            let url = import.meta.env.VITE_API_USER_ADD_TO_CART;
            const response = await axios.post(url, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        // Clear guestCart after moving to DB
        localStorage.removeItem("guestCart");
    };


    const verifyOTP = async () => {
        try {
            if (OTP == "") { setErrorMsg("Please fill OTP"); return; }
            if (OTPTry >= 3) {

                setErrorMsg("OTP Verify attemp exceed, send new OTP");
                setTimeout(() => {
                    SetVerifyBox(false);
                    setOTPTry(0);
                }, 1500)
                return;
            }
            let otptry = OTPTry + 1;
            setOTPTry(otptry)

            SetLoading(true)

            let url = import.meta.env.VITE_API_USER_LOGIN_WITH_OTP;
            const response = await axios.post(url,
                {
                    email: Email,
                    OTP: OTP,
                    type: "verify"
                });


            if (response.data.msg == "Expired") {
                setOTP("");
                setErrorMsg("OTP Expired, Resend OTP");
                SetresendOTP(true)
                SetLoading(false)
                return;
            }
            else if (response.data.msg == "success") {
                localStorage.setItem('userId', Email);
                localStorage.setItem('token', response.data.token);
                // isLogin.setState(true)

                if (redirect != null) {

                    // Save localStorage products to DB
                    await moveGuestCartToDB();
                    window.location.href = '/address';
                    return;

                } else {
                    window.location.href = '/';
                }
                return;

            } else {
                setErrorMsg(response.data.msg);
                SetLoading(false)
                return;
            }
        } catch (error) {
            console.error('Login failed:', error);
            SetLoading(false)
        }
    }

    const resendNewOTP = () => {
        SetresendOTP(false)
        sendOTP()
    }

    const resetSignUp = () => {
        SetVerifyBox(false)
        SetresendOTP(false)
        setOTP('')
        setOTPTry(0)
        setExpirySec(otpsec);
    }

    useEffect(() => {
        if (ExpirySec <= 0) {
            stopCounter();
            setExpirySec(otpsec);
        }

        if (isLogin.State) {
            if (redirect === null) {
                window.location.href = '/';
                return;
            } else {
                window.history.back();
                return;
            }
        }


    }, [ExpirySec])

    return (
        <>
            {
                loading ?
                    <PreLoader />
                    :
                    <div className='LoginBox '>
                        <div className='container py-md-5 py-2'>

                            {
                                VerifyBox ?
                                    <>
                                        <div className="row p-2  py-md-5 py-2 ">
                                            <div className='col-12 '>
                                                <Heading1 title={"Verify OTP"} />
                                                <p className='col-12 text-center' style={{ fontSize: "14px" }}>
                                                    Please Check, OTP sent to your email at {Email}
                                                </p>
                                            </div>
                                            <div className='col-12 w-sm-100 jcc flex-column '>

                                                {errorMsg != '' ? <h6 className='text-danger text-center f13 my-3 animate__animated  animate__shakeX'>
                                                    {errorMsg}</h6> : <></>}
                                                <input type="hidden" className='form-control ' id="Email" value={Email}
                                                    onChange={(e) => setEmail(e.target.value)} />
                                                <input type="hidden" className='form-control' id="Name" value={Name}
                                                    onChange={(e) => setName(e.target.value)} />
                                                <input type="hidden" className='form-control' id="password" value={password}
                                                    onChange={(e) => setPassword(e.target.value)} />

                                                {!resendOTP
                                                    ?
                                                    <div className='col-md-6 w-100 text-center my-2' >

                                                        <div className='form-group mb-2 text-center'>
                                                            {/* <label htmlFor="OTP">OTP </label> */}
                                                            <input type="text" className='form-control' id="OTP" value={OTP}
                                                                onChange={(e) => setOTP(e.target.value)}
                                                                placeholder='Enter OTP here'
                                                                onKeyUp={handleKeyPress2}
                                                                autoFocus
                                                                pattern="\d*"
                                                                style={{ padding: "16px .75rem" }}
                                                            />
                                                        </div>
                                                        <button onClick={verifyOTP} className='verify_otp_button mb-2'>Verify OTP</button>

                                                    </div>
                                                    :
                                                    <button onClick={() => resendNewOTP()} className='resend_otp_button '>Resend OTP</button>
                                                }

                                            </div>
                                            <div className='col-12 text-center my-2'>
                                                {
                                                    resendOTP
                                                        ?
                                                        <>
                                                            <span style={{ fontSize: "12px", color: "#ff7676" }}>OTP Expired,Press Resend OTP button to sent it again.</span><br />
                                                        </>
                                                        :
                                                        <>
                                                            <span style={{ fontSize: "12px", color: "rgb(108, 107, 107)" }}>OTP will Expired in <b >{ExpirySec}</b> Seconds</span><br />
                                                        </>
                                                }

                                            </div>
                                        </div>
                                    </>
                                    :
                                    <>

                                        <div className="row p-2 pt-md-5 py-2 jcc" style={{ height: "100%" }}>

                                            <div className='col-md-10 col-12 jcc flex-column'>

                                                <img className='my-3' src="/assets/icons/login.png" alt="" style={{ width: "80px" }} />

                                                <h5 className='text-dark mb-4' >Login to Goolu Store</h5>

                                                <div className='col-xl-3 col-lg-4 col-md-5  w-100 form-group mb-3 text-center'>
                                                    <input type="text"
                                                        className='form-control f14'
                                                        id="Email"
                                                        value={Email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder='Email Address'
                                                        onKeyUp={handleKeyPress}
                                                        autoFocus
                                                        style={{ padding: "16px .75rem" }}

                                                    />
                                                </div>

                                                {errorMsg != '' ? <h6 className='text-danger text-center f13 my-3 animate__animated  animate__shakeX'>
                                                    {errorMsg}</h6> : <></>}
                                                <div className='col-md-6'>
                                                    <button onClick={sendOTP} type="submit" className='add_to_cart_button'>Login with OTP</button>
                                                </div>
                                            </div>

                                        </div>

                                        {/* <div className="row jcc">
                                            <div className="col-md-3 col-9">
                                                <GoogleOAuthProvider clientId={clientId}>
                                                    <div style={{ textAlign: "center", marginTop: "50px" }}>
                                                        <GoogleLoginButton onSuccess={handleSuccess} onError={handleError} />
                                                    </div>
                                                </GoogleOAuthProvider>
                                            </div>
                                        </div> */}
                                    </>
                            }



                        </div>
                    </div >

            }
        </>
    )
}

export default Account