import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Success");
  };
  return (
    <Fragment>
      <section className="bg-img-login">
        <div className="dark-overlay">
          <form onSubmit={(e) => onSubmit(e)} className="login-container form">
            <div className="form-in">
              <h1 className="large">Login</h1>

              <div style={{ fontSize: "44px" }}>
                <i className="fa fa-user-circle-o"></i>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                  title="This site uses Gravatar, so if you want a profile image,use a Gravatar email"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              <input type="submit" value="Login" className="btn" />
              <p className="my-.5">
                <br />
                Don't have an account? <Link to="/register">Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </Fragment>
  );
};

export default Login;
