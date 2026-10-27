import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const demoMechanics = [
  {
    id: "DEMO-001",
    name: "Arun Electronics Repair",
    category: "Home Appliances",
    skills: ["Washing Machine", "Refrigerator", "Home Appliances"],
    location: "Kozhikode",
    distance: 1.2,
    experience: 6,
    price: "₹300 - ₹800",
    rating: "4.8",
    available: true,
    description: "Experienced in household appliance repairs.",
  },
  {
    id: "DEMO-002",
    name: "Smart Fix Services",
    category: "Electronics",
    skills: ["Mobile Phones", "Electronics", "TV Repair"],
    location: "Kozhikode",
    distance: 2.5,
    experience: 4,
    price: "₹200 - ₹1,000",
    rating: "4.6",
    available: true,
    description: "Mobile phone and electronics repair services.",
  },
];

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function NearbyMechanics() {
  const navigate = useNavigate();

  const currentUser = readStorage("phygitalCurrentUser", null);
  const savedSearch = readStorage("phygitalRepairSearch", {});



  const [problem, setProblem] = useState(savedSearch.problem || "");
  const [appliance, setAppliance] = useState(
    savedSearch.appliance || ""
  );
  const [location, setLocation] = useState(
    savedSearch.location || "Kozhikode"
  );
  const [availability, setAvailability] = useState("all");
  const [maxDistance, setMaxDistance] = useState("5");
  const [message, setMessage] = useState("");
  useEffect(()=>{
    if(!message) return;
    const timer=setTimeout(()=>{
      setMessage("");
    },2000);
    return ()=>clearTimeout(timer);
  },[message]);

  const registeredUsers = readStorage("phygitalUsers", []);

  const registeredMechanics = registeredUsers
    .filter((user) => user.role === "mechanic")
    .map((user) => ({
      id: user.mechanicId || user.id,
      userId: user.id,
      name: user.name,
      category: user.category || "General Repair",
      skills:
        Array.isArray(user.skills) && user.skills.length
          ? user.skills
          : ["General Repair"],
      location: user.location || "Kozhikode",
      distance: Number(user.distance) || 2,
      experience: Number(user.experience) || 0,
      price: user.price || "Contact for estimate",
      rating: "New",
      available: user.available ?? true,
      description:
        user.description || "Registered local repair mechanic.",
    }));

  const mechanics = [...registeredMechanics, ...demoMechanics];

  const filteredMechanics = mechanics.filter((mechanic) => {
    const searchWords = `${problem} ${appliance}`
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 2);

    const mechanicText = [
      mechanic.name,
      mechanic.category,
      mechanic.description,
      ...mechanic.skills,
    ]
      .join(" ")
      .toLowerCase();

    const matchesProblem =
      searchWords.length === 0 ||
      searchWords.some((word) => mechanicText.includes(word));

    const matchesLocation =
      !location.trim() ||
      mechanic.location.toLowerCase().includes(location.toLowerCase());

    const matchesAvailability =
      availability === "all" ||
      (availability === "available" && mechanic.available) ||
      (availability === "busy" && !mechanic.available);

    const matchesDistance =
      mechanic.distance <= Number(maxDistance);

    return (
      matchesProblem &&
      matchesLocation &&
      matchesAvailability &&
      matchesDistance
    );
  });

  function sendEnquiry(mechanic) {
    if (!currentUser || currentUser.role !== "customer") {
      setMessage("Please log in with your customer account first.");
      return;
    }

    if (!mechanic.userId) {
      setMessage(
        "This is a demo listing. Register a mechanic account to test connected enquiries."
      );
      return;
    }

    const enquiries = readStorage("phygitalEnquiries", []);

    const newEnquiry = {
      id: `PR-${Date.now()}`,
      mechanicId: mechanic.id,
      mechanicUserId: mechanic.userId || null,
      mechanicName: mechanic.name,
      customerId: currentUser.id,
      customerName: currentUser.name,
      appliance: appliance || mechanic.category,
      problem:
        problem.trim() || "General repair assistance requested",
      location: location.trim() || "Not specified",
      status: "Pending",
      createdAt: new Date().toLocaleString(),
    };

    enquiries.push(newEnquiry);

    localStorage.setItem(
      "phygitalEnquiries",
      JSON.stringify(enquiries)
    );

    setMessage(`Enquiry sent successfully to ${mechanic.name}!`);
  }

  return (
    <div className="nearby-page">
      <nav className="customer-nav">
        <div className="mechanic-brand">
          <div className="mechanic-brand-logo">
            <i className="bi bi-cpu-fill"></i>
          </div>
        <div>
        <div className="brand-name">
           Phygital </div>
           <small>REPAIR NETWORK</small>
        </div>
</div>
        <button
          className="nearby-back-button"
          onClick={() => navigate("/customer")}
        >
          <i className="bi bi-arrow-left"></i> Back to Home
        </button>
      </nav>

      <header className="nearby-header">
        <span className="eyebrow">LOCAL REPAIR NETWORK</span>
        <h1>Find the Right Mechanic</h1>
        <p>Discover local technicians for your repair problems.</p>
      </header>

      <section className="nearby-search-panel">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setMessage("");
          }}
        >
          <div className="nearby-search-fields">
            <div>
              <label htmlFor="repair-problem">Repair problem</label>
              <input
                id="repair-problem"
                value={problem}
                onChange={(event) => setProblem(event.target.value)}
                placeholder="e.g. Washing machine problem"
              />
            </div>

            <div>
              <label htmlFor="repair-appliance">Category</label>
              <select
                id="repair-appliance"
                value={appliance}
                onChange={(event) => setAppliance(event.target.value)}
              >
                <option value="">All categories</option>
                <option value="Washing Machine">Washing Machine</option>
                <option value="Refrigerator">Refrigerator</option>
                <option value="Mobile Phones">Mobile Phones</option>
                <option value="Electronics">Electronics</option>
                <option value="AC Repair">AC Repair</option>
                <option value="Electrical">Electrical</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Home Appliances">Home Appliances</option>
              </select>
            </div>

            <div>
              <label htmlFor="repair-location">Location</label>
              <input
                id="repair-location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Enter your town"
              />
            </div>

            <button className="nearby-search-button" type="submit">
              <i className="bi bi-search"></i> Search
            </button>
          </div>
        </form>

        <div className="nearby-filters">
          <div>
            <label htmlFor="availability-filter">Availability</label>
            <select
              id="availability-filter"
              value={availability}
              onChange={(event) => setAvailability(event.target.value)}
            >
              <option value="all">All mechanics</option>
              <option value="available">Available</option>
              <option value="busy">Busy</option>
            </select>
          </div>

          <div>
            <label htmlFor="distance-filter">Maximum distance</label>
            <select
              id="distance-filter"
              value={maxDistance}
              onChange={(event) => setMaxDistance(event.target.value)}
            >
              <option value="2">Within 2 km</option>
              <option value="3">Within 3 km</option>
              <option value="5">Within 5 km</option>
            </select>
          </div>
        </div>
      </section>

      {message && (
        <div className="nearby-message" role="status"
        style={{
          position:"fixed",
          top:"20px",right:"20px",zIndex:9999,backgroundColor:message.includes("Successfully")?
          "#198754":"#6f42c1",color:"white",padding:"16px 24px",
          borderRadius:"10px",boxShadow:"0 4px 15px rgba(0,0,0,0.2)",fontSize:"16px",
        }}>
          <i className="bi bi-check-circle-fill me-2"></i>
          {message}
        </div>
      )}

      <section className="nearby-results">
        <h2>Local Technicians</h2>
        <p>{filteredMechanics.length} matching listings</p>

        {filteredMechanics.length === 0 ? (
          <div className="nearby-empty">
            <h3>No matching mechanics found</h3>
            <p>Try a different category or location.</p>
          </div>
        ) : (
          <div className="mechanics-grid">
            {filteredMechanics.map((mechanic) => (
              <article
                className="mechanic-result-card"
                key={mechanic.id}
              >
                <div className="mechanic-card-top">
                  <div className="mechanic-avatar">
                    <i className="bi bi-person-gear"></i>
                  </div>

                  <span
                    className={
                      mechanic.available
                        ? "availability available"
                        : "availability busy"
                    }
                  >
                    {mechanic.available ? "Available" : "Busy"}
                  </span>
                </div>

                <h3>{mechanic.name}</h3>
                <p className="mechanic-category">{mechanic.category}</p>
                <p className="mechanic-description">
                  {mechanic.description}
                </p>

                <div className="mechanic-info">
                  <span>
                    <i className="bi bi-geo-alt"></i>{" "}
                    {mechanic.location} · {mechanic.distance} km
                  </span>
                  <span>
                    <i className="bi bi-briefcase"></i>{" "}
                    {mechanic.experience} years' experience
                  </span>
                  <span>
                    <i className="bi bi-star-fill"></i>{" "}
                    {mechanic.rating}
                  </span>
                </div>

                <div className="mechanic-skills">
                  {mechanic.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>

                <div className="mechanic-card-bottom">
                  <div>
                    <small>Estimated repair cost</small>
                    <strong>{mechanic.price}</strong>
                  </div>

                  <button
                    className="send-enquiry-button"
                    onClick={() => sendEnquiry(mechanic)}
                    disabled={!mechanic.available}
                  >
                    {!mechanic.available
                      ? "Currently Busy"
                      : mechanic.userId
                        ? "Send Enquiry"
                        : "Demo Listing"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default NearbyMechanics;