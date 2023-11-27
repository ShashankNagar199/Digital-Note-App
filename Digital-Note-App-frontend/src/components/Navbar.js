import React from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../Context/UserContext";
import { useContext } from "react";
const Navbar = () => {
  const authCtx = useContext(UserContext);
  const isloggedIn = authCtx.isLoggedIn;
  console.log(isloggedIn);
  const RenderMenu = () => {
    if (isloggedIn) {
      return (
        <>
          <li className="nav-item active">
            <NavLink className="nav-link" to="/">
              <i class="fab fa-github"></i>&nbsp;
              <i className="fab fa-instagram"></i>&nbsp;
              <i class="fab fa-facebook"></i>&nbsp;
            </NavLink>
          </li>
          <li className="nav-item active">
            <NavLink className="nav-link" to="/">
              <i class="fas fa-home"></i>
              <span style={{ fontWeight: "bold" }}>&nbsp;Home</span>{" "}
              <span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/about">
              <i class="fas fa-user"></i>
              <span style={{ fontWeight: "bold" }}>&nbsp;About</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/logout">
              <i class="fas fa-sign-in-alt"></i>
              <span style={{ fontWeight: "bold" }}>&nbsp;Logout</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/contact">
              <i class="fas fa-sign-in-alt"></i>
              <span style={{ fontWeight: "bold" }}>&nbsp;Contact</span>
            </NavLink>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item active">
            <NavLink className="nav-link" to="/">
              <i className="fab fa-github"></i>&nbsp;
              <i className="fab fa-instagram"></i>&nbsp;
              <i className="fab fa-facebook"></i>&nbsp;
            </NavLink>
          </li>
          <li className="nav-item active">
            <NavLink className="nav-link" to="/">
              <i className="fas fa-home"></i>
              <span style={{ fontWeight: "bold" }}>&nbsp;Home</span>{" "}
              <span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/about">
              <i className="fas fa-user"></i>
              <span style={{ fontWeight: "bold" }}>&nbsp;About</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/signin">
              <i className="fas fa-sign-in-alt"></i>
              <span style={{ fontWeight: "bold" }}>&nbsp;Login</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/signup">
              <i className="fas fa-sign-in-alt"></i>
              <span style={{ fontWeight: "bold" }}>&nbsp;Signup</span>
            </NavLink>
          </li>
        </>
      );
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          DigiNotesApp <i class="fa-solid fa-book-open"></i>
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <RenderMenu />
          </ul>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
