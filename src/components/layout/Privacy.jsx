import Footer from './Footer';
import Navbar from './Navbar';

const Privacy = () => {
    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column"
        }}>
            <Navbar />
            <div>
                <div className="container py-5">
                    <h2 className="text-center text-primary fw-bold mb-4">Privacy Policy</h2>

                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="list-group list-group-flush shadow-sm rounded bg-white">
                                <div className="list-group-item py-4">
                                    <h5 className="fw-semibold text-dark mb-2">🔒 We do not share your email or data</h5>
                                    <p className="text-muted mb-0">Your information is never shared with any third parties.</p>
                                </div>

                                <div className="list-group-item py-4">
                                    <h5 className="fw-semibold text-dark mb-2">🕵️ Anonymous Verification</h5>
                                    <p className="text-muted mb-0">This is an anonymous verification service. Only minimal data is stored securely and temporarily.</p>
                                </div>

                                <div className="list-group-item py-4">
                                    <h5 className="fw-semibold text-dark mb-2">🖼️ Uploaded Media Privacy</h5>
                                    <p className="text-muted mb-0">Images or reports uploaded are only accessible to the submitting user and are not shared or reused.</p>
                                </div>

                                <div className="list-group-item py-4">
                                    <h5 className="fw-semibold text-dark mb-2">💳 Secure Payment Handling</h5>
                                    <p className="text-muted mb-0">All payments are handled through <a href="https://nowpayments.io" target="_blank" rel="noopener noreferrer">NowPayments.io</a>. We do not store or access your payment details.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <Footer />
        </div>
    )
}

export default Privacy;