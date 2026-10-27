import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomerHome() {
  const navigate = useNavigate();
  
  const [location, setLocation] = useState("Kozhikode");
  const [appliance, setAppliance] = useState("Washing machine");
  const [message, setMessage] = useState("");

  function findMechanics(e) {
    e.preventDefault();

    if ( !location.trim()) {
      setMessage("Enter your location.");
      return;
    }

    sessionStorage.setItem(
      "phygitalRepairSearch",
      JSON.stringify({ location, appliance })
    );

    navigate("/customer/mechanics");
  }

  return (
    <div className="customer-page">
      <nav className="customer-nav">
        <div className="brand">
          <div className="brand-icon">
            <i className="bi bi-cpu-fill"></i>
          </div>
          <div>
            <h4>Phygital</h4>
            <small>REPAIR NETWORK</small>
          </div>
        </div>

        <button
          className="text-link"
          onClick={() => navigate("/login")}
        >
          Sign out
        </button>
      </nav>

      <section className="customer-hero">
        <span className="eyebrow">LOCAL REPAIR. MADE SIMPLE.</span>
        <h1>What's wrong with<br />your appliance?</h1>
        <p>
          Tell us the problem and discover repair professionals
          near your home.
        </p>

        <form className="customer-search" onSubmit={findMechanics}>
          <label className="field-label">Appliance</label>
          <select
            className="form-select custom-input"
            value={appliance}
            onChange={(e) => setAppliance(e.target.value)}
          >
            <option>Washing machine</option>
            <option>Refrigerator</option>
            <option>Air conditioner</option>
            <option>Television</option>
            <option>Mobile phone</option>
            <option>Microwave oven</option>
            <option>Plumbing</option>
            <option>Electrical repair</option>
          </select>

          

          <label className="field-label mt-3">Your location</label>
          <div className="location-input">
            <i className="bi bi-geo-alt"></i>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your area or town"
              required
            />
          </div>

          {message && <div className="notice-box mt-3">{message}</div>}

          <button className="btn-primary-custom w-100 mt-4" type="submit">
            Find nearby mechanics
            <i className="bi bi-arrow-right ms-2"></i>
          </button>
        </form>
      </section>

      <section className="customer-benefits">
        <div>
          <i className="bi bi-geo-alt"></i>
          <h3>Nearby professionals</h3>
          <p>Discover technicians serving your area.</p>
        </div>
        <div>
          <i className="bi bi-tools"></i>
          <h3>Skill-based matching</h3>
          <p>Find mechanics who handle your appliance.</p>
        </div>
        <div>
          <i className="bi bi-mortarboard"></i>
          <h3>Smarter repairs</h3>
          <p>Support technicians who keep learning.</p>
        </div>
      </section>
    </div>
  );
}

export default CustomerHome;