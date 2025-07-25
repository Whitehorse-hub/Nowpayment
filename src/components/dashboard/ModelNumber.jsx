import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setLoginData } from '../../actions/auth';

const ModelNumberComponent = ({ setLoginData }) => {
    const navigate = useNavigate();

    // Store Model & Serial
    const [modelNumber, setModelNumber] = useState("");
    const [serialNumber, setSerialNumber] = useState("");

    const GotoEmail = async () => {
        if (!/^\d{7,10}$/.test(modelNumber)) {
            alert("Model Number must be 7 to 10 digits.");
            return;
        }
        if (!/^\d{6,7}$/.test(serialNumber)) {
            alert("Serial Number must be 6 to 7 digits.");
            return;
        }

        setLoginData({ modelNumber, serialNumber })
        navigate('/register');
    };

    return (
        <div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
            }}>
                <img style={{
                    width: 200,
                    marginTop: 50,
                    marginLeft: 90
                }} src='../../img/Signuplogo.jpg' alt=''></img>
            </div>
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
                        Model Number:
                    </p>
                    <input type=""
                        className="form-control"
                        id=""
                        placeholder="Enter Model Number"
                        value={modelNumber}
                        onChange={(e) => setModelNumber(e.target.value)}
                        name=""
                        style={{
                            height: 50,
                            width: 400,
                            borderColor: "#2262A5",
                            borderRadius: 5,
                            fontSize: 20
                        }}></input>
                    {/* Password Panel */}
                    <p style={{
                        fontFamily: "cursive",
                        marginTop: 30
                    }}>
                        Serial Number:
                    </p>
                    <input type=""
                        className="form-control"
                        id=""
                        placeholder="Enter Serial Number"
                        name=""
                        value={serialNumber}
                        onChange={(e) => setSerialNumber(e.target.value)}
                        style={{
                            height: 50,
                            width: 400,
                            borderColor: "#2262A5",
                            fontSize: 20,
                            borderRadius: 5
                        }}></input>
                </div>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center"
            }}>
                <button style={{
                    backgroundColor: "#0A2540",
                    color: "white",
                    width: 200,
                    height: 50,
                    border: 0,
                    fontWeight: "bold",
                    fontFamily: "lexend",
                    marginTop: 50,
                    borderRadius: 5
                }} onClick={GotoEmail}>
                    Go to Signup
                </button>
            </div>
        </div>
    )
}

export default connect(() => { }, { setLoginData })(ModelNumberComponent);
