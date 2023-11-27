import React from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import "./About.css";
const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

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

    const res = await fetch("http://localhost:8080/note/updatenote/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    const data = await res.text();
    console.log(data);

    navigate("/");
  };

  useEffect(() => {
    const loadCar = async () => {
      fetch("http://localhost:8080/note/getallnotesId/" + id)
        .then((response) => response.json())

        .then((response) => {
          console.log("Printing note data", response);
          setNote(response);
        });
    };
    loadCar();
  }, []);

  return (
    <>
      <center>
        <div class="backcolor">
          <h1>Edit Your Note</h1>
          <br />
          <br />
          <div class="container isolateback">
            <div class="row backgrnd" style={{ width: 400 }}>
              <div class="col-md-4" style={{ width: 500 }}>
                <div class="main">
                  <div class="service1">
                    <div class="service-logo">
                      <img
                        src="https://fadzrinmadu.github.io/hosted-assets/website-design-service-section/icon-apple.png"
                        alt="normal_pic"
                      />
                    </div>
                    <h4>
                      EditNote{" "}
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
                        <label class="label col-md-2 control-label">
                          Title
                        </label>
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
                        <label class="label col-md-2 control-label">
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
                            value="submit"
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
      </center>
    </>
  );
};
export default EditNote;
