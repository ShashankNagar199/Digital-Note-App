import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {  useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.css";
import UserContext from "../Context/UserContext";
import "./About.css";
import Swal from "sweetalert2";
const Home = () => {
  const authCtx = useContext(UserContext);
  const navigate = useNavigate();
  const email = authCtx.token;
  if (email === null) {
    navigate("/signin");
  }
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const [note1, setNote1] = useState([]);

  useEffect(() => {
    const showAllNotes = () => {
      fetch("http://localhost:8080/note/getallnotes/" + email)
        .then((response) => response.json())

        .then((response) => {
          console.log("Printing notes data", response);
          setNote1(response);
        });
    };
    showAllNotes();
  }, [note1]);

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setNote({ ...note, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { title, content } = note;
    const res = await fetch("http://localhost:8080/note/save/" + email, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      console.log("Note creation failed");
    } else {
		 Swal.fire({
        icon: "success",
        text: "Note Added",
     });
      console.log("Note creation Successfull");
    }
  };
  ////////////////////////Delete Handler////////////////

  const DeleteHandler = async (e) => {
    const note_id = e.target.value;

    const res = await fetch(
      "http://localhost:8080/note/deletenote/" + note_id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      return response.text();
    });
  };
  //////////////////////////////////////////////////
  return (
    <>
      <div class="backcolor">
        <h1>Notes App</h1>
        <div class="container isolateback">
          <br />
          <br />
          <br />
          <div class="row backgrnd">
            <div class="col-md-4">
              <div class="main">
                <div class="service1">
                  <div class="service-logo">
                    <img
                      src="https://fadzrinmadu.github.io/hosted-assets/website-design-service-section/icon-apple.png"
                      alt="normal_pic"
                    />
                  </div>
                  <h4>
                    Add Note{" "}
                    <i
                      class="fa-solid fa-soft-serve"
                      style={{ color: "black" }}
                    ></i>
                  </h4>

                  <form
                    method="POST"
                    className="register-form"
                    id="register-form"
                  >
                    <div class="row">
                      <label class="label col-md-2 control-label"  style={{color:"grey"}}>Title</label>
                      <div class="col-md-10">
                        <input
                          type="text"
                          class="form-control"
                          name="title"
                          id="title"
                          placeholder="Please enter Title"
                          value={note.title}
                          onChange={handleInputs}
                        />
                      </div>
                    </div>

                    <div class="row">
                      <label class="label col-md-2 control-label" style={{color:"grey"}}>
                        Content
                      </label>
                      <div class="col-md-10">
                        <textarea
                          class="form-control"
                          name="content"
                          id="query"
                          rows="4"
                          width="30"
                          placeholder="Enter content"
                          value={note.content}
                          onChange={handleInputs}
                        />
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-10">
                        <input
                          type="submit"
                          name="submit"
                          id="submit"
                          className="form-submit btn btn-primary btn-sm"
                          value="Add Note"
                          onClick={postData}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        {note1.map((notess) => (
          <div class="col-md-3">
            <div class="container isolateback">
              <div class="row backgrnd">
                <div class="col-md-4">
                  <div class="main " style={{ width: 300 }}>
                    <div class="service" style={{ width: 300 }}>
                      <div class="service-logo">
                        <img
                          src="https://fadzrinmadu.github.io/hosted-assets/website-design-service-section/icon-apple.png"
                          alt="normal_pic"
                        />
                      </div>
                     
                      <h4>{notess.title}</h4>
                      <div class="notesDetails">
                      <p>
                        <textarea value={notess.content} rows="4"
                          width="30" class="txtarea" contenteditable="false"></textarea></p>
                      </div>
                      <p>
                        <button
                          class="btn btn-danger btn-sm"
                          type="submit"
                          id="delbutt"
                          onClick={DeleteHandler}
                          value={notess.id}
                        >
                          Delete
                        </button>
                        &nbsp;&nbsp;
                        <Link
                          class="btn btn-warning"
                          id="linkbtn"
                          style={{ color: "black", width: 60 }}
                          to={`/editnote/${notess.id}`}
                        >
                          Edit{" "}
                        </Link>
                      </p>
                      <i class="bi bi-trash"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br /> <br />
          </div>
        ))}
      </div>
    </>
  );
};
export default Home;
