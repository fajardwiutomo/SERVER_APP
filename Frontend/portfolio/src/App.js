import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./auth/Auth";
import { useEffect } from "react";
import { Detail } from "./pages/detail/Detail";

function App() {

  const signedIn = localStorage.getItem("access_token") ? true : false


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Auth signedIn={signedIn}/>}>
            <Route path="/home" element={<Home />} exact/>
          </Route>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/detail" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
