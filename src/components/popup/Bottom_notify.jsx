import React from 'react'

const Bottom_notify = ({msg,icon}) => {
    
    return (
            <div className='addToCartPop '>
                <div className='bg-white py-2 border-light border-3 col-10 border jcc animate__animated  animate__bounceIn animate__faster shadow'>
                    <img src={icon} className='me-2' alt="" />
                    <h6 className='text-center pt-2'>
                       {msg}
                    </h6>
                </div>
            </div>
    )
}

export default Bottom_notify