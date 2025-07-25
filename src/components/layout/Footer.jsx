import { Link } from 'react-router-dom';

const Footer = () => {

    return (
        <div
            style={{
                background: "black", // dark background
                padding: "1rem 0",
                textAlign: "center",
                color: "white",
                marginTop: "auto", // ensures it sits at bottom in flex layout
            }} >
            {/* © 2025 MyApp — All rights reserved. */}
            <ul style={{ display: "flex", flexDirection: "row", gap: 20, justifyContent: "center" }}>
                <li>
                    <Link to="/terms" className="no-underline">
                        <span style={{
                            fontSize: "18px",
                            color: "white",
                            fontWeight: "bold"
                        }}>
                            Ts&Cs
                        </span>
                    </Link>
                </li>
                <li>
                    <Link to="/privacy" className="no-underline">
                        <span style={{
                            fontSize: "18px",
                            color: "#64ACFF",
                            fontWeight: "bold"
                        }}>
                            Privacy
                        </span>
                    </Link>
                </li>
                <li>
                    <Link to="" className="no-underline">
                        <span style={{
                            fontSize: "18px",
                            color: "white",
                            fontWeight: "bold"
                        }}>
                            Contact
                        </span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};


export default Footer;
