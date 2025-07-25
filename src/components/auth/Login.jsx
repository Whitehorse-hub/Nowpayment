import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../layout/Footer';
import {
    signInWithEmailAndPassword
} from "firebase/auth"
import { auth, db } from "../../firebase"
import { doc, getDoc, } from "firebase/firestore";
import Navbar from '../layout/Navbar';
import bcrypt from "bcryptjs";                  // Encrypt Password


const Login = () => {
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    // Admin Login
    // const [isLogin, setIsLogin] = useState(true); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // ✅ Auto-check when password length is >= 6
    useEffect(() => {
        if (password.length >= 6) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [password]);

    const handleAuth = async () => {
        const salt = bcrypt.genSaltSync(10); // generate salt
        const hashedPassword = bcrypt.hashSync(password, salt); // hash password
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;

            // Optional: fetch user data from Firestore
            const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
            
            if (userDoc.exists() ) {
                console.log("User data:",);
                // Navigate after login
                navigate("/userdashboard"); // or /payment, etc.
            }
            if (userDoc.data().role == "admin") {
                navigate("/admin/panel");
            }

        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column"
        }} >
            <Navbar />
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20
            }}>
                <h2 style={{
                    color: "#346AEA",
                    fontWeight: "bold",
                    fontSize: 40
                }}>
                    Login
                </h2>
                <img style={{
                    width: 200,
                    marginTop: 10,
                }} src='../../img/signup.jpg' alt=''></img>
            </div>
            {/* Email and Password Input */}
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <p style={{
                        fontFamily: "cursive"
                    }}>
                        Email:
                    </p>
                    <input type="email"
                        className="form-control"
                        id="email"
                        placeholder=""
                        name=""
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            height: 50,
                            width: 400,
                            borderColor: "#2262A5",
                            borderRadius: 5,
                            fontSize: 20,
                            fontFamily: "lexend"
                        }}></input>
                    {/* Password Panel */}
                    <p style={{
                        fontFamily: "cursive",
                        marginTop: 30
                    }}>
                        Password:
                    </p>
                    <input type="password"
                        className="form-control"
                        id="pwd"
                        placeholder="Enter Password"
                        name=""
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            height: 50,
                            width: 400,
                            borderColor: "#2262A5",
                            fontSize: 30,
                            borderRadius: 5
                        }} />
                    {/* Show checkmark or message */}
                    {/* {isChecked ? (
                        <p style={{ color: "green", marginTop: 10 }}></p>
                    ) : (
                        <p style={{ color: "red", marginTop: 10 }}>Password must be at least 6 characters</p>
                    )} */}
                </div>
            </div>
            {/* Go to Admin Panel */}
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <button style={{
                    backgroundColor: isChecked ? "#29313A" : "#3D536D",
                    color: "white",
                    width: 200,
                    height: 50,
                    border: 0,
                    fontFamily: "lexend",
                    marginTop: 50,
                    borderRadius: 5,
                    opacity: isChecked ? 1 : 0.6,
                }}
                    onClick={handleAuth}
                >
                    Login
                </button>
            </div>
            <Footer />
        </div>
    )
}

export default Login;