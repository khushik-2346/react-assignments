import { useState, useEffect } from "react";
import "./AuthSystem.css";

// Helper function to simulate a Base64-encoded JWT Token (Header.Payload.Signature)
function generateSimulatedJWT(username) {
  const header = { alg: "HS256", typ: "JWT" };
  const payload = {
    sub: username,
    role: "Full-Stack Developer",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour validity
  };

  const encode = (obj) =>
    btoa(unescape(encodeURIComponent(JSON.stringify(obj))))
      .replace(/=+$/, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

  const encodedHeader = encode(header);
  const encodedPayload = encode(payload);
  const simulatedSignature = btoa(`${encodedHeader}.${encodedPayload}.secretKey123`)
    .slice(0, 24)
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${encodedHeader}.${encodedPayload}.${simulatedSignature}`;
}

// Password strength evaluator returning score, label, and bar color
function calculatePasswordStrength(password) {
  if (!password) return { score: 0, label: "None", color: "#334155", width: "0%" };

  let score = 0;
  if (password.length >= 6) score += 1;
  if (password.length >= 10) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 2) {
    return { score, label: "Weak", color: "#f87171", width: "33%" };
  } else if (score <= 4) {
    return { score, label: "Medium", color: "#fbbf24", width: "66%" };
  } else {
    return { score, label: "Strong", color: "#34d399", width: "100%" };
  }
}

export default function AuthSystem() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Check localStorage on mount for persistent sessions ("Remember User")
  useEffect(() => {
    const savedToken = localStorage.getItem("jwt_token");
    const savedUser = localStorage.getItem("auth_user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const strength = calculatePasswordStrength(password);

  const validate = () => {
    const newErrors = {};
    if (!username.trim()) {
      newErrors.username = "Username is required.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 4) {
      newErrors.password = "Password must be at least 4 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const generatedToken = generateSimulatedJWT(username.trim());
    const userData = {
      username: username.trim(),
      loginTime: new Date().toLocaleTimeString(),
      remembered: rememberMe,
    };

    setToken(generatedToken);
    setUser(userData);

    // Persist to localStorage if Remember User is checked
    if (rememberMe) {
      localStorage.setItem("jwt_token", generatedToken);
      localStorage.setItem("auth_user", JSON.stringify(userData));
    } else {
      sessionStorage.setItem("jwt_token", generatedToken);
      sessionStorage.setItem("auth_user", JSON.stringify(userData));
    }

    // Reset inputs
    setUsername("");
    setPassword("");
    setErrors({});
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("auth_user");
    sessionStorage.removeItem("jwt_token");
    sessionStorage.removeItem("auth_user");
  };

  return (
    <div className="auth-app">
      <header className="auth-header">
        <h1>Authentication & Security Gateway</h1>
        <p>Token-based authentication, validation, and session persistence</p>
      </header>

      {/* RENDER PROTECTED DASHBOARD IF LOGGED IN */}
      {user && token ? (
        <div className="dashboard-card">
          <div className="dashboard-top">
            <div className="user-badge">
              <div className="user-avatar">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 style={{ fontSize: "1.2rem", color: "#f8fafc", margin: 0 }}>
                  Welcome back, {user.username}!
                </h3>
                <span style={{ fontSize: "0.82rem", color: "#94a3b8" }}>
                  Active Session logged in at {user.loginTime}
                </span>
              </div>
            </div>

            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <h4 style={{ color: "#34d399", marginBottom: "0.4rem" }}>
              ✓ Protected Dashboard Access Granted
            </h4>
            <p style={{ fontSize: "0.9rem", color: "#94a3b8" }}>
              This route is protected by a simulated JSON Web Token. Refreshing this
              tab will maintain your authentication state if you checked &quot;Remember User&quot;.
            </p>
          </div>

          {/* JWT Token Inspector */}
          <div className="jwt-inspector">
            <div className="jwt-inspector-title">
              <span>🔑 Simulated JWT Bearer Token</span>
            </div>
            <div className="jwt-token-display">{token}</div>
            <div className="storage-status">
              <div className="status-dot"></div>
              <span>
                Storage Engine:{" "}
                <strong>{user.remembered ? "localStorage (Persistent)" : "sessionStorage (Session Only)"}</strong>
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* RENDER LOGIN FORM IF NOT AUTHENTICATED */
        <div className="auth-card">
          <h2>Account Login</h2>

          <form onSubmit={handleLogin}>
            {/* Username Field */}
            <div className="form-field">
              <label htmlFor="username">Username *</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && (
                <span className="input-error">{errors.username}</span>
              )}
            </div>

            {/* Password Field */}
            <div className="form-field">
              <label htmlFor="password">Password *</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <span className="input-error">{errors.password}</span>
              )}

              {/* Password Strength Indicator */}
              {password && (
                <div className="strength-box">
                  <div className="strength-text">
                    <span style={{ color: "#94a3b8" }}>Strength:</span>
                    <span style={{ color: strength.color }}>{strength.label}</span>
                  </div>
                  <div className="strength-bar-bg">
                    <div
                      className="strength-bar-fill"
                      style={{
                        width: strength.width,
                        backgroundColor: strength.color,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Remember User Checkbox */}
            <label className="remember-row">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember User (persist across refresh)</span>
            </label>

            {/* Submit Button */}
            <button type="submit" className="btn-auth-submit">
              Sign In
            </button>
          </form>
        </div>
      )}
    </div>
  );
}