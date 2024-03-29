import React, { useState } from "react";
import "./Register.css";
import user_icon from "../assets/person.png"
import email_icon from "../assets/email.png"
import password_icon from "../assets/password.png"
import close_icon from "../assets/close.png"

const Register = () => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");


  const gohome = ()=> {
    window.location.href = window.location.origin;
  }

  const register = async (e) => {
    e.preventDefault();

    let register_url = window.location.origin+"/djangoapp/registration";
    
    const res = await fetch(register_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "userName": userName,
            "password": password,
            "firstName":firstName,
            "lastName":lastName,
            "email":email
        }),
    });

    const json = await res.json();
    if (json.status) {
        sessionStorage.setItem('username', json.userName);
        window.location.href = window.location.origin;
    }
    else if (json.error === "Already Registered") {
      alert("The user with same username is already registered");
      window.location.href = window.location.origin;
    }
};

  return(
    <div>
      <nav class="navbar navbar-dark bg-dark" style={{height:"0.8in"}}>
        <div class="container-fluid justify-content-start">
          <a class="navbar-brand" style={{width:"1.5in"}}>Dealerships</a>
          <div class="navbar-expand flex-fill">
              <ul class="navbar-nav ">
                  <li class="nav-item">
                    <a class="nav-link" href="/">Home</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="/about">About Us</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="/contact">Contact Us</a>
                  </li>
              </ul>
          </div>
          <div class="navbar-expand" style={{paddingRight:"1in"}}>
            <ul class="navbar-nav loginlink" id="loginlogout">
            {/* {home_page_items} */}
            </ul>
          </div>
        </div>
      </nav>
      <div className="register_container" style={{width: "50%"}}>
        <div className="header" style={{display: "flex",flexDirection: "row", justifyContent: "space-between"}}>
            <span className="text" style={{flexGrow:"1"}}>SignUp</span> 
            <div style={{display: "flex",flexDirection: "row", justifySelf: "end", alignSelf: "start" }}>
            <a href="/" onClick={()=>{gohome()}} style={{justifyContent: "space-between", alignItems:"flex-end"}}>
              <img style={{width:"1cm"}} src={close_icon} alt="X"/>
            </a>
            </div>
            <hr/>
        </div>

        <form onSubmit={register}>
          <div className="inputs">
            <div className="input">
              <img src={user_icon} className="img_icon" alt='Username'/>
              <input type="text"  name="username" placeholder="Username" className="input_field" onChange={(e) => setUserName(e.target.value)}/>
            </div>
            <div>
              <img src={user_icon} className="img_icon" alt='First Name'/>
              <input type="text"  name="first_name" placeholder="First Name" className="input_field" onChange={(e) => setFirstName(e.target.value)}/>
            </div>

            <div>
              <img src={user_icon} className="img_icon" alt='Last Name'/>
              <input type="text"  name="last_name" placeholder="Last Name" className="input_field" onChange={(e) => setlastName(e.target.value)}/>
            </div>

            <div>
              <img src={email_icon} className="img_icon" alt='Email'/>
              <input type="email"  name="email" placeholder="email" className="input_field" onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className="input">
              <img src={password_icon} className="img_icon" alt='password'/>
              <input name="psw" type="password"  placeholder="Password" className="input_field" onChange={(e) => setPassword(e.target.value)}/>
            </div>

          </div>
          <div className="submit_panel">
            <input className="submit" type="submit" value="Register"/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register;