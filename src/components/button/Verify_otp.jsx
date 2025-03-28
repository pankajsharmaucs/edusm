import React from 'react'
import './button.css'

function Verify_otp({ text }) {
    return (
        <button className="verify_otp_button">
            {text}
        </button>
    )
}

export default Verify_otp