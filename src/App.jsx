import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './page/home/Home';

import Error_page from './page/Error_page';

import HomeTemplate from './HomeTemplate';
import SuperTemplate from './SuperTemplate';
import About from './page/about/About';
import Class from './page/class/Class';
import SuperAccount from './page/superAdmin/SuperAccount';
import Super_Dashboard from './page/superAdmin/page/Super_Dashboard';
import SuperAdmin_Cat from './page/superAdmin/page/SuperAdmin_Cat';
import SuperAdmin_Classes from './page/superAdmin/page/SuperAdmin_Classes';
import SuperAdmin_AddCat from './page/superAdmin/page/SuperAdmin_AddCat';

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
          <Route index element={<SuperAccount />} />
          <Route path="dashboard"  element={<Super_Dashboard />} />
          <Route path="board" element={<SuperAdmin_Cat />} />
          <Route path="addBoard" element={<SuperAdmin_AddCat />} />
          
          <Route path="addClasses/:board_id" element={<SuperAdmin_AddCat />} />
          <Route path="classes/:board_id/:board_name" element={<SuperAdmin_Classes />} />
          {/*
          <Route path="product_review_list/:product_id" element={<Super_Product_Review_List />} /> */}
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
