function LoginApp() {
  return (
    <div className="login-shell">
      <div className="login-grain" />

      <main className="login-layout">
        <section className="login-hero">
          <div className="login-hero-overlay" />
          <div className="login-hero-orb" />

          <div className="login-hero-content">
            <div className="login-logo-wrap">
              <span
                className="material-symbols-outlined login-logo-icon"
                style={{ fontVariationSettings: "'FILL' 1" }}
                aria-hidden="true"
              >
                medical_services
              </span>
            </div>
            <h1>AIM Pediatric Therapy</h1>
            <p>
              Dedicated to nurturing potential and empowering growth in every
              child.
            </p>
            <div className="login-hero-meta">
              <div />
              <span>Serving Brampton and Mississauga</span>
            </div>
          </div>
        </section>

        <section className="login-panel-side">
          <div className="login-panel">
            <div className="login-panel-bar" />

            <div className="login-panel-body">
              <div className="login-copy">
                <h2>Welcome Back</h2>
                <p>Please enter your credentials to access the portal.</p>
              </div>

              <form className="login-form">
                <label className="field">
                  <span>Email Address</span>
                  <input type="email" placeholder="email@aimpediatric.com" />
                </label>

                <label className="field">
                  <span>Password</span>
                  <input type="password" placeholder="********" />
                </label>

                <div className="login-row">
                  <label className="remember">
                    <input type="checkbox" />
                    <span>Remember Me</span>
                  </label>
                  <a href="#">Forgot Password?</a>
                </div>

                <div className="login-actions">
                  <button type="submit" className="sign-in">
                    Sign In
                  </button>

                  <div className="divider">
                    <span />
                    <small>or</small>
                    <span />
                  </div>

                  <button type="button" className="create-account">
                    Create Account
                  </button>
                </div>
              </form>

              <div className="login-support">
                <p>
                  Need assistance? <a href="#">Contact Support</a>
                </p>
              </div>
            </div>
          </div>

          <div className="login-mobile-note">
            <p>
              Precision in Pediatric Care. Trusted Globally.
              <br />
              © 2024 AIM Pediatric Therapy. All Rights Reserved.
            </p>
          </div>
        </section>
      </main>

      <footer className="login-footer">
        <div className="login-footer-brand">
          <span>AIM Pediatric Therapy</span>
          <small>© 2024 AIM Pediatric Therapy. Precision in Pediatric Care.</small>
        </div>
        <div className="login-footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Security</a>
        </div>
      </footer>
    </div>
  );
}

export default LoginApp;
