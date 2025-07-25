import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../layout/Footer';
import bcrypt from "bcryptjs";                  // Encrypt Password
import { connect } from 'react-redux';
import { setLoginData } from '../../actions/auth';

const Register = ({setLoginData}) => {
    const navigate = useNavigate();         // must be inside a React component
    const [isChecked, setIsChecked] = useState(false);
    // Admin Login, User signup
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleAuth = async () => {
        setError("");
        const salt = bcrypt.genSaltSync(10); // generate salt
        const hashedPassword = bcrypt.hashSync(password, salt); // hash password

        setLoginData({ password: password, email })
        navigate("/payment");
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column"
        }} >
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 50,
            }}>
                <h2 style={{
                    color: "#346AEA",
                    fontWeight: "bold",
                    fontSize: 40
                }}>
                    Register
                </h2>
                <img style={{
                    width: 200,
                }} src='../../img/signup.jpg' alt=''></img>
            </div>
            {/* Email and Password Input */}
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 50
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
                        placeholder=""
                        name=""
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            height: 50,
                            width: 400,
                            borderColor: "#2262A5",
                            fontSize: 30,
                            borderRadius: 5
                        }}></input>
                    <label className="form-check-label" style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 10,
                        marginTop: 20,
                        fontSize: 17,
                        color: "#2262A5",
                        fontFamily: "lexend",
                        width: 400
                    }}>
                        <input type="checkbox"
                            className="form-check-input"
                            value=""
                            style={{
                                transform: "scale(1.2)"
                            }}
                            onChange={(e) => setIsChecked(e.target.checked)} />
                        I agree that no refunds or edits can be made once submitted.
                    </label>
                </div>
            </div>
            {/* Go to Payment Panel */}
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <button style={{
                    color: "white",
                    width: 200,
                    height: 50,
                    border: 0,
                    fontFamily: "lexend",
                    marginTop: 50,
                    borderRadius: 5,
                    backgroundColor: "#0A2540",
                    opacity: isChecked ? 1 : 0.6,
                }}
                    onClick={handleAuth}
                    disabled={!isChecked}
                >
                    Register
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
            <Footer />
        </div>
    )
}

export default connect(() => { }, { setLoginData })(Register);
