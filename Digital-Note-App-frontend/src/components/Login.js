import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../Context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const authCtx = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    if (res.status === 400 || !data) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! ",
        footer: "Email or password is invalid ",
      });
    } else {
      authCtx.login(email);
      Swal.fire({
        icon: "success",
        title: "Success",
        type: "success",
        text: "Login Successfull ! ",
      }).then(() => {
        navigate("/");
      });
    }
  };

  return (
    <center>
      <div class="col-md-5">
        <div class="row">
          <center>
            <div class="col-md-6">
              <h3 class="text-left">Login With Us!</h3>
            </div>
          </center>
          <div class="col-md-6">
            <span class="glyphicon glyphicon-pencil"></span>
          </div>
        </div>
        <hr />

        <form method="POST" className="register-form" id="register-form">
          <div class="row">
            <label class="label col-md-2 control-label">Email</label>
            <div class="col-md-10">
              <input
                type="email"
                class="form-control"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Please enter email"
              />
            </div>
          </div>

          <div class="row">
            <label class="label col-md-2 control-label">Password</label>
            <div class="col-md-10">
              <input
                type="password"
                class="form-control"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Please enter password"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-md-10">
              <input
                type="submit"
                name="login"
                id="login"
                style={{width:300}}
                className="form-submit btn btn-primary"
                value="Login"
                onClick={loginUser}
              />
              
            </div>
          </div>
        </form>
      </div>
    </center>
  );
};
export default Login;
