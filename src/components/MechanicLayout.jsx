import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function MechanicLayout() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem("phygitalCurrentUser") || "{}"
  );

  const [enquiryCount, setEnquiryCount] = useState(0);

  useEffect(() => {
    function updateEnquiryCount() {
      const enquiries = JSON.parse(
        localStorage.getItem("phygitalEnquiries") || "[]"
      );

      const pendingEnquiries = enquiries.filter(
        (enquiry) =>
          enquiry.mechanicUserId === currentUser.id &&
          enquiry.status === "Pending"
      );

      setEnquiryCount(pendingEnquiries.length);
    }

    updateEnquiryCount();

    window.addEventListener("storage", updateEnquiryCount);
    window.addEventListener("focus", updateEnquiryCount);

    return () => {
      window.removeEventListener("storage", updateEnquiryCount);
      window.removeEventListener("focus", updateEnquiryCount);
    };
  }, [currentUser.id]);

  function logout() {
    localStorage.removeItem("phygitalCurrentUser");
    navigate("/login");
  }

  return (
    <div className="mechanic-layout">
      <aside className="mechanic-sidebar">
        <div className="mechanic-brand">
          <div className="mechanic-brand-logo">
            <i className="bi bi-cpu-fill"></i>
          </div>
          <div>
        <div className="brand-name">Phygital</div>
        <small>REPAIR NETWORK</small>
</div>
</div>
        <nav>
          <NavLink to="/mechanic" end>
            <i className="bi bi-house-door"></i>
            Phygital Hub
          </NavLink>

          <NavLink
            to="/mechanic/enquiries"
            className="mechanic-enquiries-link"
          >
            <span className="enquiry-link-text">
              <i className="bi bi-chat-dots"></i>
              Customer Enquiries
            </span>

            {enquiryCount > 0 && (
              <span className="enquiry-badge">
                {enquiryCount > 99 ? "99+" : enquiryCount}
              </span>
            )}
          </NavLink>

          <NavLink to="/mechanic/profile">
            <i className="bi bi-person"></i>
            My Profile
          </NavLink>
        </nav>

        <button
          onClick={logout}
          style={{
            marginTop: "auto",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            background: "#5b3cc4",
            color: "white",
            fontWeight: "700",
          }}
        >
          Logout
        </button>
      </aside>

      <div className="mechanic-main">
        <header className="mechanic-topbar">
          <div>
            <h2>{currentUser.name || "Mechanic User"}</h2>
            <p>Local Technician</p>
          </div>

          <span
            style={{
              background: "#dcfce7",
              color: "#166534",
              padding: "8px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "700",
            }}
          >
            Available for work
          </span>
        </header>

        <Outlet />
      </div>
    </div>
  );
}

export default MechanicLayout;