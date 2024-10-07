import { Routes, Route } from "react-router-dom";
import LoginSignUp from "./Pages/LoginSignUp";
import Home from "./Pages/Home";
import Series from "./Pages/Series";
import Navbar from "./components/Navbar";
import ShowDetail from "./Pages/ShowDetail";
import Movie from "./Pages/Movie";
import Footer from "./components/Footer";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <div className="font-indie">
      {location.pathname !== "/login" && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginSignUp />}></Route>
        <Route path="/series" element={<Series />}></Route>
        <Route path="/movies" element={<Movie />}></Route>
        <Route path="/show/:type/:id" element={<ShowDetail />}></Route>
      </Routes>
      {location.pathname !== "/login" && location.pathname !== "/" && (
        <Footer />
      )}
    </div>
  );
}

export default App;
