import React, { useEffect, useState } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import './showrating.css';
import ReviewBox from './ReviewBox';

const CustomerRating = ({ CustomerReview }) => {
    const totalStars = 5;
    const [rating, setRating] = useState(0); // Change this to test different ratings
    const [showAll, setShowAll] = useState(false);
    const visibleReviews = showAll ? CustomerReview : CustomerReview.slice(0, 5);

    const calculateFinalRating = (CustomerReview) => {
        if (!visibleReviews || visibleReviews.length === 0) return 0; // Handle empty or undefined input

        let totalRating = 0;

        visibleReviews.forEach((data) => {
            totalRating += parseFloat(data.rating) || 0; // Ensure valid numeric conversion
        });

        setRating(totalRating / visibleReviews.length);
    }

    useEffect(() => {

        calculateFinalRating();

    }, [])

    return (
        <>
            <div className="col-12 text-center mt-3">
                <h3>Customer Feedback</h3>
            </div>

            <div className='col-12 text-center ratingNumber'>
                <h6 className='mb-0 f12 text-secondary p-2 rounded'>Overall ratings</h6>
                <h1>{rating.toFixed(1)}</h1>
            </div>

            <div className='col-12 jcc'>
                {[...Array(totalStars)].map((_, index) => {
                    const starIndex = index + 1;
                    if (starIndex <= Math.floor(rating)) {
                        return <FaStar key={index} className="FaStar activeStar" />;
                    } else if (starIndex - 0.5 <= rating) {
                        return <FaStarHalfAlt key={index} className="FaStar activeStar" />;
                    } else {
                        return <FaStar key={index} className="FaStar star" />;
                    }
                })}
            </div>


            <div className="col-12 customerReviewBox mb-2 animate__animated animate__fadeIn">
                {visibleReviews.length && visibleReviews ? (
                    visibleReviews.map((data, index) => (
                        <ReviewBox key={index} totalStars={totalStars} data={data} />
                    ))
                ) : (
                    <p>No reviews available.</p>
                )}
            </div>

            {/* Show "Show More" button only if there are more than 5 reviews */}
            {CustomerReview.length > 5 && (
                <div className="col-12 my-3">
                    <div className='moreReviewBtn' onClick={() => setShowAll(!showAll)}>
                        {showAll ? "Show Less" : "Show More"}
                    </div>
                </div>
            )}


        </>
    );
}

export default CustomerRating;
