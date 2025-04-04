import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const List1 = ({ data, handleUpdate, openDeleteModal }) => {
    const [className, setClassName] = useState(data.class_name);

    const handleClassNameChange = (e) => {
        setClassName(e.target.value);
    };

    const handleUpdateClick = () => {
        handleUpdate(data.class_id, className);
    };

    const handleDeleteClick = () => {
        openDeleteModal(data.class_id);
    };

    return (
        <tr className='border'>
            <td>{data.class_id}</td>
            <td>
                <input
                    type="text"
                    value={className}
                    onChange={handleClassNameChange}
                    className='form-control'
                />
            </td>
            <td>
                <button className='btn btn-sm btn-outline-success me-2' onClick={handleUpdateClick}>
                    Update
                </button>
                <button className='btn btn-sm btn-outline-danger' onClick={handleDeleteClick}>
                    Delete
                </button>
            </td>

            <td>
                <Link to={`/superAdmin/subjects/${data.class_id}/${className}`} className='btn btn-sm btn-outline-primary me-2 f14' >
                    View All
                </Link>
                 
            </td>

        </tr>
    );
};

export default List1;
