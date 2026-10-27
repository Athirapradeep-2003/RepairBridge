import { useState } from "react";

function readEnquiries() {
  try {
    return JSON.parse(
      localStorage.getItem("phygitalEnquiries") || "[]"
    );
  } catch {
    return [];
  }
}

function Enquiries() {
  const [currentUser] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("phygitalCurrentUser") || "null"
      );
    } catch {
      return null;
    }
  });

  const [enquiries, setEnquiries] = useState(readEnquiries);
  const [filter, setFilter] = useState("All");
  const [message, setMessage] = useState("");

  if (!currentUser || currentUser.role !== "mechanic") {
    return (
      <div className="page-content">
        <h1 className="page-title">Customer Enquiries</h1>
        <p>Please log in using a mechanic account to view enquiries.</p>
      </div>
    );
  }

  const myEnquiries = enquiries.filter(
    (enquiry) =>
      enquiry.mechanicUserId === currentUser.id &&
      enquiry.status !== "Declined"
  );

  const filteredEnquiries =
    filter === "All"
      ? myEnquiries
      : myEnquiries.filter((enquiry) => enquiry.status === filter);

  function updateStatus(id, newStatus) {
    const updatedEnquiries = enquiries.map((enquiry) =>
      enquiry.id === id &&
      enquiry.mechanicUserId === currentUser.id
        ? { ...enquiry, status: newStatus }
        : enquiry
    );

    setEnquiries(updatedEnquiries);

    localStorage.setItem(
      "phygitalEnquiries",
      JSON.stringify(updatedEnquiries)
    );

    if (newStatus === "Declined") {
      setMessage("Enquiry declined successfully.");
      return;
    }

    setMessage(`Enquiry ${newStatus.toLowerCase()} successfully.`);
  }

  const pendingCount = myEnquiries.filter(
    (item) => item.status === "Pending"
  ).length;

  const acceptedCount = myEnquiries.filter(
    (item) => item.status === "Accepted"
  ).length;

  return (
    <div className="page-content">
      <div className="enquiries-heading">
        <span className="eyebrow">CUSTOMER CONNECTIONS</span>
        <h1 className="page-title">Customer Enquiries</h1>
        <p className="muted">
          Welcome, {currentUser.name}. Review and respond to your requests.
        </p>
      </div>

      <div className="enquiry-stats">
        <div className="enquiry-stat">
          <span>Pending</span>
          <strong>{pendingCount}</strong>
        </div>

        <div className="enquiry-stat">
          <span>Accepted</span>
          <strong>{acceptedCount}</strong>
        </div>
      </div>

      <div className="enquiry-toolbar">
        <h2>Incoming requests</h2>

        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          aria-label="Filter enquiries"
        >
          <option value="All">All enquiries</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
        </select>
      </div>

      {message && (
        <p className="success-message" role="status">
          <i className="bi bi-check-circle"></i> {message}
        </p>
      )}

      {filteredEnquiries.length === 0 ? (
        <div className="empty-results">
          <i className="bi bi-inbox"></i>
          <h2>No enquiries found</h2>
          <p>
            Customer enquiries sent to your registered mechanic account
            will appear here.
          </p>
        </div>
      ) : (
        <div className="enquiries-list">
          {filteredEnquiries.map((enquiry) => (
            <article className="enquiry-card" key={enquiry.id}>
              <div className="enquiry-card-header">
                <div>
                  <span className="enquiry-id">{enquiry.id}</span>
                  <h3>{enquiry.appliance}</h3>
                </div>

                <span
                  className={`enquiry-status ${enquiry.status.toLowerCase()}`}
                >
                  {enquiry.status}
                </span>
              </div>

              <p className="enquiry-problem">{enquiry.problem}</p>

              <div className="enquiry-details">
                <span>
                  <i className="bi bi-person"></i>{" "}
                  {enquiry.customerName}
                </span>

                <span>
                  <i className="bi bi-geo-alt"></i>{" "}
                  {enquiry.location}
                </span>
              </div>

              <div className="enquiry-details">
                <span>
                  <i className="bi bi-clock"></i>{" "}
                  {enquiry.createdAt}
                </span>
              </div>

              {enquiry.status === "Pending" ? (
                <div className="enquiry-actions">
                  <button
                    className="accept-button"
                    onClick={() =>
                      updateStatus(enquiry.id, "Accepted")
                    }
                  >
                    <i className="bi bi-check-lg"></i> Accept
                  </button>

                  <button
                    className="decline-button"
                    onClick={() =>
                      updateStatus(enquiry.id, "Declined")
                    }
                  >
                    <i className="bi bi-x-lg"></i> Decline
                  </button>
                </div>
              ) : (
                <p className="muted enquiry-response">
                  You have accepted this enquiry.
                </p>
              )}
            </article>
          ))}
        </div>
      )}

      <p className="demo-note">
        Demo mode: data is stored in this browser only. A backend is
        required to synchronize enquiries across devices.
      </p>
    </div>
  );
}

export default Enquiries;