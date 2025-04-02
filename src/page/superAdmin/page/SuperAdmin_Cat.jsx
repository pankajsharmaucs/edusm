import React, { useEffect, useState } from 'react'
import Swal from "sweetalert2";
import axios from 'axios';
import Alert from '../../../components/popup/Alert';
import List4 from '../../../components/List.jsx/List4';


const SuperAdmin_Cat = () => {
    const user_id = localStorage.getItem('superUserId');
    const token = localStorage.getItem('superToken');

    const [catList, setcatList] = useState([]);
    const [BoardList, setBoardList] = useState([]);

    const fetchCat = () => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        let url = import.meta.env.VITE_API_USER_GET_ALL_CAT;
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.msg == 'success') {
                    console.log(result);
                    setcatList(result.all_cat)
                }
            }).catch((error) => console.error(error));
    }

    //  ===category List=====
    useEffect(() => {
        fetchCat()
    }, [])

    const addCategory = () => {
        Swal.fire({
            title: "Add New Board",
            html: `
                <input id="cat_name" class="swal2-input" placeholder="Enter Board Name">
                <input id="image" class="swal2-input" type="file">
            `,
            showCancelButton: true,
            confirmButtonText: "Add Board",
            preConfirm: () => {
                const cat_name = document.getElementById("cat_name").value.trim();
                const fileInput = document.getElementById("image");
                const file = fileInput.files[0]; // Get the selected file

                if (!cat_name || !file) {
                    Swal.showValidationMessage("All fields are required!");
                    return false;
                }

                return { cat_name, file };
            }
        }).then((result) => {
            if (result.isConfirmed) {

                const { cat_name, file } = result.value;

                let dataList = {
                    user_id: user_id,
                    token: token,
                    cat_name: cat_name,
                    image: file,
                }

                axios.post(`${import.meta.env.VITE_API_ADMIN_ADD_UPDATE_CATEGORY}`, dataList, {
                    headers: { "Content-Type": "multipart/form-data" }
                })
                    .then(response => {
                        if (response.data.msg === "success") {
                            fetchCat();
                            Alert.success("Success", "Board added successfully!", "success");
                        } else {
                            Alert.warning("Error", "Failed to add Board.", "error");
                        }
                    })
                    .catch(error => {
                        Alert.error("Error", "Something went wrong!", "error");
                        console.error("Error adding Board:", error);
                    });
            }

        });
    };


    // Handle updating class
    const handleUpdate = (board_id, updatedBoardName) => {
        const updatedClasses = BoardList.map((classItem) =>
            BoardItem.board_id === board_id
                ? { ...BoardItem, class_name: updatedBoardName }
                : BoardItem
        );
        setBoardList(updatedClasses);

        const formData = new FormData();
        formData.append("type", "update");
        formData.append("board_name", updatedBoardName);
        formData.append("board_id", board_id);
        formData.append("user_id", user_id);
        formData.append("token", token);

        axios.post(`${import.meta.env.VITE_API_ADMIN_ADD_UPDATE_CATEGORY}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(response => {
            if (response.data.msg === "success") {
                // console.log("Class updated successfully");
                Alert.success("Class updated successfully!");
            } else {
                Alert.error("Error updating class:", error);
            }
        }).catch(error => {
            console.error("Error updating class:", error);
        });


    };


    return (
        <section className='categoryItems my-3'>
            <div className="container">
                <div className='col-12 mb-3 jbc'>
                    <h3 className='text-capitalize'>All Board ({catList.length})</h3>
                    <button onClick={() => addCategory()} className='btn btn-sm btn-success' >Add Board</button>
                </div>
                <div className="col-12 d-flex flex-wrap justify-content-start">
                    <table className='col-12 text-center table tabled-bordered table-stripped'>
                        <thead>
                            <tr>
                                <th>Sno.</th>
                                <th>Board Name</th>
                                <th>Icon</th>
                                <th>Action</th>
                                <th>Subjects</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                catList.length > 0 ?
                                    catList.map((data, index) => 
                                        (
                                        <List4
                                            key={index}
                                            data={data}
                                            handleUpdate={handleUpdate}
                                        />
                                    ))
                                    : <tr><td colSpan="4">No classes available</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default SuperAdmin_Cat