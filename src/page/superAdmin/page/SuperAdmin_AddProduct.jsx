import React, { useEffect, useState } from 'react'
import PreLoader from '../../../components/preloader/PreLoader';
import axios from 'axios';
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const SuperAdmin_AddProduct = () => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const cat_id = urlParams.get('cat_id')

    var api_base_url = import.meta.env.VITE_API_BASE_URL;

    // ============State====================
    const [loading, SetLoading] = useState(true);
    const [Msg, setMsg] = useState(true);
    const [ErrorMsg, setErrorMsg] = useState('');

    const [file1, setfile1] = useState(null);
    const [file2, setfile2] = useState(null);
    const [file3, setfile3] = useState(null);
    const [file4, setfile4] = useState(null);
    const [file5, setfile5] = useState(null);

    const [Title, setTitle] = useState('');
    const [Slug, setSlug] = useState('');
    const [Price, setPrice] = useState('');
    const [Weight, setWeight] = useState('');
    const [WeightType, setWeightType] = useState('Gm');
    const [Quantity, setQuantity] = useState('');
    const [Discount, setDiscount] = useState('');
    const [Description, setDescription] = useState('');
    const [input_highlight, setinput_highlight] = useState('');
    const [Highlights, setHighlights] = useState([]);

    const [Img1, setImg1] = useState('');
    const [Img2, setImg2] = useState('');
    const [Img3, setImg3] = useState('');
    const [Img4, setImg4] = useState('');
    const [Img5, setImg5] = useState('');

    const add_highlight = () => {
        if (input_highlight && input_highlight.trim() !== '') {
            setHighlights(prev => [
                ...prev,
                { id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 1, name: input_highlight.trim() }
            ]);
        }
        setinput_highlight(""); // Clear input field

    };

    // Function to remove a highlight
    const remove_highlight = (index) => {
        const newHighlights = Highlights.filter((_, i) => i !== index);
        setHighlights(newHighlights);
        setinput_highlight(""); // Clear input field
    };


    // Function to show popup
    const showAlert = (message, type) => {
        Swal.fire({
            title: type === "success" ? "Success" : "Error",
            text: message,
            icon: type,
            confirmButtonText: "OK",
        });
    };



    useEffect(() => {
        SetLoading(false);
    }, [])


    const selectFile = (image, file) => {
        const imageUrl = URL.createObjectURL(file);
        if (image === 'img1') {
            setImg1(imageUrl);
            setfile1(file)
        }
        else if (image === 'img2') {
            setImg2(imageUrl);
            setfile2(file)
        }
        else if (image === 'img3') {
            setImg3(imageUrl);
            setfile3(file)
        }
        else if (image === 'img4') {
            setImg4(imageUrl);
            setfile4(file)
        }
        else if (image === 'img5') {
            setImg5(imageUrl);
            setfile5(file)
        }
        // console.log(file)
    }


    async function addProduct() {
        try {
            if (Title == "" || Slug == "" || Quantity == "" || Price == "" || Discount == "" || Description == "") {
                setErrorMsg("Please fill All Fields "); return;
            }

            SetLoading(true)

            const user_id = localStorage.getItem('superUserId');
            const token = localStorage.getItem('superToken');

            const formData = new FormData();

            // Append text fields
            formData.append("type", "add");
            formData.append("cat_id", cat_id);
            formData.append("user_id", user_id);
            formData.append("token", token);
            formData.append("title", Title);
            formData.append("slug", Slug);
            formData.append("quantity", Quantity);
            formData.append("price", Price);
            formData.append("weight", Weight);
            formData.append("weightType", WeightType);
            formData.append("discount", Discount);
            formData.append("description", Description);

            // Append highlights array as JSON string
            formData.append("highlights", JSON.stringify(Highlights));

            // Append images (only if they exist)
            if (file1) formData.append("image1", file1);
            if (file2) formData.append("image2", file2);
            if (file3) formData.append("image3", file3);
            if (file4) formData.append("image4", file4);
            if (file5) formData.append("image5", file5);

            let url = import.meta.env.VITE_API_ADMIN_ADD_UPDATE_PRODUCT;

            const response = await axios.post(url, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }

            );

            // console.log(response); return

            if (response.data.msg == "success") {
                // const msg = response.data.msg;
                SetLoading(false)
                // dataList.type == 'add' ? setMsg("Product Added") : setMsg("Product Updated");
                showAlert("Product Added!", "success");
                return;
            }
            else {
                showAlert(response.data.msg, "error");
                SetLoading(false)
                return;
            }
        } catch (error) {
            SetLoading(false)
            console.error('Login failed:', error);
        }
    }


    return (

        loading
            ?
            <PreLoader />
            :
            <section className='container-fluid p-0'>
                <div className="container p-3">
                    <div className="row p-md-3 p-2 bg-white">
                        <h3 className='col-12 text-center'>Add Product</h3>
                        <div className='form-group col-md-4 mb-2 '>
                            <label htmlFor="">Title</label>
                            <input type="text"
                                onChange={(e) => setTitle(e.target.value)}
                                className='form-control' />
                        </div>

                        <div className='form-group col-md-4 mb-2 '>
                            <label htmlFor="">Slug</label>
                            <input type="text"
                                onChange={(e) => setSlug(e.target.value)}
                                className='form-control' />
                        </div>

                        <div className='form-group col-md-4 mb-2 '>
                            <label htmlFor="">Qty</label>
                            <input type="text"
                                onChange={(e) => setQuantity(e.target.value)}
                                className='form-control' />
                        </div>

                        <div className='form-group col-md-4 mb-2 '>
                            <label htmlFor="">Price</label>
                            <input type="text"
                                onChange={(e) => setPrice(e.target.value)}
                                className='form-control' />
                        </div>

                        <div className='form-group col-md-4 mb-2 '>
                            <label htmlFor="">Weight</label>
                            <input type="text"
                                onChange={(e) => setWeight(e.target.value)}
                                className='form-control' />
                        </div>

                        <div className='form-group col-md-4 mb-2 '>
                            <label htmlFor="">WeightType</label>
                            <select className='form-select' onChange={(e) => setWeightType(e.target.value)}>
                                <option value="Gm">Gram</option>
                                <option value="Kg">Kilogram</option>
                                <option value="Ltr">Liter</option>
                            </select>

                        </div>

                        <div className='form-group col-md-4 mb-2 '>
                            <label htmlFor="">Discount</label>
                            <input type="text"
                                onChange={(e) => setDiscount(e.target.value)}
                                className='form-control' />
                        </div>

                        <div className='form-group col-md-4 mb-2 '>
                            <label htmlFor="">Description</label>
                            <textarea rows={5}
                                onChange={(e) => setDescription(e.target.value)}
                                className='form-control'  ></textarea>
                        </div>

                        <div className="row">
                            <div className='form-group col-md-12 mb-2 '>
                                <label htmlFor="">Highlights</label>
                                <input type="text" onChange={(e) => setinput_highlight(e.target.value)} className='form-control' />
                                <button className='btn btn-outline-dark my-1 ' onClick={() => add_highlight()}>Add</button>
                            </div>

                            <div className=' col-md-12   mb-2 '>
                                <h6>HightLight List</h6>
                                <ul className="border list-group">
                                    {Highlights.length > 0
                                        ? Highlights.map((text, index) => (
                                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                                {text.name}
                                                <FaTrash
                                                    className="text-danger"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => remove_highlight(index)}
                                                />
                                            </li>
                                        ))
                                        : <li className="list-group-item">No highlights added</li>}
                                </ul>
                            </div>
                        </div>

                        <div className="row text-center">
                            <h3>Product Images</h3>
                            <div className='form-group col-md-3  py-2 mb-2 '>
                                <div className='border p-2'>
                                    <label htmlFor="">Image 1</label>
                                    {Img1 &&
                                        <div className='p-3 imagebox'>
                                            <img src={Img1} alt="" width={"100%"} />
                                        </div>
                                    }
                                    <input type="file"
                                        onChange={(e) => selectFile('img1', e.target.files[0])}
                                        className='form-control' />
                                </div>
                            </div>

                            <div className='form-group col-md-3  py-2 mb-2 '>
                                <div className='border p-2'>
                                    <label htmlFor="">Image 2</label>
                                    {Img2 &&
                                        <div className='p-3 imagebox'>
                                            <img src={Img2} alt="" width={"100%"} />
                                        </div>
                                    }
                                    <input type="file"
                                        onChange={(e) => selectFile('img2', e.target.files[0])}
                                        className='form-control' />
                                </div>
                            </div>

                            <div className='form-group col-md-3  py-2 mb-2 '>
                                <div className='border p-2'>
                                    <label htmlFor="">Image 3</label>
                                    {Img3 &&
                                        <div className='p-3 imagebox'>
                                            <img src={Img3} alt="" width={"100%"} />
                                        </div>
                                    }
                                    <input type="file"
                                        onChange={(e) => selectFile('img3', e.target.files[0])}
                                        className='form-control' />
                                </div>
                            </div>

                            <div className='form-group col-md-3  py-2 mb-2 '>
                                <div className='border  p-2'>
                                    <label htmlFor="">Image 4</label>
                                    {Img4 &&
                                        <div className='p-3 imagebox'>
                                            <img src={Img4} alt="" width={"100%"} />
                                        </div>
                                    }
                                    <input type="file"
                                        onChange={(e) => selectFile('img4', e.target.files[0])}
                                        className='form-control' />
                                </div>
                            </div>

                            <div className='form-group col-md-3  py-2 mb-2 '>
                                <div className='border p-2'>
                                    <label htmlFor="">Image 5</label>
                                    {Img5 &&
                                        <div className='p-3 imagebox'>
                                            <img src={Img5} alt="" width={"100%"} />
                                        </div>
                                    }
                                    <input type="file"
                                        onChange={(e) => selectFile('img5', e.target.files[0])}
                                        className='form-control' />
                                </div>
                            </div>

                            <div className='col-12 my-3 text-center '>
                                <button className='btn btn-primary' onClick={() => { addProduct() }} >Add Now</button>
                            </div>

                            <div className='col-12 my-3 text-center '>
                                {
                                    ErrorMsg && <p className='text-danger fw-bold'>{ErrorMsg}</p>
                                }

                                {
                                    Msg && <p className='text-success fw-bold'>{Msg}</p>
                                }
                            </div>

                        </div>

                    </div>
                </div>
            </section>
    )
}

export default SuperAdmin_AddProduct