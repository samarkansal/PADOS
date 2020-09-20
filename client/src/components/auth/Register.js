import React, { Fragment } from "react";

const Register = () => {
  return (
    <Fragment>
      <section className="bgimg-4">
        <div className="dark-overlay">
          <div className="container">
            <h1 className="large">Sign Up</h1>
            <p className="lead">Create an Account</p>
            <div style={{ "font-size": "44px" }}>
              <i className="fa fa-user-plus"></i>
            </div>
            <form action="dashboard.html" className="form">
              <div className="form-group">
                <input type="text" placeholder="Name" required />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  title="This site uses Gravatar, so if you want a profile image,use a Gravatar email"
                  required
                />
              </div>
              <div className="form-group">
                <input type="tel" placeholder="Mobile" required />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  minlength="6"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  minlength="6"
                />
              </div>
              <input type="submit" value="Register" className="btn" />
            </form>
            <p className="my-.5">
              Already have an account? <a href="login.html">Sign In</a>
            </p>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Register;
