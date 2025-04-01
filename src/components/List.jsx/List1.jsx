import React, { useState } from 'react';

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
        </tr>
    );
};

export default List1;
