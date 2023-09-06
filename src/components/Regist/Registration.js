import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FaEnvelope,
  FaUserAlt,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import "./Registration.scss";
import logo from "../../images/Logo.png";
import illustration from "../../images/Ilustrasi.png";
import { useRegisterMutation } from "../../redux/reducer/authQuery";
import { useNavigate } from "react-router-dom";



const RegistrationForm = () => {
  const [register, { error, isError, isSuccess }] = useRegisterMutation()
  const [body, setBody] =  useState({})
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate()

  const handleInputChange = useCallback(
    (e) => {
      setBody({ ...body, [e.target.name]: e.target.value });
    },[body]
  )

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   if (!email || !first_name || !last_name || !password || !confirmPassword) {
  //     dispatch(setError("Semua field harus diisi."));
  //     toast.error("Semua field harus diisi");
  //     return;
  //   }

  //   if (password !== confirmPassword) { // Memeriksa apakah password dan konfirmasi password tidak sama
  //     dispatch(setError("Password dan konfirmasi password tidak cocok."));
  //     toast.error("Password dan konfirmasi password tidak cocok");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       "https://take-home-test-api.nutech-integrasi.app/registration",
  //       { email, first_name, last_name, password }
  //     );

  //     toast.success("Registrasi berhasil.");
  //     console.log("Registrasi berhasil:", response.data);
  //     window.location.href = '/';
      
  //   } catch (err) {
  //     dispatch(setError("Registrasi gagal. Coba lagi nanti."));
  //     toast.error(`${err.response.data.message}`);
  //     console.error("Registrasi error:", err);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = body
    console.log("data=>",data.email)
    // if (!data.email || !data.password || !data.first_name || !data.last_name || !data.confirmPassword) {
    //   toast.error("isiii")
    //   return
    // }
    
    // if (data.password !== data.confirmPassword) {
    //   toast.error("Password dan konfirmasi password tidak cocok");
    //   return;
    // }
    delete data.confirmPassword
    register(data)
  }

  useEffect(() => {
    if (isError) {
      console.log("error", error.message)
      toast.error(error.message)
    }
  },[isError, error])

  useEffect(() => {
    if (isSuccess) {
      toast.success("register berhasil")
      navigate("/")
    }
  },[isSuccess, navigate])


  return (
    <div className="regist">
      <div className="registForm">
        <div className="logo">
          <img src={logo} alt="logo" />
          <h4>SIMS PPOB-ZAIN</h4>
        </div>
        <p className="title">Lengkapi data untuk membuat akun</p>
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
              placeholder="masukan email anda"
              onChange={handleInputChange}
            />
          </div>
          <div
            className={`input-container ${
              body.first_name ? "input-filled" : ""
            }`}
          >
            <FaUserAlt className="icon" />
            <input
              type="text"
              name="first_name"
              placeholder="nama depan"
              onChange={handleInputChange}
            />
          </div>
          <div
            className={`input-container ${
              body.last_name ? "input-filled" : ""
            }`}
          >
            <FaUserAlt className="icon" />
            <input
              type="text"
              name="last_name"
              placeholder="nama belakang"
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
              placeholder="buat password"
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
          <div
            className={`input-container ${
              body.password ? "input-filled" : ""
            }`}
          >
            <FaLock className="icon" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="konfirmasi password"
              onChange={handleInputChange}
            />
            <div className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? (
                <FaEyeSlash className="icon" />
              ) : (
                <FaEye className="icon" />
              )}
            </div>
          </div>
          <button type="submit">Registrasi</button>
        </form>
        <p className="text">
          sudah punya akun? login{" "}
          <span>
            <a href="/">di sini</a>
          </span>
        </p>
          </div>
          <div className="illustration">
              <img src={illustration} alt="ilustrasi" />
          </div>
    </div>
  );
};

export default RegistrationForm;
