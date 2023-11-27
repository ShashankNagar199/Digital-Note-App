import React, { useEffect, useState,useContext  } from "react";
import Swal from "sweetalert2";
import UserContext from "../Context/UserContext";
import {useNavigate } from "react-router";
const Contact = () => {
  
  const authCtx = useContext(UserContext);
  const navigate = useNavigate();
  const email = authCtx.token;
  if(email==null){
    navigate("/");
  }
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const userContact = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setUserData({
        ...userData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userContact();
  }, []);

  //we are storing data in states

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };
  //send the data to backened now

  const contactForm = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = userData;

    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });
    const data = await res.json();
    if (!data) {
      console.log("message not sent");
    } else {
      Swal.fire({
        icon: "success",
        title: "Success",
        type: "success",
        text: "Message has been sent !",
      });

      setUserData({ ...userData, message: "" });
    }
  };

  return (
    <div>
      <div class="container">
        <div class="row">
          <div class="col-md-7">
            <h3 class="text-left">Contact Us Here</h3>
          </div>

          <div class="col-md-6">
            <span class="glyphicon glyphicon-pencil"></span>
          </div>
        </div>
        <hr />

        <form method="POST" id="contact_form">
          <div class="row">
            <label class="label col-md-2 control-label">Name</label>
            <div class="col-md-10">
              <input
                type="email"
                class="form-control"
                name="name"
                id="name"
                value={userData.name}
                onChange={handleInputs}
                placeholder="Please enter name"
              />
            </div>
          </div>
          <div class="row">
            <label class="label col-md-2 control-label">Email</label>
            <div class="col-md-10">
              <input
                type="email"
                class="form-control"
                name="email"
                id="email"
                value={userData.email}
                onChange={handleInputs}
                placeholder="Please enter email"
              />
            </div>
          </div>
          <div class="row">
            <label class="label col-md-2 control-label">Phone</label>
            <div class="col-md-10">
              <input
                type="text"
                class="form-control"
                name="phone"
                id="phone"
                value={userData.phone}
                onChange={handleInputs}
                placeholder="Please enter phone"
              />
            </div>
          </div>
          <div class="row">
            <label class="label col-md-2 control-label">Query</label>
            <div class="col-md-10">
              <textarea
                class="form-control"
                name="message"
                value={userData.message}
                onChange={handleInputs}
                id="query"
                rows="4"
                width="30"
              />
            </div>
          </div>
          <div class="row">
            <center>
              <div class="col-md-10">
                <input
                  type="submit"
                  className="form-submit btn btn-primary"
                  value="send"
                  onClick={contactForm}
                />
                 
              </div>
            </center>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Contact;
