 import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import CustomerHome from "./pages/CustomerHome";
import NearbyMechanics from "./pages/NearbyMechanics";

import MechanicLayout from "./components/MechanicLayout";
import PhygitalHub from "./pages/PhygitalHub";
import Enquiries from "./pages/Enquiries";
import MechanicProfile from "./pages/MechanicProfile";

function AdminDashboard() {
  return (
    <div className="page-content">
      <h1 className="page-title">Admin Dashboard</h1>

      <p className="muted">
        Welcome to the Phygital Repair administration panel.
      </p>

      <div className="enquiry-stats">
        <div className="enquiry-stat">
          <span>Registered Users</span>
          <strong>
            {getUsers().length}
          </strong>
        </div>

        <div className="enquiry-stat">
          <span>Mechanics</span>
          <strong>
            {getUsers().filter((user) => user.role === "mechanic").length}
          </strong>
        </div>

        <div className="enquiry-stat">
          <span>Customer Enquiries</span>
          <strong>
            {getEnquiries().length}
          </strong>
        </div>
      </div>

      <h2>Registered Accounts</h2>

      <div className="enquiries-list">
        {getUsers().length === 0 ? (
          <p>No registered users yet.</p>
        ) : (
          getUsers().map((user) => (
            <article className="enquiry-card" key={user.id}>
              <h3>{user.name}</h3>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
            </article>
          ))
        )}
      </div>

      <button
        className="nearby-back-button"
        onClick={() => {
          localStorage.removeItem("phygitalCurrentUser");
          window.location.href = "/login";
        }}
      >
        Log Out
      </button>
    </div>
  );
}

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem("phygitalUsers") || "[]");
  } catch {
    return [];
  }
}

function getEnquiries() {
  try {
    return JSON.parse(
      localStorage.getItem("phygitalEnquiries") || "[]"
    );
  } catch {
    return [];
  }
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login and registration */}
        <Route path="/login" element={<Login />} />

        {/* Customer pages */}
        <Route path="/customer" element={<CustomerHome />} />

        <Route
          path="/customer/mechanics"
          element={<NearbyMechanics />}
        />

        {/* Mechanic dashboard and its pages */}
        <Route path="/mechanic" element={<MechanicLayout />}>
          <Route index element={<PhygitalHub />} />

          <Route
            path="enquiries"
            element={<Enquiries />}
          />

          <Route
            path="profile"
            element={<MechanicProfile />}
          />
        </Route>

        {/* Administrator page */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        {/* Default and invalid routes */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;