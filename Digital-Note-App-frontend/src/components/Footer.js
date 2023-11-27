import React from "react";
import { Link } from "react-router-dom";
export const Footer = () => {
  const date = new Date();
  return (
    <div>
      <footer class="footer-distributed">
        <div class="footer-left">
          <h3>
            Digi<span>NotesApp</span>
          </h3>

          <p className="footer-links">
            <Link to="/" class="link-1">
              {" "}
              Home |
            </Link>
            <Link to="/about" class="link-1">
              {" "}
              About |
            </Link>
            
          </p>

          <p className="footer-company-name">
            <b>DigiNotesApp ©</b> {date.getFullYear()}
          </p>
        </div>

        <div className="footer-center">
          <div>
            <i className="fa fa-map-marker"></i>
            <p>
              <span>Indrapuri C - Sector </span> Bhopal, MadhyaPradesh
            </p>
          </div>

          <div>
            <i className="fa fa-phone"></i>
            <p>+91 7225915441</p>
          </div>

          <div>
            <i className="fa fa-envelope"></i>
            <p>
              <a href="mailto:aspp9308@gmail.com">aspp9308@gmail.com</a>
            </p>
          </div>
        </div>

        <div className="footer-right">
          <p className="footer-company-about">
            <span>About the company</span>
            This Notes is simple and very easy to use . Notepad is very useful
            tool. This Notepad will help you in private and work and so on. If
            you Hurry,need to note something,you can use this Notepad quickly
            bacause this is simple. it is Simple and easy to use Notepad.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
