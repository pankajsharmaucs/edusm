import axios from "axios";
import React, { useEffect, useState } from "react";
import PreLoader from "../preloader/PreLoader";

const Table_edit = ({ data, columns }) => {

    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const [tableData, setTableData] = useState([]);
    const API_REVIEW = import.meta.env.VITE_API_ADMIN_ADD_UPDATE_REVIEW; // Define your review API URL in .env

    useEffect(() => {
        if (data) {
            setTableData(data);
        }
    }, [data]);


    const handleUpdate = async (index) => {
        const review = data[index];

        const user_id = localStorage.getItem('superUserId');
        const token = localStorage.getItem('superToken');

        const formData = new FormData();
        formData.append("user_id", user_id);
        formData.append("token", token);
        formData.append("product_id", review.product_id);
        formData.append("user_email", review.user_id);
        formData.append("name", review.name);
        formData.append("rating", review.rating);
        formData.append("review", review.review);
        formData.append("review_id", review.id);
        formData.append("type", 'update');

        setLoading(true)

        try {
            const response = await axios.post(API_REVIEW, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (response.data.msg === 'success') {
                setErrorMsg("");
                setMsg("Review Updated successfully!");
            } else {
                setMsg("");
                setErrorMsg(response.data.msg);
            }
        } catch (error) {
            setMsg("");
            setErrorMsg("Error Updating Rating/review.");
            console.error("Submission error:", error);
        }

        setLoading(false)
    };

    const handleInputChange = (index, col, value) => {
        const updatedData = [...tableData];
        updatedData[index][col] = value;
        setTableData(updatedData);
    };

    if (!data || data.length === 0) {
        return <p className="text-center">No data available.</p>;
    }


    return (

        loading
            ?
            <PreLoader />
            :
            <div className="col-md-12 p-3">
                <h3 className="col-12 text-center mb-3">Rating List</h3>

                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>Sno.</th>
                                {columns.map((col, idx) => (
                                    <th key={idx}>{col.replace("_", " ").toUpperCase()}</th>
                                ))}
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={item.id || index} className="f13">
                                    <td>{index + 1}</td>
                                    {columns.map((col, idx) => (
                                        <td key={idx}>
                                            {col === "rating" ? (
                                                <select
                                                    className="form-select"
                                                    value={item[col] ?? ""}
                                                    onChange={(e) => handleInputChange(index, col, e.target.value)}
                                                >
                                                    {[1, 2, 3, 4, 5].map((num) => (
                                                        <option key={num} value={num}>
                                                            {num}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={item[col] ?? ""}
                                                    onChange={(e) => handleInputChange(index, col, e.target.value)}
                                                />
                                            )}
                                        </td>
                                    ))}
                                    <td>
                                        <button className="btn btn-success btn-sm" onClick={() => handleUpdate(index)} >
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
    );
};

export default Table_edit;
