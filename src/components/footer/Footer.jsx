import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer ">
      <div className="foot-section grid grid-cols-1 gap-5 lg:flex">
        {/* Address Section */}
        <div className="footer-section">
          <h3 className="font-bold">ADDRESS:</h3>
          <p>123 San Juan Street</p>
          <p>Negros Oriental, Philippines</p>
          <p>Tel: 123-456-7890</p>
        </div>
        {/* Opening Hours Section */}
        <div className="footer-section">
          <h3 className="font-bold">OPENING HOURS:</h3>
          <p>Mon - Fri: 7am - 10pm</p>
          <p>Saturday: 8am - 10pm</p>
          <p>Sunday: 8am - 11pm</p>
        </div>
        {/* Logo and Contact Button */}
        <div className="footer-section text-center">
          <img
            src="logo.png"
            alt="Crumbly Cookies Logo"
            className="footer-logo mx-auto"
          />
          <Link to={'/contactus'}>
          <button className="contact-button mt-3">Contact Us</button>
          </Link>
        </div>
      </div>
      {/* Copyright Section */}
      <div className="footer-bottom">
        <p>© 2024 Crumbly Cookies – All Rights Reserved.</p>
        <p>
          <a href="/privacy-policy" className="footer-link">
            Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
