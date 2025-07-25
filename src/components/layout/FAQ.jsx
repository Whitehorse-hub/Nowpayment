import Footer from './Footer';
import Navbar from './Navbar';

const FAQ = () => {
    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column"
        }}>
            <Navbar />
            <div>
                <div className="container py-5" >
                    <h1 className="h-2 text-center" style={{
                        color: "#0CC2FF"
                    }} >
                        Your wish
                    </h1>
                    <div className="mt-5 list-group list-group-flush">
                        <div className="list-group-item py-4">
                            <h5 className="mb-2 text-dark">❓ If you forget your phone number, then how can I bring it?</h5>
                            <p className="mb-0 text-muted">You had better contact with Administrator now, then it will be fulfilled.</p>
                        </div>
                        <div className="list-group-item py-4">
                            <h5 className="mb-2 text-dark">💰 Can I get a refund?</h5>
                            <p className="mb-0 text-muted">No refunds</p>
                        </div>
                        <div className="list-group-item py-4">
                            <h5 className="mb-2 text-dark">📦 Where does the information come from?</h5>
                            <p className="mb-0 text-muted">Official Rolex sources</p>
                        </div>
                        <div className="list-group-item py-4">
                            <h5 className="mb-2 text-dark">📋 What is included in the check?</h5>
                            <p className="mb-0 text-muted">
                                Model, Dial, Year, Warranty, Notes, and sometimes Image
                            </p>
                        </div>
                    </div>
                </div>


            </div>
            <Footer />
        </div>
    )
}

export default FAQ;