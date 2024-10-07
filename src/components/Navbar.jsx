import homeIcon from "../assets/icons/home.svg";
import menuIcon from "../assets/icons/movie.png";
import tvIcon from "../assets/icons/tv.svg";
import avatar from "../assets/Avatar.png";
import logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="w-full bg-gradient-to-b from-gray-900 to-transparent py-4 absolute top-0 left-0 z-10">
      <div className="flex justify-between items-center px-10 text-white">
        <div className="flex items-center space-x-12 font-bold ">
          <div>
            <img src={logo} className="w-24 xs:w-32" alt="logo" />
          </div>
          <div className="flex space-x-2 cursor-pointer xs:hidden sm:hidden">
            <img src={homeIcon} alt="home" />
            <p
              className={
                location.pathname === "/" ? "text-cyan-400" : undefined
              }
            >
              <Link to="/">Home</Link>
            </p>
          </div>
          <div className="flex space-x-2 cursor-pointer xs:hidden sm:hidden">
            <img src={menuIcon} alt="movie" />
            <p
              className={
                location.pathname === "/movies" ? "text-cyan-400" : undefined
              }
            >
              <Link to="/movies">Movies</Link>
            </p>
          </div>
          <div className="flex space-x-2 cursor-pointer xs:hidden sm:hidden">
            <img src={tvIcon} alt="series" />
            <p
              className={
                location.pathname === "/series" ? "text-cyan-400" : undefined
              }
            >
              <Link to="/series">Series</Link>
            </p>
          </div>
        </div>
        <div>
          <img src={avatar} alt="avatar" className="w-10" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
