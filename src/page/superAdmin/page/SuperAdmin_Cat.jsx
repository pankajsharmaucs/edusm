import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Table_show from '../../../components/table/Table_show';


const SuperAdmin_Cat = () => {

    const [catList, setcatList] = useState();

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
                    // console.log(result);
                    setcatList(result.all_cat)
                }
            }).catch((error) => console.error(error));
    }

    //  ===category List=====
    useEffect(() => {
        fetchCat()
    }, [])

    return (
        <section className='categoryItems my-3'>
            <div className="container">
                <div className='col-12 mb-3 jbc'>
                    <h3 className='text-capitalize'>All Board</h3>
                    <Link to={`../addBoard`} >
                        <button className='btn btn-sm btn-success' >Add more</button>
                    </Link>
                </div>
                <div className="col-12 d-flex flex-wrap justify-content-start">
                    {
                        catList
                            ?
                            <Table_show data={catList} columns={["id ", "Board name"]} />
                            : null
                    }
                </div>
            </div>
        </section>
    )
}

export default SuperAdmin_Cat