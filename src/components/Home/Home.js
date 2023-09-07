import React, { useState, useEffect } from "react";
import "./Home.scss";
import { useSelector } from "react-redux";
import {
  useGetBalanceQuery,
  useGetBannerQuery,
  useGetProfileQuery,
  useGetServicesQuery,
} from "../../redux/reducer/homeQuery";
import { formatRupiah } from "../../features/formatter";
import Header from "../Header/Header";
import defaultProfile from "../../images/Profile Photo.png";

function HomePage() {
  const { token } = useSelector((state) => state.auth);
  const { data: users } = useGetProfileQuery(token);
  const { data: services } = useGetServicesQuery(token);
  const { data: banner } = useGetBannerQuery(token);
  const { data: balance } = useGetBalanceQuery(token);
  console.log(users?.data?.profile_image);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      // Geser slider otomatis ke kanan
      if (currentIndex === banner?.data?.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }, 3000); // Ganti gambar setiap 3 detik (sesuaikan dengan kebutuhan Anda)

    return () => {
      clearInterval(slideInterval);
    };
  }, [currentIndex, banner]);

  return (
    <div>
      <Header />
      <div className="homepage">
        <div className="profile-section">
          <div className="profile-left">
            <img src={users?.data?.profile_image ? `${users?.data?.profile_image}` : defaultProfile} alt="Profile" />
            <p>Selamat Datang, </p>
            <h3>{`${users?.data ? users?.data?.first_name : ""} ${
              users?.data ? users?.data?.last_name : ""
            }`}</h3>
          </div>
          <div className="profile-right">
            <p>Saldo Anda</p>
            <h3 className="balance-amount">
              {balance?.data ? formatRupiah(balance?.data?.balance) : "0"}
            </h3>
            <h4>Lihat Saldo</h4>
          </div>
        </div>
        <div className="services-section">
          {services?.data?.map((e) => (
            <div className="service-card">
              <img src={e.service_icon} alt="icon" />
              <p>{e.service_name}</p>
            </div>
          ))}
        </div>
        <div className="slider-section">
          {banner?.data?.map((e, index) => (
            <div
              key={index}
              style={{ transform: `translateX(${index - currentIndex}0%)` }}
            >
              <img src={e.banner_image} alt="banner" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
