import { useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const LoginSignUp = ({ handleLoginActive }) => {
  const [isLogin, setIsLogin] = useState(true); // check login page or signup page
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || []
  );
  const navigate = useNavigate();

  const saveUserData = () => {
    setUserData([...userData, email]);
    localStorage.setItem("userData", JSON.stringify(userData));
    setIsLogin(true);
  };

  const checkUserAndLogin = () => {
    if (userData.includes(email)) {
      navigate("/Disney_plus/");
      handleLoginActive(true);
      JSON.stringify(localStorage.setItem("loginActive", true));
    }
  };

  const continueButton = () => {
    if (isLogin === true) {
      checkUserAndLogin();
    } else {
      saveUserData();
    }
  };

  const changePage = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="h-screen bg-[#1b1b1f] flex justify-center items-center">
      <div className="w-[350px] xs:w-3/5 sm:w-[250px] md:w-[300px] flex flex-col items-center">
        <img src={logo} alt="disney+"></img>
        <h4 className="text-white text-xl">
          {isLogin === true ? "Login with your email" : "Sign Up"}
        </h4>
        <input
          className="w-full px-4 py-1 my-3 outline-none bg-gray-700 text-white"
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {isLogin === false && (
          <div className="text-white mb-4">
            <input type="checkbox" className="mr-2" />
            <label className="text-xs">
              Yes! I want to receive updates, special offers, and other
              information from Disney+ and the Walt Disney Company Family.
            </label>
          </div>
        )}
        <button
          className="w-full px-2 py-1 bg-[#037AEB] text-white"
          onClick={continueButton}
        >
          Continue
        </button>
        <p className="text-gray-500 text-sm mt-2 ">
          {isLogin === true
            ? "First time on Disney+?"
            : "Already Have Disney+ Account?"}
          <span
            className="text-white text-sm cursor-pointer"
            onClick={changePage}
          >
            {" "}
            {isLogin === true ? "Subscribe" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginSignUp;
