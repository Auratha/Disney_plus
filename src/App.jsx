import { Routes, Route } from "react-router-dom";
import LoginSignUp from "./Pages/LoginSignUp";
import Home from "./Pages/Home";
import Series from "./Pages/Series";
import Navbar from "./components/Navbar";
import ShowDetail from "./Pages/ShowDetail";
import Movie from "./Pages/Movie";
import Footer from "./components/Footer";
import Page404 from "./components/Page404";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loginActive, setLoginActive] = useState(
    JSON.parse(localStorage.getItem("loginActive")) || false
  );

  useEffect(() => {
    if (!loginActive) {
      navigate("/Disney_plus/login");
    }
  }, [loginActive]);

  return (
    <div className="font-indie">
      {location.pathname !== "/Disney_plus/login" && <Navbar />}
      <Routes>
        <Route path="/Disney_plus/" element={<Home />} />
        <Route
          path="/Disney_plus/login"
          element={<LoginSignUp handleLoginActive={setLoginActive} />}
        ></Route>
        <Route path="/Disney_plus/series" element={<Series />}></Route>
        <Route path="/Disney_plus/movies" element={<Movie />}></Route>
        <Route
          path="/Disney_plus/show/:type/:id"
          element={<ShowDetail />}
        ></Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
      {location.pathname !== "/Disney_plus/login" &&
        location.pathname !== "/Disney_plus/" && <Footer />}
    </div>
  );
}

export default App;
