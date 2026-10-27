import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_EMAIL = "athirapradeep0112@gmail.com";
const ADMIN_PASSWORD = "athira@2023";

function Login() {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState("customer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  useEffect(()=>{
    setEmail("");
    setPassword("");
    setName("");
    setMessage("");
  },[]);

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    // Admin login
    if (
      !isRegister &&
      normalizedEmail === ADMIN_EMAIL.trim().toLowerCase()
    ) {
      if (password === ADMIN_PASSWORD) {
        const admin = {
          name: "Administrator",
          email: normalizedEmail,
          role: "admin",
        };

        localStorage.setItem(
          "phygitalCurrentUser",
          JSON.stringify(admin)
        );

        navigate("/admin");
      } else {
        setMessage("Incorrect administrator credentials.");
      }
      return;
    }

    // Registration
    if (isRegister) {
      if (!name.trim()) {
        setMessage("Please enter your name.");
        return;
      }

      if (normalizedEmail === ADMIN_EMAIL.toLowerCase()) {
        setMessage(
          "This email is reserved for the administrator."
        );
        return;
      }

      const users = JSON.parse(
        localStorage.getItem("phygitalUsers") || "[]"
      );

      if (
        users.some((user) => user.email === normalizedEmail)
      ) {
        setMessage(
          "This email is already registered. Please log in."
        );
        return;
      }

      const newUser = {
        id: `USER-${Date.now()}`,
        name: name.trim(),
        email: normalizedEmail,
        password,
        role,
        ...(role === "mechanic"
          ? {
              mechanicId: `MECH-${Date.now()}`,
              skills: [],
              location: "Kozhikode",
              experience: 0,
              available: true,
            }
          : {}),
      };

      users.push(newUser);

      localStorage.setItem(
        "phygitalUsers",
        JSON.stringify(users)
      );

      setMessage(
        "Registration successful! You can now log in."
      );
      setIsRegister(false);
      setPassword("");
      return;
    }

    // Normal customer/mechanic login
    const users = JSON.parse(
      localStorage.getItem("phygitalUsers") || "[]"
    );

    const foundUser = users.find(
      (user) =>
        user.email === normalizedEmail &&
        user.password === password
    );

    if (!foundUser) {
      setMessage(
        "Account not found or password is incorrect."
      );
      return;
    }

    localStorage.setItem(
      "phygitalCurrentUser",
      JSON.stringify({
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
      })
    );
//clear the login input fields
setEmail("");
setPassword("");
setName("");
setMessage("");
    if (foundUser.role === "mechanic") {
      navigate("/mechanic");
    } else {
      navigate("/customer");
    }
  }

  return (
    <div className="auth-page">

      {/* Left-side Phygital branding */}
      <section className="auth-brand-panel">

        <div className="auth-brand-logo">
          <div className="brand-icon">
            <i className="bi bi-cpu-fill"></i>
          </div>

          <div className="auth-brand-text">
            <span>Phygital</span>
            <small>REPAIR NETWORK</small>
          </div>
        </div>

        <div className="auth-brand-content">
          <span className="auth-eyebrow">
            SUPPORT LOCAL TECHNICIANS
          </span>

          <h1>
            Repair smarter.
            <br />
            <span>Connect locally.</span>
          </h1>

          <p>
            Find trusted local repair professionals,
            discover services near you, and give your
            appliances a second life with Phygital Repair.
          </p>

          <div className="auth-feature">
            <i className="bi bi-search"></i>
            <span>Discover nearby repair professionals</span>
          </div>

          <div className="auth-feature">
            <i className="bi bi-geo-alt"></i>
            <span>Find repair services in your location</span>
          </div>

          <div className="auth-feature">
            <i className="bi bi-people"></i>
            <span>Support skilled local technicians</span>
          </div>
        </div>

        <p className="auth-brand-footer">
          Connecting communities, one repair at a time.
        </p>

      </section>

      {/* Right-side login and registration */}
      <section className="auth-form-panel">

        <form
          className="login-card auth-card"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <h1>
            {isRegister ? "Create Account" : "Welcome Back"}
          </h1>

          <p>
            {isRegister
              ? "Join the Phygital Repair Network"
              : "Sign in to your Phygital account"}
          </p>

          {isRegister && (
            <>
              <label>Full name</label>
              <input
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Enter your full name"
                required
              />

              <label>Register as</label>
              <select
                value={role}
                onChange={(event) =>
                  setRole(event.target.value)
                }
              >
                <option value="customer">Customer</option>
                <option value="mechanic">Mechanic</option>
              </select>
            </>
          )}

          <label>Email address</label>
          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="Enter your email"
            autoComplete="off"
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Enter your password"
            autoComplete="new-password"
            required
          />

          {message && (
            <p className="login-message">{message}</p>
          )}

          <button
            type="submit"
            className="login-submit"
          >
            {isRegister ? "Create Account" : "Login"}
          </button>

          <p className="login-switch">
            {isRegister
              ? "Already have an account?"
              : "Don't have an account?"}{" "}

            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setEmail("");
                setPassword("");
                setName("");
                setMessage("");
              }}
            >
              {isRegister ? "Login" : "Register"}
            </button>
          </p>
        </form>

      </section>
    </div>
  );
}

export default Login;