import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './page/home/Home';

import Error_page from './page/Error_page';

import HomeTemplate from './HomeTemplate';
import SuperTemplate from './SuperTemplate';
import About from './page/about/About';
import Class from './page/class/Class';

function App() {

  const handleRefresh = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeTemplate />} >
          <Route index element={<Home />} />
          <Route path="/class/:class_name" element={<Class />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Error_page />} />
        </Route>

        {/* ============ Super Admin ===== */}
        <Route path="/superAdmin" element={<SuperTemplate />} >
          {/* <Route index element={<SuperAccount />} /> */}
          {/* <Route path="login" element={<SuperAccount />} />
          <Route path="product_review_list/:product_id" element={<Super_Product_Review_List />} /> */}
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
