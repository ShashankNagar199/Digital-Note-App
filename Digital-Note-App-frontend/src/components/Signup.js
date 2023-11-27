import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Signup = () => {
  const navigate = useNavigate();
  let [cnt, setCnt] = useState(0);
  const [error, setError] = useState({});
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const validateInfo = (name, email, phone, work, password) => {
    if (name === "") {
      error.name = "username cannot be Empty";
      cnt = cnt + 1;
    }
    if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) {
      error.email = "please enter valid email";
      cnt = cnt + 1;
    }
    if (phone === "" || phone.length != 10) {
      error.phone = "Phone number should be 10 digit";
      cnt = cnt + 1;
    }
    if (password.length < 8) {
      error.password = "password should be atleast 8 digits";
      cnt = cnt + 1;
    }
    return error;
  };

  const postData = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;

    setError(validateInfo(name, email, phone, work, password));
    setCnt(cnt);
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      }),
    });
    const data = await res.json();
    console.log(res);
    if (res.status === 422 || !data) {
      Swal.fire({
        title: "Registration Failed",
        type: "error",
        text: "Either user Already exists or password not matching!",
      });
      console.log("Invalid registrations");
    }
    else if(res.status===401){
      Swal.fire({
        title: "Registration Failed",
        type: "error",
        text: "fill each field with valid details!",
      });
      console.log("Invalid registrations");

    } else {
      Swal.fire({
        icon: "success",
        title: "Success",
        type: "success",
        text: "Registration has been done !",
      }).then(() => {
        navigate("/signin");
      });
    }
  };



  return (
    <div>
      <br />
      <br />
      <div class="container">
        <div class="row">
          <div class="col-md-7">
            <div class="row">
              <center>
                <div class="col-md-6">
                  <h3 class="text-left">Register Here</h3>
                </div>
              </center>
              <div class="col-md-8">
                <span class="glyphicon glyphicon-pencil"></span>
              </div>
            </div>
            <hr />
            <form method="POST" className="register-form" id="register-form"  >
              <div class="row">
                <label class="label col-md-2 control-label">Name</label>
                <div class="col-md-10">
                  <input
                    type="text"
                    class="form-control"
                    name="name"
                    id="name"
                    autoComplete="off"
                    value={user.name}
                    onChange={handleInputs}
                    placeholder="Please enter name"
                  />
                </div>
                <p style={{ color: "red" }}>{error.name}</p>
              </div>

              <div class="row">
                <label class="label col-md-2 control-label">Email</label>
                <div class="col-md-10">
                  <input
                    type="email"
                    class="form-control"
                    name="email"
                    id="email"
                    autoComplete="off"
                    value={user.email}
                    onChange={handleInputs}
                    placeholder="Please enter email"
                  />
                </div>
                <p style={{ color: "red" }}>{error.email}</p>
              </div>
              <div class="row">
                <label class="label col-md-2 control-label">Phone</label>
                <div class="col-md-10">
                  <input
                    type="text"
                    class="form-control"
                    name="phone"
                    id="phone"
                    autoComplete="off"
                    value={user.phone}
                    onChange={handleInputs}
                    placeholder="Please enter phone"
                  />
                </div>
                <p style={{ color: "red" }}>{error.phone}</p>
              </div>

              <div class="row">
                <label class="label col-md-2 control-label">Role</label>
                <div class="col-md-10">
                  <input
                    type="text"
                    class="form-control"
                    name="work"
                    id="work"
                    autoComplete="off"
                    value={user.work}
                    onChange={handleInputs}
                    placeholder="Please enter your occupation"
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
                    autoComplete="off"
                    value={user.password}
                    onChange={handleInputs}
                    placeholder="Please enter password"
                  />
                </div>
                <p style={{ color: "red" }}>{error.password}</p>
              </div>

              <div class="row">
                <label class="label col-md-2 control-label">
                  Re-enter Pass
                </label>
                <div class="col-md-10">
                  <input
                    type="password"
                    class="form-control"
                    name="cpassword"
                    id="cpassword"
                    autoComplete="off"
                    value={user.cpassword}
                    onChange={handleInputs}
                    placeholder="Please enter password"
                  />
                </div>
                <p style={{ color: "red" }}>{error.password}</p>
              </div>

              <div class="row">
                <center>
                  <div class="col-md-10">
                    <input
                      type="submit"
                      name="signup"
                      id="signup"
                      style={{width:300}}
                      className="form-submit btn btn-primary"
                      value="register"
                      onClick={postData}
                    />
                    
                  </div>
                </center>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
