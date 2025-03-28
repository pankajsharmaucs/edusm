import React from 'react'
import { FaStar, FaUser } from 'react-icons/fa'

const ReviewBox = ({ totalStars, data }) => {


    return (
        <>
            <div className='px-0 pt-2    row mb-2'>
                <div className='customerReviewList'>
                    <div className='jsc'>
                        <FaUser className='userIcon' />
                        <div className='mx-2 '>
                            <h6 className='customerName mb-0'>{data.name}</h6>
                            <div className=' mt-0'>
                                {[...Array(totalStars)].map((_, index) => (
                                    <FaStar key={index} className={`FaStar ${index < data.rating ? 'activeStar' : 'star'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='daysAgo'>3 Days ago</div>
                </div>

                <div className="col-12 mt-2">
                    <p className='review' >{data.review}</p>
                </div>
            </div>
        </>
    )
}

export default ReviewBox