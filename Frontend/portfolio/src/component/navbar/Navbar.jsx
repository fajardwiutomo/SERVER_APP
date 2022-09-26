import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faBars } from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";
import { useState } from "react";

export const Navbar = () => {
  const [active,setActive] = useState(false)
  const handleMenu = () => {
    setActive(!active)
  }
  return (
    <div className="container">
      <div className="container-navbar">
        <div className="left-navbar">
          <div className="logo">
            <FontAwesomeIcon icon={faVideo} className="video" />
          </div>
          <div className="search">
            <input type="text" placeholder="Find movie" />
          </div>
        </div>
        <div className="right-navbar">
          <div className={!active ? "menu" : "menu-active"}>
            <a className="home" href="/home">
              Home
            </a>
            <a className="movie">Movie</a>
            <a className="contact">Contact Us</a>
          </div>
          <div className="log-in">
            <button className="sign-in">Sign In</button>
            <button className="sign-up">Sign Up</button>
          </div>
          <div className="bars">
            <FontAwesomeIcon icon={faBars} className="icon" 
            onClick={() => {
              handleMenu()
            }}/>
          </div>
        </div>
      </div>
    </div>
  );
};
