import React from 'react';
import './button.css';
import { Link } from 'react-router-dom';

function Checkout_button({ text, linkTo }) {
    return (
        <Link to={linkTo} className="text-decoration-none text-white">
            <button className="checkout_button">
                {text}
            </button>
        </Link>
    );
}

function GoToCart({ text, linkTo }) {
    return (
        <Link to={linkTo} className="text-decoration-none text-white">
            <button className="goToCart">
                {text}
            </button>
        </Link>
    );
}

// Named exports (recommended)
export { Checkout_button, GoToCart };
