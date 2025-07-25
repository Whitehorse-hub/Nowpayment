import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUndo } from "react-icons/fa";

const Report = () => {
    const navigate = useNavigate();
    const GotoEmail = () => {
        navigate('/admin/panel')
    }
    const [hovered, setHovered] = useState(false);

    const [reportData, setReportData] = useState({
        title: "",
        description: "",
        email: "",
    });
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReportData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!reportData.title || !reportData.description || !reportData.email ) {
            alert("Please fill in all fields.");
            return;
        }

        const formData = new FormData();
        formData.append("title", reportData.title);
        formData.append("description", reportData.description);
        formData.append("email", reportData.email);
        if (file) formData.append("file", file);

        // Example logging:
        for (let pair of formData.entries()) {
            console.log(pair[0] + ": " + pair[1]);
        }

        // Reset form or send to backend here...
    };

    return (
        <div className='typical-property-four-col'>
            <div className='report'>
                <form
                    onSubmit={handleSubmit}
                    style={{
                        maxWidth: 450,
                        margin: "40px auto",
                        padding: 30,
                        borderRadius: 10,
                        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                        backgroundColor: "#fff",
                    }}
                >
                    <h2 style={{ textAlign: "center", color: "#64ACFF" }}>
                        Manual Report Builder
                    </h2>

                    <label
                        style={{
                            display: "block",
                            marginBottom: 12,
                            fontWeight: "600",
                            color: "#444",
                        }}
                    >
                        Title:
                        <input
                            type="text"
                            name="title"
                            value={reportData.title}
                            onChange={handleChange}
                            required
                            placeholder="Enter report title"
                            style={{
                                width: "100%",
                                padding: "10px 12px",
                                marginTop: 6,
                                borderRadius: 6,
                                border: "1px solid #ccc",
                                fontSize: 16,
                                transition: "border-color 0.3s",
                            }}
                            onFocus={(e) => (e.target.style.borderColor = "#007BFF")}
                            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                        />
                    </label>
                    <label
                        style={{
                            display: "block",
                            marginBottom: 12,
                            fontWeight: "600",
                            color: "#444",
                        }}
                    >
                        Email:
                        <input
                            type="text"
                            name="title"
                            value={reportData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter user email"
                            style={{
                                width: "100%",
                                padding: "10px 12px",
                                marginTop: 6,
                                borderRadius: 6,
                                border: "1px solid #ccc",
                                fontSize: 16,
                                transition: "border-color 0.3s",
                            }}
                            onFocus={(e) => (e.target.style.borderColor = "#007BFF")}
                            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                        />
                    </label>

                    <label
                        style={{
                            display: "block",
                            marginBottom: 18,
                            fontWeight: "600",
                            color: "#444",
                        }}
                    >
                        Description:
                        <textarea
                            name="description"
                            value={reportData.description}
                            onChange={handleChange}
                            required
                            placeholder="Describe the issue or report details"
                            rows={5}
                            style={{
                                width: "100%",
                                padding: "10px 12px",
                                marginTop: 6,
                                borderRadius: 6,
                                border: "1px solid #ccc",
                                fontSize: 16,
                                resize: "vertical",
                                transition: "border-color 0.3s",
                            }}
                            onFocus={(e) => (e.target.style.borderColor = "#007BFF")}
                            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                        />
                    </label>

                    <label
                        style={{
                            display: "block",
                            marginBottom: 10,
                            fontWeight: "600",
                            color: "#444",
                            cursor: "pointer",
                        }}
                    >
                        Upload File/Image:
                        <input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={handleFileChange}
                            style={{ marginTop: 8 }}
                        />
                    </label>

                    {file && (
                        <div
                            style={{
                                marginTop: 12,
                                padding: 10,
                                backgroundColor: "#f9f9f9",
                                borderRadius: 6,
                                fontSize: 14,
                                color: "#555",
                                fontStyle: "italic",
                            }}
                        >
                            📎 Selected File: {file.name}
                        </div>
                    )}

                    <button
                        type="submit"
                        style={{
                            marginTop: 25,
                            width: "100%",
                            padding: "12px 0",
                            fontSize: 18,
                            fontWeight: "bold",
                            color: "#fff",
                            backgroundColor: "#007BFF",
                            border: "none",
                            borderRadius: 8,
                            cursor: "pointer",
                            boxShadow: "0 4px 12px rgba(0,123,255,0.4)",
                            transition: "background-color 0.3s ease",
                            fontFamily: "lexend"
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")}
                    >
                        Notify User
                    </button>
                </form>
            </div>
            <div>
                <button
                    type="button"
                    onClick={GotoEmail}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    style={{
                        marginBottom: 20,
                        backgroundColor: hovered ? "#8C8C88" : "#EDEDE6" ,
                        border: "none",
                        color: "#007BFF",
                        fontSize: 16,
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "10px 16px",
                        borderRadius: 8,
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                        transition: "all 0.3s ease",
                        outline: "none",
                    }}
                >
                    <FaUndo
                        size={18}
                        style={{
                            transition: "transform 0.3s ease",
                            transform: hovered ? "rotate(-15deg) scale(1.05)" : "none",
                        }}
                    />
                    Back
                </button>
            </div>
        </div>
    );
}

export default Report;