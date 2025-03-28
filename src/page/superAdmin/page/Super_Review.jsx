import React, { useEffect, useState } from 'react'
import PreLoader from '../../../components/preloader/PreLoader';
import axios from 'axios';
import Table_stripped from '../../../components/table/Table_stripped';

const Super_Review = () => {

  // ============State====================
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [products, setProducts] = useState([]); // Store available products
  const [productID, setProductID] = useState(""); // Selected Product
  const [userID, setUserID] = useState("");
  const [rating, setRating] = useState("5");
  const [review, setReview] = useState("");

  const API_PRODUCTS = import.meta.env.VITE_API_USER_GET_ALL_PRODUCT;
  const API_REVIEW = import.meta.env.VITE_API_ADMIN_ADD_UPDATE_REVIEW; // Define your review API URL in .env
  const columns = ["title"]; // Choose which columns to show

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_PRODUCTS);
      setProducts(response.data.all_product); // Adjust according to API response
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
    setLoading(false)
  }, []);

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImgPreview(URL.createObjectURL(file)); // Show preview
  };

  // Submit form (Add or Update Review)
  const addReview = async () => {
    if (!productID) {
      setErrorMsg("Please select a product.");
      return;
    }

    // const emailProviders = ["@gmail.com", "@yahoo.com", "@rediff.com"];
    // const randomProvider = emailProviders[Math.floor(Math.random() * emailProviders.length)];
    const randomProvider = '@gmail.com';

    const user_id = localStorage.getItem('superUserId');
    const token = localStorage.getItem('superToken');

    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("token", token);
    formData.append("product_id", productID);
    formData.append("user_email", userID + randomProvider);
    formData.append("name", userID);
    formData.append("rating", rating);
    formData.append("review", review);
    formData.append("type", 'add');

    setLoading(true)

    try {
      const response = await axios.post(API_REVIEW, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.msg === 'success') {
        setErrorMsg("");
        setMsg("Review submitted successfully!");
      } else {
        setMsg("");
        setErrorMsg(response.data.msg);
      }
    } catch (error) {
      setMsg("");
      setErrorMsg("Error submitting review.");
      console.error("Submission error:", error);
    }

    setLoading(false)

  };

  return (

    loading
      ?
      <PreLoader />
      :
      <section className="container-fluid p-md-5 p-1">
        <div className="row p-md-3 p-2 bg-white">
          <div className='col-md-4'>
            <h3 className="col-12 text-center">Add Review</h3>

            {/* Product Selection */}
            <div className="form-group col-md-12 mb-2">
              <label>Product</label>
              <select
                className="form-select"
                value={productID}
                onChange={(e) => setProductID(e.target.value)}
              >
                <option value="">Select Product</option>
                {products.map((product) => (
                  <option key={product.product_id} value={product.product_id}>
                    {product.title}
                  </option>
                ))}
              </select>
            </div>

            {/* userID Input */}
            <div className="form-group col-md-12 mb-2">
              <label>User Email</label>
              <input
                type="text"
                value={userID}
                onChange={(e) => setUserID(e.target.value)}
                className="form-control"
              />
            </div>


            {/* Rating Input */}
            <div className="form-group col-md-12 mb-2">
              <label>Rating</label>
              <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="form-control"
              />
            </div>

            {/* Review Input */}
            <div className="form-group col-md-12 mb-2">
              <label>Review</label>
              <textarea
                className="form-control"
                rows="3"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>
            </div>


            {/* Submit Button */}
            <div className="col-12 my-3 text-center">
              <button className="btn btn-primary" onClick={addReview}> Add Now </button>
            </div>

            {/* Message  */}
            <div className="col-12 my-3 text-center">
              {errorMsg && <p className="text-danger fw-bold">{errorMsg}</p>}
              {msg && <p className="text-success fw-bold">{msg}</p>}
            </div>
          </div>


          {/* ====Product==table===review list==== */}
          <Table_stripped data={products} columns={columns} actionColumn="product_id" redirectURL={'product_review_list'} />

        </div>
      </section>
  )
}

export default Super_Review