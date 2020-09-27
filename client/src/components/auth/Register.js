import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
//import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    password2: "",
  });

  const { name, email, mobile, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log("Password do not match");
    } else {
      /* Axios request example
      const newUser = {
        name,
        email,
        mobile,
        password,
      };

      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const body = JSON.stringify(newUser);

        const res = await axios.post("/api/users", body, config);
        console.log(res.data);
      } catch (err) {
        console.error(err.response.data);
      }

      */
    }
  };
  return (
    <Fragment>
      <section className="bgimg-4">
        <div className="dark-overlay">
          <div className="container">
            <h1 className="large">Sign Up</h1>
            <p className="lead">Create an Account</p>
            <div style={{ fontSize: "44px" }}>
              <i className="fa fa-user-plus"></i>
            </div>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={name}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  title="This site uses Gravatar, so if you want a profile image,use a Gravatar email"
                  name="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  placeholder="Mobile"
                  name="mobile"
                  value={mobile}
                  onChange={(e) => onChange(e)}
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
                  minLength="6"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={password2}
                  onChange={(e) => onChange(e)}
                  required
                  minLength="6"
                />
              </div>
              <input type="submit" value="Register" className="btn" />
            </form>
            <p className="my-.5">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Register;
