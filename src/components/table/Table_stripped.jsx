import React from "react";
import { useNavigate } from "react-router-dom";

const Table_stripped = ({ data, columns, actionColumn, redirectURL }) => {

    const navigate = useNavigate();

    const onViewReviews = (productId) => {
        navigate("/superAdmin/" + redirectURL + "/" + productId)
        // console.log("View reviews for product ID:", actionColumn);
    };

    if (!data || data.length === 0) {
        return <p className="text-center">No data available.</p>;
    }

    return (
        <div className="col-md-8 p-3">
            <h3 className="col-12 text-center mb-3">Product List</h3>

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
                            <tr key={item.id || index} className="f13" >
                                <td  >{index + 1}</td>
                                {columns.map((col, idx) => (
                                    <td key={idx}>{item[col]}</td>
                                ))}
                                <td>
                                    {redirectURL != null &&
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => onViewReviews(item[actionColumn])}
                                        >
                                            View
                                        </button>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table_stripped;
