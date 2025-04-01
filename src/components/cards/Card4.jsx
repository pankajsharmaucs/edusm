import React from 'react'
import { Link } from 'react-router-dom'
import './card1.css'

const Card4 = ({ url, img, title }) => {
    return (
        <div className='card4 col-12 '>
            <Link to={url} style={{textDecoration:"none"}}>
                <div className='cardInnerBox'>
                    <img src={img} />
                    <h4>{title}</h4>
                </div>
            </Link>
        </div>
    )
}

export default Card4