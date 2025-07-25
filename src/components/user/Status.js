import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    signInWithEmailAndPassword,
    getAuth, onAuthStateChanged
} from "firebase/auth"
import { auth, db } from "../../firebase"
import { doc, getDoc, collection, query, where, onSnapshot } from "firebase/firestore";
import { blue } from '@mui/material/colors';

const Status = () => {
    const navigate = useNavigate();
    const get_Back = () => {
        navigate("/userdashboard")
    }

    // ✅ Auto-check when password length is >= 6

    const [userData, setUserData] = useState(null);
    // const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(null);
    const [isReady, setIsReady] = useState(false);

    // 🧼 Cleanup onSnapshot listener
    useEffect(() => {
        const authInstance = getAuth();
        let unsubscribeDoc = null;
        let interval = null;

        const unsubscribeAuth = onAuthStateChanged(authInstance, (user) => {
            if (user) {
                const docRef = doc(db, "users", user.uid);

                unsubscribeDoc = onSnapshot(docRef, (docSnap) => {
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setUserData(data);

                        const createdTime = data.createdAt?.toDate().getTime();
                        const targetTime = createdTime + 24 * 60 * 60 * 1000;

                        const updateCountdown = () => {
                            const now = new Date().getTime();
                            const diff = targetTime - now;

                            if (diff <= 0) {
                                setIsReady(true);
                                setTimeLeft(null);
                                return;
                            }

                            const hours = Math.floor(diff / (1000 * 60 * 60));
                            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                            setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
                        };

                        updateCountdown();
                        interval = setInterval(updateCountdown, 1000);
                    } else {
                        console.log("No user document found.");
                    }
                });
            }
        });

        // 🔁 Proper cleanup for auth, doc, and interval
        return () => {
            unsubscribeAuth();
            if (unsubscribeDoc) unsubscribeDoc();
            if (interval) clearInterval(interval);
        };
    }, []);

    // if (loading) return <p>Loading...</p>;

    return (
        <div>
            <div style={{ padding: "30px" }}>
                <h2 style={{ color: "#99DEFE", fontFamily: "lexend" }}>My Profile</h2>
                {userData ? (
                    <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse", fontFamily: "lexend" }}>
                        <tbody>
                            {[
                                ["👤 Name", userData.name],
                                ["📧 Email", userData.email],
                                ["🎂 Age", userData.age],
                                ["📌 Status", userData.status],
                                ["🕒 Created At", userData.createdAt?.toDate().toLocaleString()],
                                ["👈 Here report received", userData.report_sent  ],
                                ["🧼 Here report received", userData.report_pending  ],
                            ].map(([label, value], idx) => (
                                <tr key={label} style={{ backgroundColor: idx % 2 === 0 ? "#f9f9f9" : "#ffffff" }}>
                                    <td style={{
                                        padding: "14px 20px",
                                        fontWeight: "bold",
                                        color: "#333",
                                        width: "35%",
                                        borderBottom: "1px solid #eee"
                                    }}>{label}</td>
                                    <td style={{
                                        padding: "14px 20px",
                                        color: "#555",
                                        borderBottom: "1px solid #eee"
                                    }}>{value || "-"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No user data found. Please ensure your account is registered in the users collection.</p>
                )}
            </div>
            <div style={{
                display: "flex",
                flexDirection: "row",
            }}>
                <button style={{
                    backgroundColor: "blue",
                    color: "white",
                    width: 200,
                    height: 50,
                    border: 0,
                    fontFamily: "lexend",
                    marginTop: 50,
                    borderRadius: 5,
                    opacity: 0.6,
                }}
                    onClick={get_Back}
                >
                    Back
                </button>
                <button
                    disabled={!isReady}
                    style={{
                        backgroundColor: isReady ? "red" : "black",
                        color: "white",
                        width: 200,
                        height: 50,
                        border: 0,
                        fontFamily: "lexend",
                        marginTop: 50,
                        borderRadius: 5,
                        opacity: 0.6,
                        marginLeft: 1000,
                        cursor: isReady ? "pointer" : "not-allowed",
                    }}
                    onClick={() => alert("Button Clicked!")}
                >
                    {isReady ? "Notify admin" : `⏳ Wait: ${timeLeft}`}
                </button>
            </div>
        </div>
    )
}

export default Status;