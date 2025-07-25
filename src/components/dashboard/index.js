import React, { useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import { connect } from 'react-redux';
import { setLoginData } from '../../actions/auth';

const Landing = ({ setLoginData }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const navigate = useNavigate();

    const handleSelect = (option) => {
        setSelectedOption(option);
    };

    const goToModelNumber = () => {
        setLoginData({ price: selectedOption })
        navigate('/model_number');
    };

    return (
        <div>
            <Navbar />
            <div className='landing-page'
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 20,
                    marginRight: 200
                }}>
                <div style={{
                    marginTop: 20
                }}>
                    <div className="rolex-header">
                        {/* <img className="rolex-logo" src='../../img/Rolex_logo.png' alt='' /> */}
                        <p className="rolex-title">Rolex Accounting</p>
                    </div>
                    <p style={{
                        color: "#0CC2FF",
                        marginTop: 50,
                    }}>
                        SIMPLE, QUICK, SECURED
                    </p>
                    <h1 className='check-my-rolex'>
                        Check My Rolex
                    </h1>
                    <div className='verify'>
                        <p className='verify-letter'
                            style={{
                                fontSize: 20,
                                color: "#707070",
                            }}>
                            Verify your Rolex anonymously. No hassle. Irrefutable data direct from Rolex Inc.
                        </p>
                    </div>
                    <div style={{
                    }}>
                        <p style={{
                            marginTop: 70,
                            fontFamily: "lexend"
                        }}>
                            Select your payment method:
                        </p>
                        <div>
                            <label className="form-check-label" style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 10,
                                marginTop: 10,
                                fontSize: 17,
                                color: "#2262A5",
                                fontFamily: "lexend"
                            }}>
                                <input type="radio"
                                    className="form-check-input"
                                    name="payment-type"
                                    value={250}
                                    checked={selectedOption === 250}
                                    onChange={() => handleSelect(250)}
                                    style={{
                                        transform: "scale(1.1)"
                                    }} /> Rolex Check: $250
                            </label>
                        </div>
                        <div>
                            <label className="form-check-label" style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 10,
                                marginTop: 10,
                                fontSize: 17,
                                color: "#2262A5",
                                fontFamily: "lexend"
                            }}>
                                <input type="radio"
                                    className="form-check-input"
                                    name="payment-type"
                                    value={450}
                                    checked={selectedOption === 450}
                                    onChange={() => handleSelect(450)}
                                    style={{
                                        transform: "scale(1.1)"
                                    }} /> Rolex Checks: $450
                            </label>
                        </div>
                    </div>
                    <button
                        style={{
                            backgroundColor: "#0A2540",
                            color: "white",
                            width: 200,
                            height: 50,
                            border: 0,
                            fontWeight: "bold",
                            fontFamily: "lexend",
                            marginTop: 50,
                            borderRadius: 5,
                            cursor: selectedOption ? "pointer" : "not-allowed",
                        }}
                        disabled={!selectedOption}
                        onClick={goToModelNumber}
                    >
                        Start My Check
                    </button>
                </div>

                <div style={{
                    display: "flex",
                    flexDirection: "row"
                }}
                >
                    <div>
                        <img
                            className='man-image'
                            style={{
                                width: 350,
                                marginTop: 100,
                                clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%, 0 10%)',
                            }} src='../../img/hero-img-2.jpg' alt=''></img>
                    </div>
                    <div>
                        <img
                            className="hero-image"
                            src="../../img/hero-img-3.jpg"
                            alt=""
                            style={{
                                width: 350,
                                marginLeft: 50,
                                clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%, 0 10%)',
                                marginTop: 250,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};


export default connect(() => { }, { setLoginData })(Landing);
