import { useNavigate } from 'react-router-dom';
import { Send } from "lucide-react";
import Adminhead from "./Admin-panel-head"
import cardImage from "../../../src/admin-head.jpg"
import HTMLFlipBook from "react-pageflip";
import { signOut } from "firebase/auth";
import { auth } from '../../firebase';

const cardData = [
    {
        title: "Lowest fees",
        description: "Start with a 0.5% deposit fee and withdraw your earnings without service costs.",
        image: cardImage,
    },
    {
        title: "Secure payments",
        description: "All transactions are encrypted end-to-end.",
        image: cardImage,
    },
    {
        title: "Fast payouts",
        description: "Withdraw your earnings instantly at any time.",
        image: cardImage,
    },
    {
        title: "Multi-currency",
        description: "Supports BTC, ETH, DOGE, and many more.",
        image: cardImage,
    },
    {
        title: "Transparent",
        description: "No hidden charges. Full pricing control.",
        image: cardImage,
    },
    {
        title: "API Access",
        description: "Easily integrate with your systems via our developer API.",
        image: cardImage,
    },
];

const Adpanel = () => {
    const navigate = useNavigate();
    const UserStatus = () => {
        navigate('/admin/table')
    }
    const Report = () => {
        navigate('')
    }
    const logoutUser = async () => {
        try {
            await signOut(auth);
            navigate("/login"); // Redirect to login page
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start"
        }}>
            <div style={{
                backgroundColor: "#99DEFE",
                paddingRight: 20,
                paddingLeft: 20,
                // marginRight: 300,
                height: "100vh"
            }}>
                <div>
                    <button style={{
                        backgroundColor: "#0CC2FF",
                        color: "white",
                        width: 200,
                        height: 50,
                        border: 0,
                        fontWeight: "bold",
                        fontFamily: "lexend",
                        marginTop: 200,
                        borderRadius: 5,
                        cursor: "pointer",
                    }}
                        onClick={UserStatus}
                    >
                        Table of all checks
                    </button>
                </div>
                {/* <div>
                    <button style={{
                        backgroundColor: "#242B35",
                        color: "white",
                        width: 200,
                        height: 50,
                        border: 0,
                        fontWeight: "bold",
                        fontFamily: "lexend",
                        marginTop: 50,
                        borderRadius: 5,
                        cursor: "pointer",
                    }}
                    >
                        <span>WhatsApp Send</span>
                        <Send size={20} style={{
                            marginLeft: 10,
                            color: "#0CC2FF"
                        }} />
                    </button>
                </div> */}
                {/* <div>
                    <button style={{
                        backgroundColor: "#242B35",
                        color: "#0CC2FF",
                        width: 200,
                        height: 50,
                        border: 0,
                        fontWeight: "bold",
                        fontFamily: "lexend",
                        marginTop: 50,
                        borderRadius: 5,
                        cursor: "pointer",
                    }}
                        onClick={Report}
                    >
                        <span>Report Edit</span>
                    </button>
                </div> */}
                <div>
                    <button style={{
                        backgroundColor: "#242B35",
                        color: "#0CC2FF",
                        width: 200,
                        height: 50,
                        border: 0,
                        fontWeight: "bold",
                        fontFamily: "lexend",
                        marginTop: 50,
                        borderRadius: 5,
                        cursor: "pointer",
                    }}
                        onClick={logoutUser}
                    >
                        <span>Log Out</span>
                    </button>
                </div>
            </div>
            {/* <HTMLFlipBook
                width={340}
                height={400}
                size="fixed"
                maxShadowOpacity={0.5}
                showCover={false}
                drawShadow={true}
                flippingTime={800}
                className="flipbook"
                style={{
                    marginTop : 200
                }}
            >
                {cardData.map((card, index) => (
                    <div className="flip-page" key={index}>
                        <Adminhead
                            title={card.title}
                            description={card.description}
                            image={card.image}
                        />
                    </div>
                ))}
            </HTMLFlipBook> */}
            <div style={{
                maxWidth: 1720,
                width: "100vw",
                height: "100vh",
                backgroundColor: "#EAF5FF",
            }}>
                <div style={{
                    marginTop: 200,
                    marginLeft: 300,
                }}>
                    <h1 className='admin-panel-title'>
                        Here, you can check the user's payment check.
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Adpanel