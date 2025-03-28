import React from 'react'
import './button.css'
import { Link } from 'react-router-dom'

function AddToCart_Btn2({ text, linkTo }) {
    return (
        <Link to={linkTo} className='text-decoration-none text-white' >
            <button className="add_to_cart_button">
                {text}
            </button>
        </Link>
    )
}

export default AddToCart_Btn2