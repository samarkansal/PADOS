import React from "react";

const Footer = () => {
  return (
    <footer className="global-footer">
      <img className="pados-logo" alt="description of img" />
      <section className="footer-sep">
        <ul>
          <h4>Explore</h4>
          <li>
            <a href="/#">Home</a>
          </li>
          <li>
            <a href="/#">About</a>
          </li>
          <li>
            <a href="/#">Career</a>
          </li>
          <li>
            <a href="/#">FAQ's</a>
          </li>
        </ul>
        <ul>
          <h4>Visit</h4>
          <li>
            <a href="https://www.google.com/maps/place/Birla+Institute+of+Technology+%26+Science,+Pilani+-+Hyderabad/@17.5448501,78.569587,17z/data=!3m1!4b1!4m5!3m4!1s0x3bcb835ea819f7f7:0xf65eaaa5a110605f!8m2!3d17.5448501!4d78.5717757">
              Birla Institute of Technology & Science, Pilani Hyderabad Campus
              Jawahar Nagar, Kapra Mandal Medchal District - 500 078 Telangana,
              India
            </a>
          </li>
        </ul>
        <ul>
          <h4>New Business</h4>
          <li>
            <a href="/#">
              <i className="fa fa-envelope fa-fw"></i> sameerkansal27
            </a>
          </li>
          <li>
            <a href="/#">
              <i className="fa fa-mobile fa-fw"></i>+919812794534
            </a>
          </li>
        </ul>
        <ul>
          <h4>Follow</h4>
          <li>
            <a href="/#">
              <i className="fa fa-instagram fa-fw"></i>Instagram
            </a>
          </li>
          <li>
            <a href="/#">
              <i className="fa fa-facebook fa-fw"></i>Facebook
            </a>
          </li>
          <li>
            <a href="/#">
              <i className="fa fa-twitter fa-fw"></i>Twitter
            </a>
          </li>
        </ul>
        <ul>
          <h4>Legal</h4>
          <li>
            <a href="/#">Terms</a>
          </li>
          <li>
            <a href="/#">Privacy</a>
          </li>
        </ul>
      </section>
      <section className="footer-sep">
        <p>&#169 2020 PADOS. All Rights Reserved.</p>
      </section>
    </footer>
  );
};

export default Footer;
