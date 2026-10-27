import { useState } from "react";

const courses = [
  {
    icon: "bi bi-lightning-charge-fill",
    category: "ELECTRICAL",
    title: "Electrical Diagnostics Fundamentals",
    description: "Learn safe testing methods and common electrical faults.",
    duration: "25 min",
    level: "Beginner",
    color: "purple",
  },
  {
    icon: "bi bi-moisture",
    category: "HOME APPLIANCES",
    title: "Washing Machine Troubleshooting",
    description: "Understand drainage, motor and sensor problems.",
    duration: "40 min",
    level: "Intermediate",
    color: "blue",
  },
  {
    icon: "bi bi-cpu-fill",
    category: "SMART ELECTRONICS",
    title: "Understanding Circuit Boards",
    description: "Explore components, circuit diagrams and fault isolation.",
    duration: "35 min",
    level: "Intermediate",
    color: "orange",
  },
];

function PhygitalHub() {
  const [tab, setTab] = useState("All");
  const [showDiagnostic, setShowDiagnostic] = useState(false);
  const [problem, setProblem] = useState("");
  const [appliance, setAppliance] = useState("Washing machine");
  const [notice, setNotice] = useState("");

  const filteredCourses = courses.filter((course) => {
    if (tab === "All") return true;
    return course.category === tab;
  });

  function startDiagnostic(e) {
    e.preventDefault();
    if (!problem.trim()) {
      setNotice("Please describe the appliance problem first.");
      return;
    }

    setNotice(
      "Demo assessment ready for " + appliance +
      ". Follow the safety checklist before inspecting the appliance. " +
      "This prototype does not identify actual component failures."
    );
  }

  return (
    <div className="hub">
      <section className="welcome-row">
        <div>
          <span className="eyebrow">YOUR SKILLS. YOUR FUTURE.</span>
          <h1>Welcome to your <span>Phygital Hub.</span></h1>
          <p>
            Learn new technologies, sharpen your repair skills,
            and grow your local repair business.
          </p>
        </div>

        <div className="welcome-badge">
          <i className="bi bi-patch-check-fill"></i>
          <div>
            <strong>Skill development</strong>
            <small>One repair at a time</small>
          </div>
        </div>
      </section>

      <section className="hero-panel">
        <div className="hero-content">
          <span className="hero-pill">
            <i className="bi bi-stars"></i> THE FUTURE OF REPAIR
          </span>
          <h2>Repair smarter.<br />Learn faster.</h2>
          <p>
            Your gateway to digital diagnostics, interactive learning
            and the next generation of repair technology.
          </p>

          <button
            className="btn-primary-custom"
            onClick={() => {
              setShowDiagnostic(!showDiagnostic);
              setNotice("");
            }}
          >
            <i className="bi bi-camera-video"></i>
            Explore diagnostics
          </button>
        </div>

        <div className="hero-visual">
          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>
          <div className="tech-circle">
            <i className="bi bi-cpu"></i>
          </div>
          <div className="floating-chip chip-one">
            <i className="bi bi-eye"></i> AR ASSIST
          </div>
          <div className="floating-chip chip-two">
            <i className="bi bi-mortarboard"></i> LEARN
          </div>
          <div className="floating-chip chip-three">
            <i className="bi bi-tools"></i> DIAGNOSE
          </div>
        </div>
      </section>

      {showDiagnostic && (
        <section className="content-panel diagnostic-panel">
          <div className="section-heading">
            <div>
              <span className="eyebrow">DIAGNOSTIC WORKSPACE</span>
              <h2>Start an appliance assessment</h2>
            </div>
            <button className="icon-button" onClick={() => {
              setShowDiagnostic(false);
              setNotice("");
            }}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          <p className="muted">
            This is a guided demo. Real AR component detection requires
            a validated diagnostic engine and appliance-specific data.
          </p>

          <form onSubmit={startDiagnostic}>
            <label className="field-label">Appliance type</label>
            <select
              className="form-select custom-input"
              value={appliance}
              onChange={(e) => setAppliance(e.target.value)}
            >
              <option>Washing machine</option>
              <option>Refrigerator</option>
              <option>Air conditioner</option>
              <option>Television</option>
              <option>Microwave oven</option>
            </select>

            <label className="field-label mt-3">
              Describe the fault
            </label>
            <textarea
              className="form-control custom-input"
              rows="3"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="Example: washing machine stops during the spin cycle..."
            />

            <button className="btn-primary-custom mt-3" type="submit">
              Prepare assessment
            </button>
          </form>

          {notice && <div className="notice-box mt-3">{notice}</div>}
        </section>
      )}

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon purple"><i className="bi bi-book"></i></div>
          <div><strong>12</strong><span>Demo learning resources</span></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue"><i className="bi bi-patch-check"></i></div>
          <div><strong>3</strong><span>Sample skill badges</span></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><i className="bi bi-graph-up-arrow"></i></div>
          <div><strong>Level 1</strong><span>Your learning journey</span></div>
        </div>
      </section>

      <section className="content-panel">
        <div className="section-heading">
          <div>
            <span className="eyebrow">KEEP GROWING</span>
            <h2>Continue learning</h2>
          </div>
          <button className="text-link" onClick={() => setTab("All")}>
            View all <i className="bi bi-arrow-right"></i>
          </button>
        </div>

        <div className="filter-tabs">
          {["All", "ELECTRICAL", "HOME APPLIANCES", "SMART ELECTRONICS"].map(
            (item) => (
              <button
                key={item}
                className={tab === item ? "filter-tab selected" : "filter-tab"}
                onClick={() => setTab(item)}
              >
                {item === "All" ? "All courses" : item}
              </button>
            )
          )}
        </div>

        <div className="course-grid">
          {filteredCourses.map((course) => (
            <article className="course-card" key={course.title}>
              <div className={`course-icon ${course.color}`}>
                <i className={course.icon}></i>
              </div>
              <span className="course-category">{course.category}</span>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="course-meta">
                <span><i className="bi bi-clock"></i> {course.duration}</span>
                <span>{course.level}</span>
              </div>
              <button
                className="course-action"
                onClick={() => setNotice(
                  `Demo lesson selected: ${course.title}. Full lesson content can be added next.`
                )}
              >
                Explore lesson <i className="bi bi-arrow-up-right"></i>
              </button>
            </article>
          ))}
        </div>

        {notice && !showDiagnostic && (
          <div className="notice-box mt-3">{notice}</div>
        )}
      </section>

      <section className="content-panel">
        <div className="section-heading">
          <div>
            <span className="eyebrow">RECOGNISE YOUR SKILLS</span>
            <h2>Micro-credentials</h2>
          </div>
        </div>

        <div className="credential-grid">
          <div className="credential-card">
            <i className="bi bi-award"></i>
            <div><strong>Electrical Safety</strong><small>Sample badge · Demo</small></div>
            <span className="credential-status">Preview</span>
          </div>
          <div className="credential-card">
            <i className="bi bi-tools"></i>
            <div><strong>Appliance Basics</strong><small>Sample badge · Demo</small></div>
            <span className="credential-status">Preview</span>
          </div>
          <div className="credential-card locked">
            <i className="bi bi-cpu"></i>
            <div><strong>Smart Diagnostics</strong><small>Advanced learning</small></div>
            <span className="credential-status">Pro</span>
          </div>
        </div>
        <p className="muted small mt-3">
          Demo credentials are illustrative and are not accredited certificates.
          Official credentials require an assessment and an appropriate issuer.
        </p>
      </section>

      <section className="content-panel" id="plans">
        <div className="section-heading">
          <div>
            <span className="eyebrow">GROW YOUR BUSINESS</span>
            <h2>Choose your learning plan</h2>
            <p className="muted">Upgrade when you need more professional tools.</p>
          </div>
        </div>

        <div className="plan-grid">
          <div className="plan-card">
            <span className="plan-label">GET STARTED</span>
            <h3>Basic</h3>
            <div className="plan-price">Free</div>
            <p>For technicians exploring digital learning.</p>
            <ul>
              <li>Selected learning materials</li>
              <li>Repair marketplace access</li>
              <li>Basic technician profile</li>
            </ul>
            <button className="plan-button secondary" onClick={() =>
              setNotice("You are viewing the Basic demo plan.")
            }>Current demo plan</button>
          </div>

          <div className="plan-card featured-plan">
            <span className="popular-tag">POPULAR</span>
            <span className="plan-label">FOR PROFESSIONALS</span>
            <h3>Pro</h3>
            <div className="plan-price">₹499 <small>/ month*</small></div>
            <p>For technicians ready to build advanced skills.</p>
            <ul>
              <li>Full learning library</li>
              <li>Advanced guided diagnostics</li>
              <li>Expanded skill assessments</li>
              <li>Business insights</li>
            </ul>
            <button className="plan-button" onClick={() =>
              setNotice("Pro subscription is a demo. Payment integration is not enabled.")
            }>Explore Pro</button>
          </div>

          <div className="plan-card">
            <span className="plan-label">FOR TEAMS</span>
            <h3>Enterprise</h3>
            <div className="plan-price">Custom</div>
            <p>For repair businesses and service networks.</p>
            <ul>
              <li>Team learning dashboard</li>
              <li>Shared training resources</li>
              <li>Expanded usage allowances</li>
            </ul>
            <button className="plan-button secondary" onClick={() =>
              setNotice("Enterprise enquiries can be connected to a contact form.")
            }>Learn more</button>
          </div>
        </div>

        <p className="muted small mt-3">
          *Illustrative price only, not a live offer. Payments and subscription
          enforcement will be connected later.
        </p>
      </section>

      <footer className="hub-footer">
        <span>PHYGITAL REPAIR NETWORK</span>
        <span>Empowering local technicians through technology.</span>
      </footer>
    </div>
  );
}

export default PhygitalHub;