import { useState } from "react";

function MechanicProfile() {
  const currentUser = JSON.parse(
    localStorage.getItem("phygitalCurrentUser") || "{}"
  );

  const users = JSON.parse(
    localStorage.getItem("phygitalUsers") || "[]"
  );

  const savedUser = users.find((user) => user.id === currentUser.id);

  const [name, setName] = useState(
    savedUser?.name || currentUser.name || "Mechanic User"
  );
  const [skills, setSkills] = useState(
    savedUser?.skills?.join(", ") || "Washing machines, Refrigerators"
  );
  const [experience, setExperience] = useState(
    String(savedUser?.experience ?? 3)
  );
  const [available, setAvailable] = useState(
    savedUser?.available ?? true
  );
  const [saved, setSaved] = useState(false);

  function saveProfile(e) {
    e.preventDefault();

    const updatedUsers = users.map((user) =>
      user.id === currentUser.id
        ? {
            ...user,
            name: name.trim(),
            skills: skills.split(",").map((skill) => skill.trim()).filter(Boolean),
            experience: Number(experience),
            available,
          }
        : user
    );

    localStorage.setItem(
      "phygitalUsers",
      JSON.stringify(updatedUsers)
    );

    const updatedCurrentUser = {
      ...currentUser,
      name: name.trim(),
    };

    localStorage.setItem(
      "phygitalCurrentUser",
      JSON.stringify(updatedCurrentUser)
    );

    setSaved(true);
  }

  return (
    <div className="hub">
      <span className="eyebrow">YOUR PROFESSIONAL IDENTITY</span>
      <h1 className="page-title">My mechanic profile</h1>
      <p className="muted">
        Manage your skills and service availability.
      </p>

      <section className="content-panel profile-panel">
        <div className="profile-header">
          <div className="profile-avatar">
            <i className="bi bi-person-gear"></i>
          </div>
          <div>
            <h2>{name}</h2>
            <p>Local repair technician</p>
            <span className={available ? "availability on" : "availability off"}>
              <span></span>
              {available ? "Available for enquiries" : "Currently unavailable"}
            </span>
          </div>
        </div>

        <form onSubmit={saveProfile}>
          <label className="field-label">Display name</label>
          <input
            className="form-control custom-input"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setSaved(false);
            }}
            required
          />

          <label className="field-label mt-3">Repair skills</label>
          <textarea
            className="form-control custom-input"
            rows="3"
            value={skills}
            onChange={(e) => {
              setSkills(e.target.value);
              setSaved(false);
            }}
            required
          />

          <label className="field-label mt-3">Years of experience</label>
          <input
            type="number"
            min="0"
            className="form-control custom-input"
            value={experience}
            onChange={(e) => {
              setExperience(e.target.value);
              setSaved(false);
            }}
            required
          />

          <label className="availability-toggle mt-4">
            <input
              type="checkbox"
              checked={available}
              onChange={(e) => {
                setAvailable(e.target.checked);
                setSaved(false);
              }}
            />
            Available to receive repair enquiries
          </label>

          <button className="btn-primary-custom mt-4" type="submit">
            Save profile
          </button>

          {saved && (
            <div className="notice-box mt-3">
              Profile updated successfully.
            </div>
          )}
        </form>
      </section>
    </div>
  );
}

export default MechanicProfile;