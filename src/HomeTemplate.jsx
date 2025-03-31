import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import HomeLoader from './components/preloader/HomeLoader';
import Header from './components/header/Header'
import Footer from './components/footer/Footer';
import Home from './components/home/Home';

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
          <Outlet />
          <Footer />
        </>
      )}
    </div>
  );
};

export default HomeTemplate;
