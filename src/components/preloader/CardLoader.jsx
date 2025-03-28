import React from "react";
import "./CardLoader.css"; // Add some styling for the skeleton effect

const CardLoader = () => {
  return (
    <div className="card-loader">
      <div className="image-placeholder"></div>
      <div className="text-placeholder"></div>
      <div className="text-placeholder small"></div>
    </div>
  );
};

export default CardLoader;