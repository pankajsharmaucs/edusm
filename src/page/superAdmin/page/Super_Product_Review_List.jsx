import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Table_edit from '../../../components/table/Table_edit';

const Super_Product_Review_List = () => {
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [productReview, setProductReview] = useState([]); // Store available products
  const { product_id } = useParams();

  const API_PRODUCTS_REVIEWS = import.meta.env.VITE_API_USER_GET_PRODUCT_REVIEW;
  const columns = ["name", "rating", "review"]; // Choose which columns to show

  const fetchProducts = async () => {
    const headers = {
      'Content-Type': 'application/json'
    };

    const data = {
      product_id: product_id
    };

    axios.post(API_PRODUCTS_REVIEWS, data, { headers })
      .then(response => {
        console.log(response);
        if (response.data.msg === 'success') {
          setProductReview(response.data.product_rating);
        } else {
          setProductReview([]);
        }
      })
      .catch(error => {
        console.error('Error fetching cart status:', error);
      });
  };

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
    setLoading(false)
  }, [product_id]);

  return (
    <>
      <section className="container-fluid p-md-5 p-1">
        <div className="row p-md-3 p-2 bg-white">
          <div className='col-md-12'>
            <Table_edit data={productReview} columns={columns} />
          </div>
        </div>
      </section>
    </>
  )
}

export default Super_Product_Review_List