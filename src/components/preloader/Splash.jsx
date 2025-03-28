import React from 'react'
import "./preLoader.css"
import preLoaderImage from "/assets/icon.png"

const Splash = ({ msg }) => {
    return (
        <div className='preLoaderBox'>
            <div className='col-12 text-center'>
                <img style={{ width: "120px" }} src={preLoaderImage} alt="preloader image" />
                <h3 className='text-secondary mt-4'>{msg}</h3>
            </div>
        </div>
    )
}

export default Splash