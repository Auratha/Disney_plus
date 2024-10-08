import homeIcon from "../assets/icons/home.svg";
import menuIcon from "../assets/icons/movie.png";
import tvIcon from "../assets/icons/tv.svg";
import avatar from "../assets/Avatar.png";
import logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const logOut = () => {
    localStorage.setItem("loginActive", false);
  };

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
                location.pathname === "/Disney_plus/"
                  ? "text-cyan-400"
                  : undefined
              }
            >
              <Link to="/Disney_plus/">Home</Link>
            </p>
          </div>
          <div className="flex space-x-2 cursor-pointer xs:hidden sm:hidden">
            <img src={menuIcon} alt="movie" />
            <p
              className={
                location.pathname === "/Disney_plus/movies"
                  ? "text-cyan-400"
                  : undefined
              }
            >
              <Link to="/Disney_plus/movies">Movies</Link>
            </p>
          </div>
          <div className="flex space-x-2 cursor-pointer xs:hidden sm:hidden">
            <img src={tvIcon} alt="series" />
            <p
              className={
                location.pathname === "/Disney_plus/series"
                  ? "text-cyan-400"
                  : undefined
              }
            >
              <Link to="/Disney_plus/series">Series</Link>
            </p>
          </div>
        </div>
        <div className="relative group">
          <img src={avatar} alt="avatar" className="w-10 avatar-img" />

          {/* Menu bar becomes visible on hover */}
          <div className="menu-bar px-4 py-2 bg-cyan-400 rounded-3xl absolute top-10 left-[50%] translate-x-[-50%] hidden group-hover:block">
            <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-cyan-400 absolute top-[-10px] left-[50%] translate-x-[-50%]"></div>
            <p className="cursor-pointer hover:text-black">
              <Link to="/Disney_plus/">Home</Link>
            </p>
            <p className="cursor-pointer hover:text-black">
              <Link to="/Disney_plus/movies">Movie</Link>
            </p>
            <p className="cursor-pointer hover:text-black">
              <Link to="/Disney_plus/series">Series</Link>
            </p>
            <p className="cursor-pointer hover:text-black" onClick={logOut}>
              <Link to="/Disney_plus/login">Logout</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
