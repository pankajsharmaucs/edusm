import React from 'react'
import './button.css'

function AddToCart_Btn({ text }) {
    return (
        <button className="add_to_cart_button">
            {text}
        </button>
    )
}

export default AddToCart_Btn