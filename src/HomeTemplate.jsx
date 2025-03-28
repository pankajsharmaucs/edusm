import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import HomeLoader from './components/preloader/HomeLoader';
import Header from '../src/component/header/Header'
import Footer from '../src/component/footer/Footer';

const HomeTemplate = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading && location.pathname === '/' ? (
        <HomeLoader />
      ) : (
        <>
          <Header />
          {/* <Outlet /> */}
          {/* <Footer /> */}
        </>
      )}
    </div>
  );
};

export default HomeTemplate;
