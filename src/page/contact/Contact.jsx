import React from 'react'
import './contact.css'

const Contant = () => {
  return (
    <section>
      <div className="section-header my-md-5 my-2">
        <div className="container">
          <h1>Contact Us</h1>
          <p>
            Get in Touch – We're Here to Help
          </p>
        </div>
      </div>
      <div className="container bg-primary p-3">
        <div className="row jcc">
          <div className="contact-info">
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <i className="fa fa-home" />
              </div>
              <div className="contact-info-content">
                <h4>Address</h4>
                <p>
                  New Delhi,India <br />110044
                </p>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <i className="fa fa-phone" />
              </div>
              <div className="contact-info-content">
                <h4>Mobile</h4>
                <p>+91 88-00-637-982</p>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <i className="fa fa-envelope" />
              </div>
              <div className="contact-info-content">
                <h4>Email</h4>
                <p>goolustore555@gmail.com</p>
              </div>
            </div>
          </div>
        
        </div>
      </div>
    </section>

  )
}

export default Contant