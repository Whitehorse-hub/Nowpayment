import { useEffect, useState } from "react";
import {
    collection, onSnapshot,
    doc,
    updateDoc
    , Timestamp
} from "firebase/firestore";
import { db } from "../../firebase";      // adjust the path to your firebase config
import { AiOutlineClockCircle, AiOutlineCheckCircle, AiOutlineSend, AiOutlineDown } from "react-icons/ai";

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [updatingUserId, setUpdatingUserId] = useState(null);
    const [reportingUser, setReportingUser] = useState(null);
    const [reportText, setReportText] = useState("");
    const [submittingReport, setSubmittingReport] = useState(false);
    const [activeTab, setActiveTab] = useState("all");

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
            const usersData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsers(usersData);
        });

        return () => unsubscribe();
    }, []);

    const handleStatusChange = async (userId, newStatus) => {
        setUpdatingUserId(userId);
        try {
            const userRef = doc(db, "users", userId);
            await updateDoc(userRef, { status: newStatus });
            console.log(`Status updated to "${newStatus}" for user ${userId}`);
        } catch (error) {
            console.error("Error updating status:", error);
        } finally {
            setUpdatingUserId(null); // Stop spinner
            setEditingUserId(null); // Exit edit mode
        }
    };
    const getStatusBadge = (status) => {
        const baseStyle = {
            padding: "4px 8px",
            borderRadius: "12px",
            fontSize: "0.85em",
            fontWeight: "500",
            textTransform: "capitalize",
            display: "inline-block",
            alignItems: "center",
            gap: "5px",
        };

        switch (status) {
            case "pending":
                return (
                    <span style={{ ...baseStyle, background: "#FFFBE6", color: "#AD8B00" }}>
                        <AiOutlineClockCircle />
                        Pending
                    </span>
                );
            case "sent":
                return (
                    <span style={{ ...baseStyle, background: "#E6F7FF", color: "#096DD9" }}>
                        <AiOutlineSend />
                        Sent
                    </span>
                );
            case "completed":
                return (
                    <span style={{ ...baseStyle, background: "#F6FFED", color: "#389E0D", width: 112, }}>
                        <AiOutlineCheckCircle />
                        Completed
                    </span>
                );
            default:
                return (
                    <span style={{ ...baseStyle, background: "#F0F0F0", color: "#8C8C8C" }}>
                        -
                    </span>
                );
        }
    };

    const handleReportSubmit = async () => {
        if (!reportText.trim() || !reportingUser?.status) return;

        const reportField = `report_${reportingUser.status}`; // e.g., report_sent

        try {
            setSubmittingReport(true);

            const userRef = doc(db, "users", reportingUser.id);
            await updateDoc(userRef, {
                [reportField]: reportText.trim()
            });

            // Reset modal
            setReportingUser(null);
            setReportText("");
        } catch (error) {
            console.error("Error submitting report:", error);
        } finally {
            setSubmittingReport(false);
        }
    };
    useEffect(() => {
        if (reportingUser?.status) {
            const existingReport = reportingUser[`report_${reportingUser.status}`];
            setReportText(existingReport || "");
        }
    }, [reportingUser]);

    return (
        <div className="table-container">
            <h2 style={{ color: "#99DEFE" }}>All Users (Live)</h2>
            <div style={{ marginBottom: "16px" }}>
                <button
                    onClick={() => setActiveTab("all")}
                    style={{
                        padding: "8px 16px",
                        background: activeTab === "all" ? "#3A6DE8" : "#f0f0f0",
                        color: activeTab === "all" ? "#fff" : "#000",
                        border: "none",
                        borderRadius: "6px",
                        marginRight: "8px",
                        cursor: "pointer"
                    }}
                >
                    All Users
                </button>
                <button
                    onClick={() => setActiveTab("completed")}
                    style={{
                        padding: "8px 16px",
                        background: activeTab === "completed" ? "#3A6DE8" : "#f0f0f0",
                        color: activeTab === "completed" ? "#fff" : "#000",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >
                    Completed Users
                </button>
            </div>
            <table className="user-table">
                <thead>
                    <tr>
                        {/* <th>ID</th> */}
                        <th>Email</th>
                        {/* <th>Pay-op</th> */}
                        <th>model_num</th>
                        <th>serial_num</th>
                        <th>role</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {(activeTab === "all" ? users : users.filter(user => user.status === "completed")).map((user) => (
                        <tr key={user.id}>
                            <td>{user.email || "-"}</td>
                            <td>{user.modelNumber || "-"}</td>
                            <td>{user.serialNumber || "-"}</td>
                            <td>{user.role || "-"}</td>
                            <td>{user.createdAt?.toDate().toLocaleString() || "-"}</td>
                            <td>
                                {updatingUserId === user.id ? (
                                    <span style={{ fontSize: "1.2em" }}>⏳</span>
                                ) : editingUserId === user.id ? (
                                    <select
                                        value={user.status || ""}
                                        onChange={(e) =>
                                            handleStatusChange(user.id, e.target.value)
                                        }
                                        onBlur={() => setEditingUserId(null)} // exit edit on blur
                                        autoFocus
                                    >
                                        <option value="">-- Select --</option>
                                        <option value="pending">pending</option>
                                        <option value="sent">Sent</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                ) : (
                                    <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "space-between" }}>
                                        {getStatusBadge(user.status)}
                                        <button
                                            onClick={() => setEditingUserId(user.id)}
                                            style={{
                                                border: "none",
                                                background: "transparent",
                                                cursor: "pointer",
                                                fontSize: "1.1em",
                                                padding: 0,
                                                color: "#FFA3BB",
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                            title="Change status"
                                        >
                                            <AiOutlineDown />
                                        </button>
                                        <button
                                            onClick={() => setReportingUser(user)}
                                            style={{
                                                marginLeft: "6px",
                                                padding: "4px 8px",
                                                fontSize: "0.85em",
                                                borderRadius: "6px",
                                                border: "1px solid #ccc",
                                                background: "#fff",
                                                cursor: "pointer",
                                                marginLeft: 50,
                                            }}
                                        >
                                            Report
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {reportingUser && (
                <div style={{
                    position: "fixed",
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 999
                }}>
                    <div style={{
                        background: "#fff",
                        padding: "24px",
                        borderRadius: "10px",
                        width: "420px",
                        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                        position: "relative"
                    }}>
                        <h3 style={{ marginTop: 0 }}>Report User</h3>
                        <p><strong>Email:</strong> {reportingUser.email}</p>
                        <p><strong>Status:</strong> {reportingUser.status}</p>

                        <label htmlFor="reportText" style={{ fontWeight: "bold", display: "block", marginTop: "16px" }}>
                            Message:
                        </label>
                        <textarea
                            id="reportText"
                            value={reportText}
                            onChange={(e) => setReportText(e.target.value)}
                            rows="4"
                            style={{
                                width: "100%",
                                padding: "8px",
                                borderRadius: "6px",
                                border: "1px solid #ccc",
                                resize: "vertical",
                                marginTop: "6px"
                            }}
                            placeholder="Describe the issue here..."
                        />

                        <div style={{ marginTop: "20px", textAlign: "right" }}>
                            <button
                                onClick={() => setReportingUser(null)}
                                style={{
                                    padding: "6px 12px",
                                    marginRight: "8px",
                                    border: "none",
                                    borderRadius: "6px",
                                    background: "#ccc",
                                    cursor: "pointer"
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReportSubmit}
                                disabled={submittingReport || !reportText.trim()}
                                style={{
                                    padding: "6px 12px",
                                    border: "none",
                                    borderRadius: "6px",
                                    background: submittingReport ? "#aaa" : "#1677ff",
                                    color: "#fff",
                                    cursor: submittingReport ? "not-allowed" : "pointer"
                                }}
                            >
                                {submittingReport ? "Submitting..." : "Notify user"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserTable;