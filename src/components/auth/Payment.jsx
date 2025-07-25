import React from 'react';
import NowPaymentsApi from '@nowpaymentsio/nowpayments-api-js';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const npApi = new NowPaymentsApi({ apiKey: 'PATFDD3-J8EMS3G-G3P5S7J-JQMGG3H' });

const Payment = ({ user }) => {
    const navigate = useNavigate();
    const [cryptoList, setCryptoList] = React.useState([]);
    const [payment, setPayment] = React.useState(null);
    const [selected, setSelected] = React.useState('');

    React.useEffect(() => {
        if (!user) navigate("/")
    })

    React.useEffect(() => {
        async function fetch() {
            const { currencies } = await npApi.getCurrencies();
            setCryptoList(currencies ? currencies : []);
        }
        fetch();
    }, []);

    const startPayment = async () => {
        try {
            // Step 3: Navigate to payment

            const result = await npApi.createPayment({
                price_amount: user.price,
                price_currency: 'usd',
                pay_currency: selected,
                ipn_callback_url: 'http://localhost:3000/payment',
                order_id: 'ORDER123',
                order_description: 'Cool Product'
            });

            setPayment(result);
            console.log(result)

            // Step 2: Save additional info in Firestore
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                user.email,
                user.password
            );
            const firebaseUser = userCredential.user;
            const docRef = doc(db, "users", firebaseUser.uid);
            await setDoc(docRef, {
                selectedOption: user.price === 250 ? 1 : 2,
                modelNumber: user.modelNumber,
                serialNumber: user.serialNumber,
                email: user.email,
                password: user.password,
                createdAt: new Date(),
                role: "user",
                status: "pending",
                report_sent: "",
            });
        } catch (error) {
            console.error('Payment failed:', error);
        }
    };
    
    const Login = async () => {
        console.log("asdf")
        navigate("/login")
    }
    // QR code 
    if (payment) {
        return (
            <div style={{
                maxWidth: "400px",
                margin: "50px auto",
                padding: "30px",
                borderRadius: "12px",
                backgroundColor: "#f9fbfd",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                fontFamily: "Segoe UI, sans-serif"
            }}>
                <h2 style={{ color: "#164B78", marginBottom: "20px" }}>
                    Complete Your Payment
                </h2>

                <p style={{ fontSize: "16px", color: "#333" }}>
                    Send {payment.price_amount} {payment.pay_currency} to:
                </p>

                {/* Send <strong>{payment.pay_amount} {payment.pay_currency.toUpperCase()}</strong> to:
         */}
                <p style={{
                    fontSize: "14px",
                    wordBreak: "break-all",
                    backgroundColor: "#eef3f8",
                    padding: "10px",
                    borderRadius: "6px",
                    color: "#164B78",
                    fontWeight: "bold",
                    marginBottom: "20px"
                }}>
                    {payment.address}
                </p>

                <img
                    src={payment.qr_code_url}
                    alt="QR Code"
                    style={{
                        width: "200px",
                        height: "200px",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        backgroundColor: "#fff",
                        padding: "10px"
                    }}
                />

                <p style={{ marginTop: "20px", fontSize: "13px", color: "#666" }}>
                    Scan the QR code with your wallet or copy the address above.
                </p>
                {/* Login Button */}
                <button
                    // disabled={!selected}
                    onClick={Login}
                    style={{
                        width: "150px",
                        height: "50px",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "16px",
                        fontWeight: "600",
                        backgroundColor: "#0A2540",
                        transition: "background-color 0.3s"
                    }}
                >
                    LogIn →
                </button>
            </div>
        );
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            marginTop: "50px",
        }}>
            <label style={{ fontSize: "20px", fontWeight: "600", color: "#164B78" }}>
                Select cryptocurrency:
            </label>

            <select
                value={selected}
                onChange={e => setSelected(e.target.value)}
                style={{
                    width: "250px",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    fontSize: "16px",
                    backgroundColor: "#f9f9f9",
                    color: "#333",
                    outline: "none",
                    transition: "border 0.3s"
                }}
                onFocus={(e) => e.target.style.border = "1px solid #164B78"}
                onBlur={(e) => e.target.style.border = "1px solid #ccc"}
            >
                <option value="" disabled>Choose crypto</option>
                {cryptoList.map(c => (
                    <option key={c} value={c}>{c.toUpperCase()}</option>
                ))}
            </select>

            <button
                // disabled={!selected}
                onClick={startPayment}
                style={{
                    width: "250px",
                    height: "50px",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    backgroundColor: "#0A2540",
                    transition: "background-color 0.3s"
                }}
            >
                Pay {user?.price} USD →
            </button>
            {/* Go to UserDashboard */}
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(Payment);
