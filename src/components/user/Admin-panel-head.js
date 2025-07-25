import React from "react";
import { useState } from "react";

const Book = ({ title, description, image }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className={`fee-card ${hovered ? "flipped" : ""}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="card-face card-front">
                <img src={image} alt="Fee Icon" />
                <p><span className="highlight">{title}</span> on the market</p>
            </div>
            <div className="card-face card-back">
                <p><span className="highlight">{title}</span> on the market</p>
                <p className="description">{description}</p>
            </div>

            <div className="folded-corner"></div>
        </div>
    );
};

export default Book;