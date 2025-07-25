import React from 'react';
import Dashboardrect from './Dashboardrect';
import { CheckSquare, Users, LogOut } from "lucide-react";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

const Userdashboard = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isHovered1, setIsHovered1] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const logoutUser = async () => {
        try {
            await signOut(auth);
            navigate("/login"); // Redirect to login page
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    const my_check = () => {

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate('/user/status'); // ✅ Go to next page
        }, 1500); // simulate delay (1.5 seconds)
        // navigate("/user/status");
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            gap: 100,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
        }}
        >
            <div
                style={{
                    width: 500,
                    overflow: "hidden",
                    display: "inline-block",
                }}
            >
                <img src='../../img/trusted-desktop.png'
                    alt=''
                    style={{
                        width: "100%",
                        transition: "transform 2s ease-in-out",
                        transform: isHovered1 ? "rotate(360deg)" : "rotate(0deg)",
                        // transform: isHovered1 ? "rotateY(180deg)" : "rotateY(0deg)",
                        // transformStyle: "preserve-3d",
                    }}
                    onMouseEnter={() => setIsHovered1(true)}
                    onMouseLeave={() => setIsHovered1(false)}
                />
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 80
            }}>
                <div className="card-grid">
                    {loading && <Loading message={
                        <>
                            Your Rolex check is being processed. <br />
                            It may take up to 24 hours. <br />
                            Most are fulfilled within a few hours.
                        </>
                    } />}
                    <Dashboardrect label="My Checks" icon={CheckSquare} onClick={my_check} />
                    <Dashboardrect label="Referral" icon={Users} path="" />
                    <Dashboardrect label="Logout" icon={LogOut} path="" onClick={logoutUser} />
                </div>
                <div
                    style={{
                        overflow: "hidden",
                        width: "100%",
                    }}
                >
                    <img src='../../img/Integrations-500x393.webp'
                        alt=''
                        style={{
                            width: 500,
                            transition: "transform 0.3s ease, opacity 0.3s ease",
                            transformOrigin: "left",
                            transform: isHovered ? "scale(1.1)" : "scale(1)",
                            opacity: isHovered ? 0.8 : 1,
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Userdashboard;