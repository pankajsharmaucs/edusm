import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const List3 = ({ data, handleUpdate, openDeleteModal }) => {
    const [SubjectName, setSubjectName] = useState(data.subject_name);

    const handleSubjectNameChange = (e) => {
        setSubjectName(e.target.value);
    };

    const handleUpdateClick = () => {
        handleUpdate(data.subject_id, SubjectName);
    };

    const handleDeleteClick = () => {
        openDeleteModal(data.subject_id);
    };

    return (
        <tr className='border'>
            <td>{data.subject_id}</td>
            <td>
                <input
                    type="text"
                    value={SubjectName}
                    onChange={handleSubjectNameChange}
                    SubjectName='form-control'
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
                <Link to={`/superAdmin/topics/${data.subject_id}/${SubjectName}`} className='btn btn-sm btn-outline-primary me-2 f14' >
                    View All
                </Link>
            </td>

        </tr>
    );
};

export default List3;
