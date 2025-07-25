import Footer from './Footer';
import Navbar from './Navbar';

const Terms = () => {
    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column"
        }}>
            <Navbar />
            <div>
                <div className="container py-5">
                    <h2 className="text-center text-primary fw-bold mb-4">Terms & Conditions</h2>

                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="list-group list-group-flush shadow-sm rounded bg-white">

                                <div className="list-group-item py-4">
                                    <h5 className="fw-semibold text-dark mb-2">🚫 No Refunds</h5>
                                    <p className="text-muted mb-0">No refunds will be issued under any circumstances.</p>
                                </div>

                                <div className="list-group-item py-4">
                                    <h5 className="fw-semibold text-dark mb-2">🔒 Submission Is Final</h5>
                                    <p className="text-muted mb-0">Once submitted, model and serial numbers cannot be edited.</p>
                                </div>

                                <div className="list-group-item py-4">
                                    <h5 className="fw-semibold text-dark mb-2">⏱️ Delivery Time</h5>
                                    <p className="text-muted mb-0">Report delivery may take up to 24 hours from the time of submission.</p>
                                </div>

                                <div className="list-group-item py-4">
                                    <h5 className="fw-semibold text-dark mb-2">⚠️ Data Use</h5>
                                    <p className="text-muted mb-0">You agree not to misuse, duplicate, or distribute the information provided in the report.</p>
                                </div>

                                <div className="list-group-item py-4">
                                    <h5 className="fw-semibold text-dark mb-2">🎁 Referral Program</h5>
                                    <p className="text-muted mb-0">Referral discounts are non-transferable and cannot be redeemed for cash.</p>
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

export default Terms;