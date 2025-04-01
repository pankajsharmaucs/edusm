import React, { useEffect, useState } from 'react';
import List1 from '../../../components/List.jsx/List1';
import PreLoader from '../../../components/preloader/PreLoader';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';  // Import Bootstrap Modal
import Alert from '../../../components/popup/Alert';
import Swal from "sweetalert2";

const SuperAdmin_Classes = () => {
    const [loading, SetLoading] = useState(true);
    const { board_id, board_name } = useParams(); // Access the dynamic parameter
    const [classList, setclassList] = useState([]);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [classToDelete, setClassToDelete] = useState(null); // Class ID to be deleted
    const user_id = localStorage.getItem('superUserId');
    const token = localStorage.getItem('superToken');

    // Fetch classes when the board_id changes
    const getClasses = () => {
        let url = import.meta.env.VITE_API_USER_GET_CLASSES_BY_BOARD_ID + "?board_id=" + board_id;
        axios.get(url).then((response) => {
            if (response.data.msg === 'success') {
                setclassList(response.data.pro_detail); // Set the class list if successful
            }
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
            SetLoading(false);
        });
    };

    useEffect(() => {
        getClasses();
    }, [board_id]);

    const addClasses = () => {
        Swal.fire({
            title: "Add New Class",
            html: `
                <input id="class_name" class="swal2-input" placeholder="Enter Class Name">
            `,
            showCancelButton: true,
            confirmButtonText: "Add Class",
            preConfirm: () => {
                const class_name = document.getElementById("class_name").value.trim();

                if (!class_name || !board_id) {
                    Swal.showValidationMessage("All fields are required!");
                    return false;
                }

                return { class_name, board_id };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { class_name, board_id } = result.value;
                const formData = new FormData();
                formData.append("class_name", class_name);
                formData.append("type", "add");
                formData.append("board_id", board_id);
                formData.append("user_id", user_id); // Replace with dynamic user_id
                formData.append("token", token); // Replace with actual token

                axios.post(`${import.meta.env.VITE_API_ADMIN_ADD_UPDATE_CLASS}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                })
                    .then(response => {
                        if (response.data.msg === "success") {
                            Alert.success("Success", "Class added successfully!", "success");
                            getClasses();
                        } else {
                            Alert.error("Error", "Failed to add class.", "error");
                        }
                    })
                    .catch(error => {
                        Alert.error("Error", "Something went wrong!", "error");
                        console.error("Error adding class:", error);
                    });
            }
        });
    }

    // Handle updating class
    const handleUpdate = (class_id, updatedClassName) => {
        const updatedClasses = classList.map((classItem) =>
            classItem.class_id === class_id
                ? { ...classItem, class_name: updatedClassName }
                : classItem
        );
        setclassList(updatedClasses);

        const formData = new FormData();
        formData.append("class_id", class_id);
        formData.append("class_name", updatedClassName);
        formData.append("type", "update");
        formData.append("board_id", board_id);
        formData.append("user_id", user_id);
        formData.append("token", token);

        // console.log(formData);return


        axios.post(`${import.meta.env.VITE_API_ADMIN_ADD_UPDATE_CLASS}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(response => {
            if (response.data.msg === "success") {
                console.log("Class updated successfully");
                Alert.success("Class updated successfully!");
            } else {
                Alert.error("Error updating class:", error);
            }
        }).catch(error => {
            console.error("Error updating class:", error);
        });


    };

    // Handle deleting class
    const handleDelete = (class_id) => {
        const updatedClasses = classList.filter((classItem) => classItem.class_id !== class_id);
        setclassList(updatedClasses);

        const formData = new FormData();
        formData.append("class_id", class_id);
        formData.append("type", "delete");
        formData.append("user_id", user_id);
        formData.append("token", token);

        // console.log(formData); return

        axios.post(`${import.meta.env.VITE_API_ADMIN_ADD_UPDATE_CLASS}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(response => {
            if (response.data.msg === "success") {
                Alert.success("Class deleted successfully!");
            } else {
                Alert.error("Error deletion class:", error);
            }
        }).catch(error => {
            Alert.error("Something went wrong! Please try again.");
        });
    };

    // Open the modal for confirmation
    const openDeleteModal = (class_id) => {
        setClassToDelete(class_id);
        setShowModal(true);
    };

    // Close the modal without deleting
    const closeModal = () => {
        setShowModal(false);
        setClassToDelete(null);
    };

    // Confirm delete action
    const confirmDelete = () => {
        if (classToDelete !== null) {
            handleDelete(classToDelete);
            closeModal();
        }
    };

    return (
        <>
            {
                loading ?
                    <PreLoader />
                    :
                    <section className='categoryItems my-3'>
                        <div className="container">
                            <div className="categoryBox jac flex-wrap">
                                <section className='container-fluid p-0'>
                                    <div className="container">
                                        <div className="row p-2 bg-white">
                                            <div className="col-12 text-center my-4"><h3>{ board_name } Board </h3></div>
                                            <div className='col-12 mb-3 jbc'>
                                                <button onClick={() => addClasses()} className='btn btn-sm btn-success'>Add Classes</button>
                                            </div>
                                            <table className='col-12 text-center table tabled-bordered table-stripped'>
                                                <thead>
                                                    <tr>
                                                        <th>Class ID</th>
                                                        <th>Class Name</th>
                                                        <th>Edit</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        classList.length > 0 ?
                                                            classList.map((data, index) => (
                                                                <List1
                                                                    key={index}
                                                                    data={data}
                                                                    handleUpdate={handleUpdate}
                                                                    openDeleteModal={openDeleteModal} // Open modal for delete
                                                                />
                                                            ))
                                                            : <tr><td colSpan="4">No classes available</td></tr>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </section>
            }

            {/* Confirmation Modal */}
            <Modal show={showModal} onHide={closeModal} centered dialogClassName="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this class?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SuperAdmin_Classes;
