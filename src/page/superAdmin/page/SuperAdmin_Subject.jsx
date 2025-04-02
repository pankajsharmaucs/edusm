import React, { useEffect, useState } from 'react';
import PreLoader from '../../../components/preloader/PreLoader';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';  // Import Bootstrap Modal
import Alert from '../../../components/popup/Alert';
import Swal from "sweetalert2";
import List3 from '../../../components/List.jsx/List3';

const SuperAdmin_Subject = () => {
    const [loading, SetLoading] = useState(true);
    const { class_id, class_name } = useParams(); // Access the dynamic parameter
    const [subjectList, setsubjectList] = useState([]);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [SubjectToDelete, setSubjectToDelete] = useState(null); // Class ID to be deleted
    const user_id = localStorage.getItem('superUserId');
    const token = localStorage.getItem('superToken');

    // Fetch Subject  
    const getSubjects = () => {
        let url = import.meta.env.VITE_API_ADMIN_GET_SUBJECT_BY_CLASS_ID + "?class_id=" + class_id;
        axios.get(url).then((response) => {
            if (response.data.msg === 'success') {
                setsubjectList(response.data.pro_detail); // Set the class list if successful
            }
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
            SetLoading(false);
        });
    };

    useEffect(() => {
        getSubjects();
    }, [class_id]);


    const addSubjects = (class_id) => {
        Swal.fire({
            title: "Add New Subject",
            html: `
                <input id="subject_name" class="swal2-input" placeholder="Enter Subject Name">
            `,
            showCancelButton: true,
            confirmButtonText: "Add Subject",
            preConfirm: () => {
                const subject_name = document.getElementById("subject_name").value.trim();

                if (!subject_name || !class_id) {
                    Swal.showValidationMessage("All fields are required!");
                    return false;
                }

                return { subject_name, class_id };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { subject_name, class_id } = result.value;
                const formData = new FormData();
                formData.append("type", "add");
                formData.append("subject_name", subject_name);
                formData.append("class_id", class_id);
                formData.append("user_id", user_id); // Replace with dynamic user_id
                formData.append("token", token); // Replace with actual token

                axios.post(`${import.meta.env.VITE_API_ADMIN_ADD_UPDATE_SUBJECT}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                })
                    .then(response => {
                        if (response.data.msg === "success") {
                            Alert.success("Success", "Class added successfully!", "success");
                            getSubjects();
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
    const handleUpdate = (subject_id, updatedSubjectName) => {
        const updatedSubject = subjectList.map((subjectItem) =>
            subjectItem.class_id === class_id
                ? { ...subjectItem, class_name: updatedSubjectName }
                : subjectItem
        );
        setsubjectList(updatedSubject);

        const formData = new FormData();
        formData.append("subject_id", subject_id);
        formData.append("subject_name", updatedSubjectName);
        formData.append("type", "update");
        formData.append("class_id", class_id);
        formData.append("user_id", user_id);
        formData.append("token", token);

        // console.log(formData);return

        axios.post(`${import.meta.env.VITE_API_ADMIN_ADD_UPDATE_SUBJECT}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(response => {
            if (response.data.msg === "success") {
                // console.log("Subject updated successfully");
                Alert.success("Subject updated successfully!");
            } else {
                Alert.error("Error updating class:", error);
            }
        }).catch(error => {
            console.error("Error updating class:", error);
        });


    };

    // Handle deleting class
    const handleDelete = (subject_id) => {
       
        const formData = new FormData();
        formData.append("subject_id", subject_id);
        formData.append("type", "delete");
        formData.append("user_id", user_id);
        formData.append("token", token);

        // console.log(formData); return

        axios.post(`${import.meta.env.VITE_API_ADMIN_ADD_UPDATE_SUBJECT}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(response => {
            if (response.data.msg === "success") {
                getSubjects();
                Alert.success("Subject deleted successfully!");
            } else {
                Alert.error("Error deletion class:", error);
            }
        }).catch(error => {
            Alert.error("Something went wrong! Please try again.");
        });
    };

    // Open the modal for confirmation
    const openDeleteModal = (subject_id) => {
        setSubjectToDelete(subject_id);
        setShowModal(true);
    };

    // Close the modal without deleting
    const closeModal = () => {
        setShowModal(false);
        setSubjectToDelete(null);
    };

    // Confirm delete action
    const confirmDelete = () => {
        if (SubjectToDelete !== null) {
            handleDelete(SubjectToDelete);
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
                                            <div className="col-12 text-center my-4"><h3> All Subjects of class {class_name}</h3></div>
                                            <div className='col-12 mb-3 jbc'>
                                                <button onClick={() => addSubjects(class_id)} className='btn btn-sm btn-success'>Add Subjects</button>
                                            </div>
                                            <table className='col-12 text-center table tabled-bordered table-stripped'>
                                                <thead>
                                                    <tr>
                                                        <th>Subject ID</th>
                                                        <th>Subject Name</th>
                                                        <th>Action</th>
                                                        <th>Topics</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        subjectList.length > 0 ?
                                                            subjectList.map((data, index) => (
                                                                <List3
                                                                    key={index}
                                                                    data={data}
                                                                    handleUpdate={handleUpdate}
                                                                    openDeleteModal={openDeleteModal} // Open modal for delete
                                                                />
                                                            ))
                                                            : <tr><td colSpan="4">No Subject available</td></tr>
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

export default SuperAdmin_Subject;
