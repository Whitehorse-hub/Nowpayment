import { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../../firebase';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const authLinks = (
        <ul style={styles.linkList}>
            <li>
                <button onClick={handleLogout} style={styles.logoutButton}>
                    Logout
                </button>
            </li>
            <li>
                <Link to="/faq" className="no-underline">
                    <span style={styles.faqLink}>FAQs</span>
                </Link>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul style={styles.linkList}>
            <li>
                <Link to="/login" className="no-underline">
                    <span style={styles.loginLink}>Login</span>
                </Link>
            </li>
            <li>
                <Link to="/faq" className="no-underline">
                    <span style={styles.faqLink}>FAQs</span>
                </Link>
            </li>
        </ul>
    );

    return (
        <nav className="navbar" style={styles.navbar}>
            <h1 style={styles.logoWrapper}>
                <Link to="/">
                    <img src="../../img/Rolex_logo.png" style={styles.logo} alt="Rolex" />
                </Link>
                <span style={styles.brandText}>
                    Welcome to <span style={styles.brandHighlight}>Rolex</span>
                </span>
            </h1>
            <Fragment>{user ? authLinks : guestLinks}</Fragment>
        </nav>
    );
};

const styles = {
    navbar: {
        backgroundColor: "black",
        paddingLeft: 20,
        paddingRight: 20,
    },
    logoWrapper: {
        margin: 0,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "10px",
        textDecoration: "none",
        color: "inherit",
    },
    logo: {
        width: 40,
    },
    brandText: {
        fontSize: 20,
        color: "#64ACFF",
    },
    brandHighlight: {
        color: "#64ACFF",
        fontWeight: "bold",
        fontSize: 30,
    },
    linkList: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        margin: 0,
    },
    loginLink: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#64ACFF",
    },
    faqLink: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "white",
    },
    logoutButton: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#64ACFF",
        background: "none",
        border: "none",
        cursor: "pointer",
    }
};


export default Navbar;
