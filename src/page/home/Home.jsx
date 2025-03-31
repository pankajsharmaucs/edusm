import { Link } from "react-router-dom"


const Home = () => {

  return (
    <>
      <section
        id="hero"
        style={{
          backgroundImage: "url(/assets/images/billboard-bg.png)",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 pe-5 mt-5 mt-md-0">
              <h2 className="display-1 text-uppercase">
                Master Your Skills Online
              </h2>
              <p className="fs-4 my-4 pb-2">
                Online Courses Taught by Industry Titans!
              </p>
              <div>
                <form
                  id="form"
                  className="d-flex align-items-center position-relative "
                >
                  <input
                    type="text"
                    name="email"
                    placeholder="what are you trying to learn?"
                    className="form-control bg-white border-0 rounded-4 shadow-none px-4 py-3 w-100"
                  />
                  <button className="btn btn-primary rounded-4 px-3 py-2 position-absolute align-items-center m-1 end-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22px"
                      height="22px"
                    >
                      <use href="#search" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
            <div className="col-md-6 mt-5">
              <img src="/assets/images/billboard-img.jpg" alt="img" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>

      {/* <section id="features">
        <div className="feature-box container">
          <div className="row ">
            <div className="col-md-3 col-sm-6 mb-5 mb-md-0">
              <div className="feature-item py-5  rounded-4">
                <div className="feature-detail text-center">
                  <h2 className="feature-title">100+</h2>
                  <h6 className="feature-info text-uppercase">instructors</h6>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-5 mb-md-0">
              <div className="feature-item py-5  rounded-4">
                <div className="feature-detail text-center">
                  <h2 className="feature-title">500+</h2>
                  <h6 className="feature-info text-uppercase">courses</h6>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-5 mb-md-0">
              <div className="feature-item py-5  rounded-4">
                <div className="feature-detail text-center">
                  <h2 className="feature-title">free</h2>
                  <h6 className="feature-info text-uppercase">certifications</h6>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-5 mb-md-0">
              <div className="feature-item py-5  rounded-4">
                <div className="feature-detail text-center">
                  <h2 className="feature-title">2,000+</h2>
                  <h6 className="feature-info text-uppercase">happy members</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>  */}

      <section id="category">
        <div className="container py-4">
          <div className="d-md-flex justify-content-between align-items-center">
            <div>
              <p className="text-secondary ">Pick your niche and get started</p>
              <h2 className="display-6 fw-semibold">Popular Subject</h2>
            </div>
            <div className="mt-4 mt-md-0">
              <Link to="/all-subjects" className="btn btn-primary px-3 py-2">
                View all Subject
              </Link>
            </div>
          </div>
          <div className="row g-md-3 mt-2">

            <div className="col-md-4">
              <div className="primary rounded-3 p-4 my-3">
                <div className="d-flex align-items-center">
                  <i className="fa fa-book me-2 svg-primary f35"></i>
                  <div className="ps-4">
                    <p className="category-paragraph fw-bold text-uppercase mb-1">
                      English
                    </p>
                    <p className="category-paragraph m-0">6th - 10th Class</p>
                  </div>
                </div>
              </div>
              <div className="tertiary rounded-3 p-4 my-3">
                <div className="d-flex align-items-center">

                  <i className="fa fa-calculator me-2 svg-primary f35"></i>

                  <div className="ps-4">
                    <p className="category-paragraph fw-bold text-uppercase mb-1">
                      Mathematics
                    </p>
                    <p className="category-paragraph m-0">6th - 10th Class</p>
                  </div>
                </div>
              </div>
              <div className="secondary rounded-3 p-4 my-3">
                <div className="d-flex align-items-center">

                  <i className="fa fa-flask  me-2 svg-primary f35"></i>

                  <div className="ps-4">
                    <p className="category-paragraph fw-bold text-uppercase mb-1">
                      Science
                    </p>
                    <p className="category-paragraph m-0">6th - 10th Class</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="primary rounded-3 p-4 my-3">
                <div className="d-flex align-items-center">
                  <i className="fa fa-book me-2 svg-primary f35"></i>
                  <div className="ps-4">
                    <p className="category-paragraph fw-bold text-uppercase mb-1">
                      English
                    </p>
                    <p className="category-paragraph m-0">6th - 10th Class</p>
                  </div>
                </div>
              </div>
              <div className="tertiary rounded-3 p-4 my-3">
                <div className="d-flex align-items-center">

                  <i className="fa fa-calculator me-2 svg-primary f35"></i>

                  <div className="ps-4">
                    <p className="category-paragraph fw-bold text-uppercase mb-1">
                      Mathematics
                    </p>
                    <p className="category-paragraph m-0">6th - 10th Class</p>
                  </div>
                </div>
              </div>
              <div className="secondary rounded-3 p-4 my-3">
                <div className="d-flex align-items-center">

                  <i className="fa fa-flask  me-2 svg-primary f35"></i>

                  <div className="ps-4">
                    <p className="category-paragraph fw-bold text-uppercase mb-1">
                      Science
                    </p>
                    <p className="category-paragraph m-0">6th - 10th Class</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="primary rounded-3 p-4 my-3">
                <div className="d-flex align-items-center">
                  <i className="fa fa-book me-2 svg-primary f35"></i>
                  <div className="ps-4">
                    <p className="category-paragraph fw-bold text-uppercase mb-1">
                      English
                    </p>
                    <p className="category-paragraph m-0">6th - 10th Class</p>
                  </div>
                </div>
              </div>
              <div className="tertiary rounded-3 p-4 my-3">
                <div className="d-flex align-items-center">

                  <i className="fa fa-calculator me-2 svg-primary f35"></i>

                  <div className="ps-4">
                    <p className="category-paragraph fw-bold text-uppercase mb-1">
                      Mathematics
                    </p>
                    <p className="category-paragraph m-0">6th - 10th Class</p>
                  </div>
                </div>
              </div>
              <div className="secondary rounded-3 p-4 my-3">
                <div className="d-flex align-items-center">

                  <i className="fa fa-flask  me-2 svg-primary f35"></i>

                  <div className="ps-4">
                    <p className="category-paragraph fw-bold text-uppercase mb-1">
                      Science
                    </p>
                    <p className="category-paragraph m-0">6th - 10th Class</p>
                  </div>
                </div>
              </div>
            </div>



          </div>
        </div>
      </section>

      <section id="courses" className="py-4">
        <div className="container">
          <div className="text-center mb-5">
            <p className="text-secondary">
              Some of our most popular online courses
            </p>
            <h2 className="display-6 fw-semibold">
              Explore Inspiring Online Courses
            </h2>
          </div>
          <div className="row">
            <div className="col-sm-6 col-lg-4 col-xl-3 mb-5">
              <div className="z-1 position-absolute m-4">
                <span className="badge text-white bg-secondary">New</span>
              </div>
              <div className="card rounded-4 border-0 shadow-sm p-3 position-relative">
                <a href="courses-details.html">
                  <img
                    src="/assets/images/item1.jpg"
                    className="img-fluid rounded-3"
                    alt="image"
                  />
                </a>
                <div className="card-body p-0">
                  <div className="d-flex justify-content-between my-3">
                    <p className="text-black-50 fw-bold text-uppercase m-0">
                      Digital Marketing
                    </p>
                    <div className="d-flex align-items-center">
                      <svg width={20} height={20}>
                        <use xlinkHref="#clock" className="text-black-50" />
                      </svg>
                      <p className="text-black-50 fw-bold text-uppercase m-0">
                        1h 50m
                      </p>
                    </div>
                  </div>
                  <a href="courses-details.html">
                    <h5 className="course-title py-2 m-0">
                      Mastering the Art of Digital Communication
                    </h5>
                  </a>
                  <div className="card-text">
                    <span className="rating d-flex align-items-center mt-3">
                      <p className="text-muted fw-semibold m-0 me-2">
                        By: James Willam
                      </p>
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4 col-xl-3 mb-5">
              <div className="z-1 position-absolute m-4">
                <span className="badge text-white bg-secondary">New</span>
              </div>
              <div className="card rounded-4 border-0 shadow-sm p-3 position-relative">
                <a href="courses-details.html">
                  <img
                    src="/assets/images/item2.jpg"
                    className="img-fluid rounded-3"
                    alt="image"
                  />
                </a>
                <div className="card-body p-0">
                  <div className="d-flex justify-content-between my-3">
                    <p className="text-black-50 fw-bold text-uppercase m-0">
                      Digital Marketing
                    </p>
                    <div className="d-flex align-items-center">
                      <svg width={20} height={20}>
                        <use xlinkHref="#clock" className="text-black-50" />
                      </svg>
                      <p className="text-black-50 fw-bold text-uppercase m-0">
                        1h 50m
                      </p>
                    </div>
                  </div>
                  <a href="courses-details.html">
                    <h5 className="course-title py-2 m-0">
                      Web Wizardry 101: Mastering the Internet
                    </h5>
                  </a>
                  <div className="card-text">
                    <span className="rating d-flex align-items-center mt-3">
                      <p className="text-muted fw-semibold m-0 me-2">
                        By: James Willam
                      </p>
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4 col-xl-3 mb-5">
              {/* <div class="z-1 position-absolute m-4">
        <span class="badge text-white bg-secondary">New</span>
      </div> */}
              <div className="card rounded-4 border-0 shadow-sm p-3 position-relative">
                <a href="courses-details.html">
                  <img
                    src="/assets/images/item3.jpg"
                    className="img-fluid rounded-3"
                    alt="image"
                  />
                </a>
                <div className="card-body p-0">
                  <div className="d-flex justify-content-between my-3">
                    <p className="text-black-50 fw-bold text-uppercase m-0">
                      Digital Marketing
                    </p>
                    <div className="d-flex align-items-center">
                      <svg width={20} height={20}>
                        <use xlinkHref="#clock" className="text-black-50" />
                      </svg>
                      <p className="text-black-50 fw-bold text-uppercase m-0">
                        1h 50m
                      </p>
                    </div>
                  </div>
                  <a href="courses-details.html">
                    <h5 className="course-title py-2 m-0">
                      E-Learning Essentials: A Comprehensive Guide
                    </h5>
                  </a>
                  <div className="card-text">
                    <span className="rating d-flex align-items-center mt-3">
                      <p className="text-muted fw-semibold m-0 me-2">
                        By: James Willam
                      </p>
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4 col-xl-3 mb-5">
              <div className="z-1 position-absolute m-4">
                <span className="badge text-white bg-secondary">Sale</span>
              </div>
              <div className="card rounded-4 border-0 shadow-sm p-3 position-relative">
                <a href="courses-details.html">
                  <img
                    src="/assets/images/item4.jpg"
                    className="img-fluid rounded-3"
                    alt="image"
                  />
                </a>
                <div className="card-body p-0">
                  <div className="d-flex justify-content-between my-3">
                    <p className="text-black-50 fw-bold text-uppercase m-0">
                      Digital Marketing
                    </p>
                    <div className="d-flex align-items-center">
                      <svg width={20} height={20}>
                        <use xlinkHref="#clock" className="text-black-50" />
                      </svg>
                      <p className="text-black-50 fw-bold text-uppercase m-0">
                        1h 50m
                      </p>
                    </div>
                  </div>
                  <a href="courses-details.html">
                    <h5 className="course-title py-2 m-0">
                      CyberClass 101: A Guide to Online Education
                    </h5>
                  </a>
                  <div className="card-text">
                    <span className="rating d-flex align-items-center mt-3">
                      <p className="text-muted fw-semibold m-0 me-2">
                        By: James Willam
                      </p>
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4 col-xl-3 mb-5">
              {/* <div class="z-1 position-absolute m-4">
        <span class="badge text-white bg-secondary">New</span>
      </div> */}
              <div className="card rounded-4 border-0 shadow-sm p-3 position-relative">
                <a href="courses-details.html">
                  <img
                    src="/assets/images/item5.jpg"
                    className="img-fluid rounded-3"
                    alt="image"
                  />
                </a>
                <div className="card-body p-0">
                  <div className="d-flex justify-content-between my-3">
                    <p className="text-black-50 fw-bold text-uppercase m-0">
                      Digital Marketing
                    </p>
                    <div className="d-flex align-items-center">
                      <svg width={20} height={20}>
                        <use xlinkHref="#clock" className="text-black-50" />
                      </svg>
                      <p className="text-black-50 fw-bold text-uppercase m-0">
                        1h 50m
                      </p>
                    </div>
                  </div>
                  <a href="courses-details.html">
                    <h5 className="course-title py-2 m-0">
                      Mastering the Art of Digital Communication
                    </h5>
                  </a>
                  <div className="card-text">
                    <span className="rating d-flex align-items-center mt-3">
                      <p className="text-muted fw-semibold m-0 me-2">
                        By: James Willam
                      </p>
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4 col-xl-3 mb-5">
              <div className="z-1 position-absolute m-4">
                <span className="badge text-white bg-secondary">New</span>
              </div>
              <div className="card rounded-4 border-0 shadow-sm p-3 position-relative">
                <a href="courses-details.html">
                  <img
                    src="/assets/images/item6.jpg"
                    className="img-fluid rounded-3"
                    alt="image"
                  />
                </a>
                <div className="card-body p-0">
                  <div className="d-flex justify-content-between my-3">
                    <p className="text-black-50 fw-bold text-uppercase m-0">
                      Digital Marketing
                    </p>
                    <div className="d-flex align-items-center">
                      <svg width={20} height={20}>
                        <use xlinkHref="#clock" className="text-black-50" />
                      </svg>
                      <p className="text-black-50 fw-bold text-uppercase m-0">
                        1h 50m
                      </p>
                    </div>
                  </div>
                  <a href="courses-details.html">
                    <h5 className="course-title py-2 m-0">
                      Web Wizardry 101: Mastering the Internet
                    </h5>
                  </a>
                  <div className="card-text">
                    <span className="rating d-flex align-items-center mt-3">
                      <p className="text-muted fw-semibold m-0 me-2">
                        By: James Willam
                      </p>
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4 col-xl-3 mb-5">
              {/* <div class="z-1 position-absolute m-4">
        <span class="badge text-white bg-secondary">New</span>
      </div> */}
              <div className="card rounded-4 border-0 shadow-sm p-3 position-relative">
                <a href="courses-details.html">
                  <img
                    src="/assets/images/item7.jpg"
                    className="img-fluid rounded-3"
                    alt="image"
                  />
                </a>
                <div className="card-body p-0">
                  <div className="d-flex justify-content-between my-3">
                    <p className="text-black-50 fw-bold text-uppercase m-0">
                      Digital Marketing
                    </p>
                    <div className="d-flex align-items-center">
                      <svg width={20} height={20}>
                        <use xlinkHref="#clock" className="text-black-50" />
                      </svg>
                      <p className="text-black-50 fw-bold text-uppercase m-0">
                        1h 50m
                      </p>
                    </div>
                  </div>
                  <a href="courses-details.html">
                    <h5 className="course-title py-2 m-0">
                      E-Learning Essentials: A Comprehensive Guide
                    </h5>
                  </a>
                  <div className="card-text">
                    <span className="rating d-flex align-items-center mt-3">
                      <p className="text-muted fw-semibold m-0 me-2">
                        By: James Willam
                      </p>
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4 col-xl-3 mb-5">
              <div className="z-1 position-absolute m-4">
                <span className="badge text-white bg-secondary">Sale</span>
              </div>
              <div className="card rounded-4 border-0 shadow-sm p-3 position-relative">
                <a href="courses-details.html">
                  <img
                    src="/assets/images/item8.jpg"
                    className="img-fluid rounded-3"
                    alt="image"
                  />
                </a>
                <div className="card-body p-0">
                  <div className="d-flex justify-content-between my-3">
                    <p className="text-black-50 fw-bold text-uppercase m-0">
                      Digital Marketing
                    </p>
                    <div className="d-flex align-items-center">
                      <svg width={20} height={20}>
                        <use xlinkHref="#clock" className="text-black-50" />
                      </svg>
                      <p className="text-black-50 fw-bold text-uppercase m-0">
                        1h 50m
                      </p>
                    </div>
                  </div>
                  <a href="courses-details.html">
                    <h5 className="course-title py-2 m-0">
                      CyberClass 101: A Guide to Online Education
                    </h5>
                  </a>
                  <div className="card-text">
                    <span className="rating d-flex align-items-center mt-3">
                      <p className="text-muted fw-semibold m-0 me-2">
                        By: James Willam
                      </p>
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                      <iconify-icon
                        icon="clarity:star-solid"
                        className="text-primary"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <a href="courses.html" className="btn btn-primary px-5 py-3">
              View all courses
            </a>
          </div>
        </div>
      </section>

      <section id="testimonial" className="py-4 bg-primary-subtle">
        <div className="container">
          <div className="text-center mb-4">
            <p className="text-secondary ">What our students say about us</p>
            <h2 className="display-6 fw-semibold">Reviews</h2>
          </div>
          <div className="row">
            <div className="offset-md-1 col-md-10">
              <div className="swiper testimonial-swiper">
                <div className="swiper-wrapper">
                  <div className="swiper-slide pe-md-5">
                    <div className="my-4">
                      <p className="text-muted">
                        “Condimentum vel viverra morbi quisque lobortis eu leo. A
                        nulla pulvinar at ut in sit libero, sed. Quis congue pretium
                        in enim gravida quam netus in lorem. Nulla at nibh lorem
                        nunc sapien egestas at cursus. ”
                      </p>
                      <div className="row">
                        <div className="col-3">
                          {" "}
                          <img
                            src="/assets/images/reviwer1.jpg"
                            alt="img"
                            className="img-fluid rounded-circle"
                          />
                        </div>
                        <div className="col-9">
                          <h5 className="m-0 mt-2">Recco Gracia</h5>
                          <p className="text-muted">Web Developer</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide pe-md-5">
                    <div className="my-4">
                      <p className="text-muted">
                        “Condimentum vel viverra morbi quisque lobortis eu leo. A
                        nulla pulvinar at ut in sit libero, sed. Quis congue pretium
                        in enim gravida quam netus in lorem. Nulla at nibh lorem
                        nunc sapien egestas at cursus. ”
                      </p>
                      <div className="row">
                        <div className="col-3">
                          {" "}
                          <img
                            src="/assets/images/reviwer2.jpg"
                            alt="img"
                            className="img-fluid rounded-circle"
                          />
                        </div>
                        <div className="col-9">
                          <h5 className="m-0 mt-2">Bicky Yeal</h5>
                          <p className="text-muted">Web Developer</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide pe-md-5">
                    <div className="my-4">
                      <p className="text-muted">
                        “Condimentum vel viverra morbi quisque lobortis eu leo. A
                        nulla pulvinar at ut in sit libero, sed. Quis congue pretium
                        in enim gravida quam netus in lorem. Nulla at nibh lorem
                        nunc sapien egestas at cursus. ”
                      </p>
                      <div className="row">
                        <div className="col-3">
                          {" "}
                          <img
                            src="/assets/images/reviwer3.jpg"
                            alt="img"
                            className="img-fluid rounded-circle"
                          />
                        </div>
                        <div className="col-9">
                          <h5 className="m-0 mt-2">Lilly Will</h5>
                          <p className="text-muted">Web Developer</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide pe-md-5">
                    <div className="my-4">
                      <p className="text-muted">
                        “Condimentum vel viverra morbi quisque lobortis eu leo. A
                        nulla pulvinar at ut in sit libero, sed. Quis congue pretium
                        in enim gravida quam netus in lorem. Nulla at nibh lorem
                        nunc sapien egestas at cursus. ”
                      </p>
                      <div className="row">
                        <div className="col-3">
                          {" "}
                          <img
                            src="/assets/images/reviwer1.jpg"
                            alt="img"
                            className="img-fluid rounded-circle"
                          />
                        </div>
                        <div className="col-9">
                          <h5 className="m-0 mt-2">Recco Gracia</h5>
                          <p className="text-muted">Web Developer</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide pe-md-5">
                    <div className="my-4">
                      <p className="text-muted">
                        “Condimentum vel viverra morbi quisque lobortis eu leo. A
                        nulla pulvinar at ut in sit libero, sed. Quis congue pretium
                        in enim gravida quam netus in lorem. Nulla at nibh lorem
                        nunc sapien egestas at cursus. ”
                      </p>
                      <div className="row">
                        <div className="col-3">
                          {" "}
                          <img
                            src="/assets/images/reviwer2.jpg"
                            alt="img"
                            className="img-fluid rounded-circle"
                          />
                        </div>
                        <div className="col-9">
                          <h5 className="m-0 mt-2">Recco Gracia</h5>
                          <p className="text-muted">Web Developer</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-pagination" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="teacher" className="py-4">
        <div className="container">
          <div className="text-center mb-5">
            <p className="text-secondary">Meet our popular teachers</p>
            <h2 className="display-6 fw-semibold">Our Teachers</h2>
          </div>
          <div className="row">
            <div className="col mb-5">
              <div className="team-member position-relative card rounded-4 border-0 shadow-sm p-3">
                <div className="image-holder zoom-effect rounded-3">
                  <img
                    src="/assets/images/teacher1.jpg"
                    className="img-fluid rounded-3"
                    alt="image"
                  />
                  <ul className="social-links list-unstyled position-absolute">
                    <li>
                      <a href="#">
                        <svg
                          className="facebook text-dark"
                          width={25}
                          height={25}
                          aria-hidden="true"
                        >
                          <use xlinkHref="#facebook" className="text-white" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg
                          className="twitter text-dark"
                          width={25}
                          height={25}
                          aria-hidden="true"
                        >
                          <use xlinkHref="#twitter" className="text-white" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg
                          className="instagram text-dark"
                          width={25}
                          height={25}
                          aria-hidden="true"
                        >
                          <use xlinkHref="#instagram" className="text-white" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg
                          className="linkedin text-dark"
                          width={25}
                          height={25}
                          aria-hidden="true"
                        >
                          <use xlinkHref="#linkedin" className="text-white" />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body p-0">
                  <div className="text-center mt-3">
                    <p className="fw-bold m-0">Anila Lee</p>
                    <p className="text-secondary m-0">Art Director</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col mb-5">
              <div className="team-member position-relative card rounded-4 border-0 shadow-sm p-3">
                <div className="image-holder zoom-effect rounded-3">
                  <img
                    src="/assets/images/teacher2.jpg"
                    className="img-fluid rounded-3"
                    alt="image"
                  />
                  <ul className="social-links list-unstyled position-absolute">
                    <li>
                      <a href="#">
                        <svg
                          className="facebook text-dark"
                          width={25}
                          height={25}
                          aria-hidden="true"
                        >
                          <use xlinkHref="#facebook" className="text-white" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg
                          className="twitter text-dark"
                          width={25}
                          height={25}
                          aria-hidden="true"
                        >
                          <use xlinkHref="#twitter" className="text-white" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg
                          className="instagram text-dark"
                          width={25}
                          height={25}
                          aria-hidden="true"
                        >
                          <use xlinkHref="#instagram" className="text-white" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg
                          className="linkedin text-dark"
                          width={25}
                          height={25}
                          aria-hidden="true"
                        >
                          <use xlinkHref="#linkedin" className="text-white" />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body p-0">
                  <div className="text-center mt-3">
                    <p className="fw-bold m-0">Bruce Smith</p>
                    <p className="text-secondary m-0">Marketing Expert</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col mb-5">
              <div className="team-member position-relative card rounded-4 border-0 shadow-sm p-3">
                <div className="image-holder zoom-effect rounded-3">
                  <img
                    src="/assets/images/teacher3.jpg"
                    className="img-fluid rounded-3"
                    alt="image"
                  />
                  <ul className="social-links list-unstyled position-absolute">
                    <li>
                      <a href="#">
                        <svg
                          className="facebook text-dark"
                          width={25}
                          height={25}
                          aria-hidden="true"
                        >
                          <use xlinkHref="#facebook" className="text-white" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg
                          className="twitter text-dark"
                          width={25}
                          height={25}
                          aria-hidden="true"
                        >
                          <use xlinkHref="#twitter" className="text-white" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg
                          className="instagram text-dark"
                          width={25}
                          height={25}
                          aria-hidden="true"
                        >
                          <use xlinkHref="#instagram" className="text-white" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg
                          className="linkedin text-dark"
                          width={25}
                          height={25}
                          aria-hidden="true"
                        >
                          <use xlinkHref="#linkedin" className="text-white" />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body p-0">
                  <div className="text-center mt-3">
                    <p className="fw-bold m-0">Jack Nicholson</p>
                    <p className="text-secondary m-0">SEO Expert</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col mb-5">
              <div className="team-member position-relative card rounded-4 border-0 shadow-sm p-3">
                <div className="image-holder zoom-effect rounded-3">
                  <img
                    src="/assets/images/teacher4.jpg"
                    className="img-fluid rounded-3"
                    alt="image"
                  />
                  <ul className="social-links list-unstyled position-absolute">
                    <li>
                      <a href="#">
                        <svg
                          className="facebook text-dark"
                          width={25}
                          height={25}
                          aria-hidden="true"
                        >
                          <use xlinkHref="#facebook" className="text-white" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg
                          className="twitter text-dark"
                          width={25}
                          height={25}
                          aria-hidden="true"
                        >
                          <use xlinkHref="#twitter" className="text-white" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg
                          className="instagram text-dark"
                          width={25}
                          height={25}
                          aria-hidden="true"
                        >
                          <use xlinkHref="#instagram" className="text-white" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg
                          className="linkedin text-dark"
                          width={25}
                          height={25}
                          aria-hidden="true"
                        >
                          <use xlinkHref="#linkedin" className="text-white" />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body p-0">
                  <div className="text-center mt-3">
                    <p className="fw-bold m-0">Calvin Ian</p>
                    <p className="text-secondary m-0">Sales Director</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col mb-5">
              <div className="team-member position-relative card rounded-4 border-0 shadow-sm p-3">
                <div className="image-holder zoom-effect rounded-3">
                  <img
                    src="/assets/images/teacher5.jpg"
                    className="img-fluid rounded-3"
                    alt="image"
                  />
                  <ul className="social-links list-unstyled position-absolute">
                    <li>
                      <a href="#">
                        <svg
                          className="facebook text-dark"
                          width={25}
                          height={25}
                          aria-hidden="true"
                        >
                          <use xlinkHref="#facebook" className="text-white" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg
                          className="twitter text-dark"
                          width={25}
                          height={25}
                          aria-hidden="true"
                        >
                          <use xlinkHref="#twitter" className="text-white" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg
                          className="instagram text-dark"
                          width={25}
                          height={25}
                          aria-hidden="true"
                        >
                          <use xlinkHref="#instagram" className="text-white" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg
                          className="linkedin text-dark"
                          width={25}
                          height={25}
                          aria-hidden="true"
                        >
                          <use xlinkHref="#linkedin" className="text-white" />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body p-0">
                  <div className="text-center mt-3">
                    <p className="fw-bold m-0">Milye Sam</p>
                    <p className="text-secondary m-0">Marketing Expert</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="points" className="py-4 pt-0">
        <div className="container">
          <div className="text-center">
            <p className="text-secondary ">What features we provide</p>
            <h2 className="display-6 fw-semibold">Core Features</h2>
          </div>
          <div className="row align-items-center mt-5">
            <div className="col-md-6 pe-md-5">
              <div className="d-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px">
                  <use href="#tick-circle" className="text-secondary" />
                </svg>
                <p className="ps-4">
                  Engage with a worldwide community of inquisitive and imaginative
                  individuals.
                </p>
              </div>
              <div className="d-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px">
                  <use href="#tick-circle" className="text-secondary" />
                </svg>
                <p className="ps-4">
                  Engage with a worldwide community of inquisitive and imaginative
                  individuals.
                </p>
              </div>
              <div className="d-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px">
                  <use href="#tick-circle" className="text-secondary" />
                </svg>
                <p className="ps-4">
                  Learn a skill of your choice from the experts around the world
                  from various industries
                </p>
              </div>
              <div className="d-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px">
                  <use href="#tick-circle" className="text-secondary" />
                </svg>
                <p className="ps-4">
                  Learn a skill of your choice from the experts around the world
                  from various industries
                </p>
              </div>
            </div>
            <div className="col-md-6 pe-md-5">
              <div className="d-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px">
                  <use href="#tick-circle" className="text-secondary" />
                </svg>
                <p className="ps-4">
                  Engage with a worldwide community of inquisitive and imaginative
                  individuals.
                </p>
              </div>
              <div className="d-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px">
                  <use href="#tick-circle" className="text-secondary" />
                </svg>
                <p className="ps-4">
                  Engage with a worldwide community of inquisitive and imaginative
                  individuals.
                </p>
              </div>
              <div className="d-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px">
                  <use href="#tick-circle" className="text-secondary" />
                </svg>
                <p className="ps-4">
                  Learn a skill of your choice from the experts around the world
                  from various industries
                </p>
              </div>
              <div className="d-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px">
                  <use href="#tick-circle" className="text-secondary" />
                </svg>
                <p className="ps-4">
                  Learn a skill of your choice from the experts around the world
                  from various industries
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="register">
        <div className="container padding-medium">
          <div className="row align-items-center">
            <div className="offset-md-1 col-md-5 ">
              <div>
                <h2 className="display-6 fw-semibold">
                  Subscribe and get 20% OFF on your first online course{" "}
                </h2>
                <p className="text-secondary ">
                  Sign Up for our newsletter and never miss any offers
                </p>
              </div>
            </div>
            <div className="col-md-5">
              <form id="form">
                <input
                  type="email"
                  name="email"
                  placeholder="Write Your Email Address*"
                  className="form-control bg-white border-0 rounded-4 shadow-none rounded-pill text-center px-4 py-3 w-100 mb-4"
                />
                <div className="d-grid">
                  <button className="btn btn-primary px-5 py-3">
                    {" "}
                    Get Started now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

    </>

  )
}

export default Home