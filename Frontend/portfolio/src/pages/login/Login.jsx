import "./login.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  

  useEffect(() => {
    const signedIn = localStorage.getItem("access_token")
  }, []);

  const login = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/login`, {
        email: email,
        password: password,
      });
      localStorage.setItem("access_token", response.data);
      navigate('/home')
      Swal.fire({
        title: "Success!",
        text: "login successfully",
        icon: "success",
        confirmButtonText: "Close",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Error to login",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    login();
    setEmail("");
    setPassword("");
  }

  return (
    <div className="container-login">
      <div className="login">
        <div className="login-inside">
          <h1>Login</h1>
          <span>
            Don't have account? <a href="/register">Register</a>
          </span>
          <form className="form" action="POST" onSubmit={handleSubmit}>
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
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};
