import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Alert from "../popup/Alert";
import Request_loader from "../preloader/Request_loader";

const List4 = ({ data }) => {
    const [loading, setLoading] = useState(false);

    const [BoardName, setBoardName] = useState(data.board_name);
    const [selectedImage, setSelectedImage] = useState(null);
    const api_base_url = import.meta.env.VITE_API_BASE_URL + "/files";
    const user_id = localStorage.getItem('superUserId');
    const token = localStorage.getItem('superToken');

    // Handle input changes
    const handleBoardNameChange = (e) => setBoardName(e.target.value);
    const handleImageChange = (e) => setSelectedImage(e.target.files[0]);

    // Handle full update (board name + image)
    const handleUpdate = async () => {

        let dataList = {
            type: "update",
            user_id: user_id,
            token: token,
            cat_name: BoardName,
            cat_id: data.board_id,
            image: selectedImage, // Send Base64 image in JSON
        }

        setLoading(true); // Disable button and show loader

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_ADMIN_ADD_UPDATE_CATEGORY}`, dataList, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.data.msg == 'success') {
                Alert.success("Board updated successfully!");
            } else {
                Alert.error("Failed to update board.");
            }
        } catch (error) {
            console.error("Error updating board:", error);
            Alert.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <tr className="border">
            <td>{data.board_id}</td>
            <td>
                <input
                    type="text"
                    value={BoardName}
                    onChange={handleBoardNameChange}
                    className="form-control"
                />
            </td>
            <td>
                {/* Display current image */}
                {data.image ? (
                    <img
                        src={`${api_base_url}${data.linkTo}/${data.image}`}
                        alt="Board"
                        className="img-fluid rounded"
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                ) : (
                    <span>No Image</span>
                )}

                {/* File input */}
                <input type="file" accept="image/*" onChange={handleImageChange} className="form-control mt-2" />
            </td>
            <td>
                <button className="btn btn-sm btn-outline-success me-2" onClick={handleUpdate}>
                    <Request_loader loading={loading} title={"Update All"} />
                </button>
            </td>
            <td>
                <Link to={`/superAdmin/classes/${data.board_id}/${BoardName}`} className="btn btn-sm btn-outline-primary me-2 f14">
                    View All
                </Link>
            </td>
        </tr>
    );
};

export default List4;
