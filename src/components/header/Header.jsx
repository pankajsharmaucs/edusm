import React, { useEffect, useState } from 'react'
import './header.css'
import './vendor.css'
import './normalize.css'
import { Link } from 'react-router-dom'

const Header = () => {

  const closeOffcanvas = () => {
    const offcanvasElement = document.getElementById('offcanvasNavbar');
    const offcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasElement);
    if (offcanvas) {
      offcanvas.hide();
    }
  }

  return (
    <>

      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <defs>
          <symbol id="facebook" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02"
            />
          </symbol>
          <symbol id="youtube" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="m10 15l5.19-3L10 9zm11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73"
            />
          </symbol>
          <symbol id="instagram" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
            />
          </symbol>
          <symbol id="twitter" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23"
            />
          </symbol>
          <symbol id="linkedin" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
            />
          </symbol>
          <symbol id="fitness" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M20.57 14.86L22 13.43L20.57 12L17 15.57L8.43 7L12 3.43L10.57 2L9.14 3.43L7.71 2L5.57 4.14L4.14 2.71L2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57L3.43 12L7 8.43L15.57 17L12 20.57L13.43 22l1.43-1.43L16.29 22l2.14-2.14l1.43 1.43l1.43-1.43l-1.43-1.43L22 16.29z"
            />
          </symbol>
          <symbol id="laptop" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M4 6h16v10H4m16 2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4c-1.11 0-2 .89-2 2v10a2 2 0 0 0 2 2H0v2h24v-2z"
            />
          </symbol>
          <symbol id="camera" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M4 4h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2m8 3a5 5 0 0 0-5 5a5 5 0 0 0 5 5a5 5 0 0 0 5-5a5 5 0 0 0-5-5m0 2a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3"
            />
          </symbol>
          <symbol id="handshake" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M21.71 8.71c1.25-1.25.68-2.71 0-3.42l-3-3c-1.26-1.25-2.71-.68-3.42 0L13.59 4H11C9.1 4 8 5 7.44 6.15L3 10.59v4l-.71.7c-1.25 1.26-.68 2.71 0 3.42l3 3c.54.54 1.12.74 1.67.74c.71 0 1.36-.35 1.75-.74l2.7-2.71H15c1.7 0 2.56-1.06 2.87-2.1c1.13-.3 1.75-1.16 2-2C21.42 14.5 22 13.03 22 12V9h-.59zM20 12c0 .45-.19 1-1 1h-1v1c0 .45-.19 1-1 1h-1v1c0 .45-.19 1-1 1h-4.41l-3.28 3.28c-.31.29-.49.12-.6.01l-2.99-2.98c-.29-.31-.12-.49-.01-.6L5 15.41v-4l2-2V11c0 1.21.8 3 3 3s3-1.79 3-3h7zm.29-4.71L18.59 9H11v2c0 .45-.19 1-1 1s-1-.55-1-1V8c0-.46.17-2 2-2h3.41l2.28-2.28c.31-.29.49-.12.6-.01l2.99 2.98c.29.31.12.49.01.6"
            />
          </symbol>
          <symbol id="speakerphone" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.84-5 6.7v2.07c4-.91 7-4.49 7-8.77c0-4.28-3-7.86-7-8.77M16.5 12c0-1.77-1-3.29-2.5-4.03V16c1.5-.71 2.5-2.24 2.5-4M3 9v6h4l5 5V4L7 9z"
            />
          </symbol>
          <symbol id="pencil-box" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19 19V5H5v14zm0-16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-2.3 6.35l-1 1l-2.05-2.05l1-1c.21-.22.56-.22.77 0l1.28 1.28c.22.21.22.56 0 .77M7 14.94l6.06-6.06l2.06 2.06L9.06 17H7z"
            />
          </symbol>
          <symbol id="tick-circle" viewBox="0 0 15 15">
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M0 7.5a7.5 7.5 0 1 1 15 0a7.5 7.5 0 0 1-15 0m7.072 3.21l4.318-5.398l-.78-.624l-3.682 4.601L4.32 7.116l-.64.768z"
              clipRule="evenodd"
            />
          </symbol>
          <symbol id="clock" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M15.098 12.634L13 11.423V7a1 1 0 0 0-2 0v5a1 1 0 0 0 .5.866l2.598 1.5a1 1 0 1 0 1-1.732M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2m0 18a8 8 0 1 1 8-8a8.01 8.01 0 0 1-8 8"
            />
          </symbol>
          <symbol id="arrow-circle-right" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M15.71 12.71a1 1 0 0 0 .21-.33a1 1 0 0 0 0-.76a1 1 0 0 0-.21-.33l-3-3a1 1 0 0 0-1.42 1.42l1.3 1.29H9a1 1 0 0 0 0 2h3.59l-1.3 1.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0ZM22 12a10 10 0 1 0-10 10a10 10 0 0 0 10-10M4 12a8 8 0 1 1 8 8a8 8 0 0 1-8-8"
            />
          </symbol>
          <symbol id="search" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39M11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7"
            />
          </symbol>
          <symbol id="user-circle" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 2a10 10 0 0 0-7.35 16.76a10 10 0 0 0 14.7 0A10 10 0 0 0 12 2m0 18a8 8 0 0 1-5.55-2.25a6 6 0 0 1 11.1 0A8 8 0 0 1 12 20m-2-10a2 2 0 1 1 2 2a2 2 0 0 1-2-2m8.91 6A8 8 0 0 0 15 12.62a4 4 0 1 0-6 0A8 8 0 0 0 5.09 16A7.92 7.92 0 0 1 4 12a8 8 0 0 1 16 0a7.92 7.92 0 0 1-1.09 4"
            />
          </symbol>
          <symbol id="shopping-bag" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1m-9-1a2 2 0 0 1 4 0v1h-4Zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2Z"
            />
          </symbol>
          <symbol id="heart" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M20.16 5A6.29 6.29 0 0 0 12 4.36a6.27 6.27 0 0 0-8.16 9.48l6.21 6.22a2.78 2.78 0 0 0 3.9 0l6.21-6.22a6.27 6.27 0 0 0 0-8.84m-1.41 7.46l-6.21 6.21a.76.76 0 0 1-1.08 0l-6.21-6.24a4.29 4.29 0 0 1 0-6a4.27 4.27 0 0 1 6 0a1 1 0 0 0 1.42 0a4.27 4.27 0 0 1 6 0a4.29 4.29 0 0 1 .08 6Z"
            />
          </symbol>
        </defs>
      </svg>

      <section id="top-nav" className="bg-secondary">
        <div className="text-center px-md-3 py-md-2">
          <p className="text-white p-2 m-0 f14 ">
            Get your first course at 50% Discount. Offer lasts for the first 50
            students only.
            <span>
              <Link
                to="/account"
                className="text-white text-decoration-underline"
              >
                Register now
              </Link>
            </span>
          </p>
        </div>
      </section>

      <nav className="main-menu d-flex navbar navbar-expand-lg p-2 py-3 p-lg-4 py-lg-4 ">
        <div className="container-fluid">
          <div className="main-logo d-lg-none">
            <Link to="/">
              {/* <img src="/assets/images/logo.png" alt="logo" className="img-fluid" /> */}
              <h5>Admin Panel</h5>
            </Link>
          </div>

          <div className="navbar-toggler shadow-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar">
            <img src="/assets/common/menu5.png" alt="" style={{ width: "41px" }} />
          </div>

          <div
            className="offcanvas offcanvas-end"
            data-bs-backdrop="false"
            tabIndex={-1}
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header mt-3">
              <button
                type="button"
                className="btn-close shadow-none"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div className="offcanvas-body justify-content-between">
              <div className="main-logo">
                <Link onClick={() => closeOffcanvas()} to="/">
                  {/* <img src="/assets/images/logo.png" alt="logo" className="img-fluid" /> */}
                  <h2>Admin panel</h2>
                </Link>
              </div>
              <ul className="navbar-nav menu-list list-unstyled align-items-lg-center d-flex gap-md-3 mb-0">

                <li className="nav-item">
                  <Link onClick={() => closeOffcanvas()} to="/" className="nav-link mx-2 active">
                    Home
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link mx-2 dropdown-toggle align-items-center"
                    role="button"
                    id="pages"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Classes
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="pages">
                    <li>
                      <Link onClick={() => closeOffcanvas()} to="/class/6th" className="dropdown-item">
                        6th Class
                      </Link>
                    </li>
                    <li>
                      <Link onClick={() => closeOffcanvas()} to="/class/10th" className="dropdown-item">
                        10th Class
                        <span className="badge bg-secondary text-white ms-2">
                          PRO
                        </span>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link mx-2 dropdown-toggle align-items-center"
                    role="button"
                    id="pages"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Subjects
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="pages">
                    <li>
                      <Link onClick={() => closeOffcanvas()} to="/subject/english" className="dropdown-item">
                        English
                      </Link>
                    </li>

                    <li>
                      <Link onClick={() => closeOffcanvas()} to="/subject/maths" className="dropdown-item">
                        Maths
                      </Link>
                    </li>

                    <li>
                      <Link onClick={() => closeOffcanvas()} to="/about" className="dropdown-item">
                        Geology
                        <span className="badge bg-secondary text-white ms-2">
                          PRO
                        </span>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <Link onClick={() => closeOffcanvas()} to="/contact" className="nav-link mx-2">
                    About Us
                  </Link>
                </li>

                <li className="nav-item">
                  <Link onClick={() => closeOffcanvas()} to="/contact" className="nav-link mx-2">
                    Get Consulted
                  </Link>
                </li>

                <li className="nav-item">
                  <Link onClick={() => closeOffcanvas()} to="/contact" className="btn btn-primary py-md-2 py-2 px-3 my-md-0 my-2">
                    Get Started
                  </Link>
                </li>

              </ul>

             

            </div>
          </div>
        </div>

        <div className="container-fluid d-lg-none">
          <div className="d-flex  align-items-end mt-3">
            <ul className="d-flex  align-items-center list-unstyled m-0">
              <li>
                <a href="account.html" className="me-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22px"
                    height="22px"
                  >
                    <use href="#user-circle" />
                  </svg>{" "}
                </a>
              </li>
              <li>
                <a href="wishlist.html" className="me-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22px"
                    height="22px"
                  >
                    <use href="#heart" />
                  </svg>{" "}
                </a>
              </li>
              <li className="">
                <a
                  href="#"
                  className="me-3"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasCart"
                  aria-controls="offcanvasCart"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22px"
                    height="22px"
                  >
                    <use href="#shopping-bag" />
                  </svg>{" "}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="me-3"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasSearch"
                  aria-controls="offcanvasSearch"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22px"
                    height="22px"
                  >
                    <use href="#search" />
                  </svg>{" "}
                </a>
              </li>
            </ul>
          </div>
        </div>

      </nav>

    </>

  )
}

export default Header