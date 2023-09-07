import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import "./Login.scss";
import logo from "../../images/Logo.png";
import illustration from "../../images/Ilustrasi.png";
import { loginAction } from "../../redux/actions/auth";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const state = useSelector((state) => state.auth)
  console.log("error", state)
  const [showPassword, setShowPassword] = useState(false);
  const [body, setBody] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleInputChange = useCallback(
    (e) => {
      setBody({ ...body, [e.target.name]: e.target.value });
    },[body]
  )
    

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      if (!body.email || !body.password) {
          toast.error("Semua field harus diisi");
          return;
      }
      dispatch(loginAction(body))
      toast.success("Login Berhasil")
      navigate("/home")
      // if (state.isSuccess) {
      //   dispatch(loginAction(body))
      //   toast.success("Login Berhasil")
      //   navigate("/home")
      //   return
      // }
      // if (state.isError) {
      //   toast.error(`${state.error.message}`)
      //   return
      // }
    },[body, dispatch, navigate]
  )

  return (
    <div className="regist">
      <div className="registForm">
        <div className="logo">
          <img src={logo} alt="logo" />
          <h4>SIMS PPOB-ZAIN</h4>
        </div>
        <p className="title">Masuk atau buat akun untuk memulai</p>
        <form onSubmit={handleSubmit}>
          <div
            className={`input-container ${
              body.email ? "input-filled" : ""
            }`}
          >
            <FaEnvelope className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
            />
          </div>
          <div
            className={`input-container ${
              body.password ? "input-filled" : ""
            }`}
          >
            <FaLock className="icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
            />
            <div className="password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? (
                <FaEyeSlash className="icon" />
              ) : (
                <FaEye className="icon" />
              )}
            </div>
          </div>
          <button type="submit">Masuk</button>
        </form>
        <p className="text">
          belum punya akun? registrasi{" "}
          <span>
            <a href="/registration">di sini</a>
          </span>
        </p>
          </div>
          <div className="illustration">
              <img src={illustration} alt="" srcset="" />
          </div>
    </div>
  );
};

export default RegistrationForm;
