import { Link } from "react-router-dom";

const Table_show = ({ data, columns }) => {

    return (
        <table className="table table-striped text-center">
            <thead className="table-dark">
                <tr>
                    {columns.map((col, idx) => (
                        <th key={idx}>{col.replace("_", " ").toUpperCase()}</th>
                    ))}
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index} className="f13" >
                        <td>{item.board_id}</td>
                        <td>{item.board_name}</td>
                        <td>
                            <Link to={`/superAdmin/classes/${item.board_id}/${item.board_name}`} className="btn btn-primary btn-sm"> View</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table_show;
