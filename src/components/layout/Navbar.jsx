import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const guestLinks = (
        <ul style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            margin: 0,
        }}>
            <li>
                <Link to="/login" className="no-underline" >
                    <span style={{ fontSize: "18px", fontWeight: "bold", color: "#64ACFF" }}>
                        Login
                    </span>
                </Link>
            </li>
            <li>
                <Link to="/faq" className="no-underline">
                    <span style={{ fontSize: "18px", fontWeight: "bold", color: "white" }}>
                        FAQs
                    </span>
                </Link>
            </li>
        </ul>
    );

    return (
        <nav className="navbar"
            style={{
                backgroundColor: "black",
                // borderBottom: "3px solid #0CC2FF",
                paddingLeft: 20,
                paddingRight: 20,
            }} >
            <h1 style={{
                margin: 0,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                color: "inherit",
            }}>
                <Link to="/" style={{
                    margin: 0,
                    // padding: 0,
                }}>
                    <img src='../../img/Rolex_logo.png'
                        style={{
                            width: 40,
                        }} alt='' />
                </Link>
                <span style={{
                    fontSize: 20,
                    color: "#64ACFF",
                }}>
                    Welcome to{' '}
                    <span style={{
                        color: "#64ACFF",
                        fontWeight: "bold",
                        fontSize: 30
                    }}>Rolex
                    </span>
                </span>
            </h1>
            <Fragment>{guestLinks}</Fragment>
        </nav>
    );
};


export default Navbar;
