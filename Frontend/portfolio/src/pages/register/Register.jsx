import { useState } from "react";
import "./register.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    try {
      await axios.post(`http://localhost:3000/register`, {
        username: username,
        email: email,
        password: password,
      });
      Swal.fire({
        title: "Success!",
        text: "register successfully",
        icon: "success",
        confirmButtonText: "Close",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Error to register",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    register();
    setUsername("");
    setEmail("");
    setPassword("");
    navigate("/login");
  }

  return (
    <div className="container-register">
      <div className="register">
        <div className="register-inside">
          <h1>Create new account</h1>
          <span>
            Already have account? <a href="/login">Log in</a>
          </span>
          <form className="form" action="POST" onSubmit={handleSubmit}>
            <div className="containerUsername">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="containerEmail">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="containerPassword">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Created Account</button>
          </form>
        </div>
      </div>
    </div>
  );
};
