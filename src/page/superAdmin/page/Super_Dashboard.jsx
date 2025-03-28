import React, { useEffect } from 'react'
import Heading1 from '../../../components/heading/Heading1'
import { useNavigate } from 'react-router-dom';
import Card4 from '../../../components/cards/Card4';

const Super_Dashboard = () => {

  const navigate = useNavigate();
  let jsc = `justify-content-start align-items-center`
  const adminUrl = "/superAdmin/";

  useEffect(() => {
    if (localStorage.getItem("superToken") == null) {
      navigate(adminUrl);
      return;
    }
  }, [])

  return (
    <>
      <section className='Section-wrapper' >
        <div className="container ">

          <div className='row'>
            <Heading1 title={"dashboard"} />
          </div>

          <div className={`col-12 d-flex flex-wrap  mb-2 ${jsc}`}>

            <div className='col-xl-3 col-md-4 col-sm-6 col-6 mb-3  p-2'>
              <Card4 url={`${adminUrl}users`} img={"/assets/icons/profile.png"} title={"Users"} />
            </div>

            <div className='col-xl-3 col-md-4 col-sm-6 col-6 mb-3  p-2'>
              <Card4 url={`${adminUrl}category`} img={"/assets/icons/products.png"} title={"Category"} />
            </div>

            <div className='col-xl-3 col-md-4 col-sm-6 col-6 mb-3  p-2'>
              <Card4 url={`${adminUrl}review`} img={"/assets/icons/products.png"} title={"Review"} />
            </div>

            <div className='col-xl-3 col-md-4 col-sm-6 col-6 mb-3  p-2'>
              <Card4 url={`${adminUrl}orders`} img={"/assets/icons/orders.png"} title={"Orders"} />
            </div>

            <div className='col-xl-3 col-md-4 col-sm-6 col-6 mb-3  p-2'>
              <Card4 url={`${adminUrl}settings`} img={"/assets/icons/settings.png"} title={"Settings"} />
            </div>

            <div className='col-xl-3 col-md-4 col-sm-6 col-6 mb-3 p-2 '>
              <Card4 url={`${adminUrl}webiste-management`} img={"/assets/icons/webiste.png"}
                title={"webiste"} />
            </div>

          </div>

        </div>
      </section>
    </>
  )
}

export default Super_Dashboard