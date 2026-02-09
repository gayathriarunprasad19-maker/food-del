import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLogin }) => {

  const { setToken, url, loadCartData } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Sign Up");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  // ✅ Handle input change
  const onChangeHandler = (e) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ✅ Login / Signup handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const endpoint =
        currState === "Login"
          ? "/api/user/login"
          : "/api/user/register";

      const response = await axios.post(url + endpoint, data);

      // 🔍 Debug (keep for now)
      console.log("Auth response:", response.data);

      // ✅ Accept token-based success (safer)
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);

        // load cart if exists
        loadCartData({ token: response.data.token });

        // close popup
        setShowLogin(false);

        toast.success(
          currState === "Login"
            ? "Logged in successfully"
            : "Account created successfully"
        );
      } else {
        toast.error(response.data.message || "Something went wrong");
      }

    } catch (error) {
      console.error(error);
      toast.error("Server error. Please try again.");
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={onSubmitHandler}>

        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            src={assets.cross_icon}
            alt="close"
            onClick={() => setShowLogin(false)}
          />
        </div>

        <div className="login-popup-inputs">

          {currState === "Sign Up" && (
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />
        </div>

        <button type="submit">
          {currState === "Login" ? "Login" : "Create account"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>
            By continuing, I agree to the terms of use & privacy policy.
          </p>
        </div>

        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>
              Login here
            </span>
          </p>
        )}

      </form>
    </div>
  );
};

export default LoginPopup;

