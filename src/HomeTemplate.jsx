import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import HomeLoader from './components/preloader/HomeLoader';

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
