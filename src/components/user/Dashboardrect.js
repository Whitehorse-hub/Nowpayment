import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboardrect = ({ label, icon: Icon, path, onClick }) => {
    const navigate = useNavigate();
    return (
        <div
            className="card-button"
            onClick={onClick}
        // onClick={() => navigate(path)}
        >
            {/* {<Loading />} */}
            <Icon size={48} color="#242B35" />
            <span className="card-label">{label}</span>
        </div>
    );
};

export default Dashboardrect;