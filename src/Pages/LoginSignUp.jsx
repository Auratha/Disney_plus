import { useState } from "react";
import logo from "../assets/logo.png";

const LoginSignUp = () => {
  const [isLogin, setIsLogin] = useState(true);

  const changePage = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="h-screen bg-[#1b1b1f] flex justify-center items-center">
      <div className="w-[30%] xs:w-3/5 sm:w-[250px] md:w-[300px] flex flex-col items-center">
        <img src={logo} alt="disney+"></img>
        <h4 className="text-white text-xl">
          {isLogin === true ? "Login with your email" : "Sign Up"}
        </h4>
        <input
          className="w-full px-4 py-1 my-3 outline-none bg-gray-700 text-white"
          placeholder="Email"
          type="email"
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
        <button className="w-full px-2 py-1 bg-[#037AEB] text-white">
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
