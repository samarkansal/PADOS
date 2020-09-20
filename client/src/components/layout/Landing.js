import React, { Fragment } from "react";

const Landing = () => {
  return (
    <Fragment>
      <section className="bgimg-1">
        <div className="dark-overlay">
          <div className="bgimg-inner">
            <h1 className="x-large">Need to send a Parcel?</h1>
          </div>
        </div>
      </section>
      <div className="desc1">
        <h2>Need groceries, food or pet supplies delivered?</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro debitis
          voluptas eveniet eum laborum vel neque, inventore repellendus magnam
          facere ullam quos. Perferendis quasi sed animi. Distinctio itaque ipsa
          mollitia.
        </p>
      </div>
      <section className="bgimg-2">
        <div className="dark-overlay">
          <div className="bgimg-inner">
            <h1 className="x-large">Driving in your car soon?</h1>
          </div>
        </div>
      </section>
      <div className="desc1">
        <h2>Let's make this your least expensive journey ever.</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem
          suscipit, modi, sequi dolorum veritatis quam illum culpa optio
          incidunt quasi omnis debitis, aperiam quod nesciunt. Animi delectus
          iusto ?
        </p>
        <button className="btn">Offer a Ride</button>
      </div>
      <section className="bgimg-3">
        <div className="dark-overlay">
          <div className="bgimg-inner">
            <h1 className="x-large">Want A Ride?</h1>
          </div>
        </div>
      </section>
      <div className="desc1">
        <h3>Go literally anywhere. From anywhere.</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, fuga?
          Sequi facilis ducimus provident, impedit amet eveniet voluptas quam
          delectus eius laudantium, incidunt, accusamus pariatur quos mollitia
          ipsa modi velit.
        </p>
        <button className="btn">Find a Ride</button>
      </div>
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
                Jawahar Nagar, Kapra Mandal Medchal District - 500 078
                Telangana, India
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
    </Fragment>
  );
};

export default Landing;
