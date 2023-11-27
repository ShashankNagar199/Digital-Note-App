import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/owner.css';
import nodejs1 from '../images/nodejs1.jpg';
import react from '../images/react.jpg';
import springboot from '../images/springboot.jpg';
import adminpic from '../images/admin.jpg';
import userpic from '../images/user.jpg';
const About = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setUserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/signin");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <div>
      <br/>
    <center>
    <div class="whitediv">
      <div class="headerdiv">
         <h2 style={{color:"skyblue"}}>NotesApp user</h2>

      </div>
           <div class="person-image">
            <img style={{borderRadius:70}} src={userpic} alt="" />
          </div>
          <br/>
        <div class="foggydiv">
           UserName:  <h3 style={{color:"black"}}>{userData.name}</h3><br/>
           userRole:  <h3 style={{color:"black"}}>{userData.work}</h3>
 
        </div>
    </div>
    </center>

<section class="section-team">
		<div class="container">
	
			<div class="row justify-content-center text-center">
				<div class="col-md-8 col-lg-6">
					<div class="header-section">
						<h3 style={{color:"white"}} class="small-title">Our Experts</h3>
						<h2 style={{color:"white"}}class="title">Let's meet Admin with technologies used</h2>
					</div>
				</div>
			</div>
			
			<div class="row">
			
				<div class="col-sm-6 col-lg-4 col-xl-3">
					<div class="single-person">
						<div class="person-image">
							<img src={adminpic} alt="" />
							<span class="icon">
								<i class="fab fa-react"></i>
							</span>
						</div>
						<div class="person-info">
							<h3 style={{color:"grey"}} class="full-name">Amit Kumar Pandey</h3>
							<span class="speciality">Full stack Developer</span>
						</div>
					</div>
				</div>
			
				<div class="col-sm-6 col-lg-4 col-xl-3">
					<div class="single-person">
						<div class="person-image">
							<img src={springboot} alt="" />
							<span class="icon">
								<i class="fab fa-spring"></i>
							</span>
						</div>
						<div class="person-info">
							<h3  style={{color:"grey"}} class="full-name">Technology Used</h3>
							<span class="speciality">Spring Boot</span>
						</div>
					</div>
				</div>
				
				<div class="col-sm-6 col-lg-4 col-xl-3">
					<div class="single-person">
						<div class="person-image">
							<img src={react} alt="" />
							<span class="icon">
								<i class="fab fa-react"></i>
							</span>
						</div>
						<div class="person-info">
							<h3  style={{color:"grey"}} class="full-name">Technology Used</h3>
							<span class="speciality">React Js</span>
						</div>
					</div>
				</div>
			
				<div class="col-sm-6 col-lg-4 col-xl-3">
					<div class="single-person">
						<div class="person-image">
							<img src={nodejs1} alt="" />
							<span class="icon">
								<i class="fab fa-js"></i>
							</span>
						</div>
						<div class="person-info">
							<h3  style={{color:"grey"}} class="full-name">Technology Used</h3>
							<span class="speciality">Node Js</span>
						</div>
					</div>
				</div>
			
			</div>
		</div>
	</section>
    
    </div>
  );
};
export default About;
