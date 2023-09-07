import React, { useCallback, useEffect, useState } from "react";
import "./Transaction.scss";
import { useSelector } from "react-redux";
import {
  useGetBalanceQuery,
  useGetProfileQuery,
  useGetServicesQuery,
} from "../../redux/reducer/homeQuery";
import { formatRupiah } from "../../features/formatter";
import Header from "../Header/Header";
import defaultProfile from "../../images/Profile Photo.png";
import {
  useTopupMutation,
  useTransactionMutation,
} from "../../redux/reducer/transactionQuery";
import { toast } from "react-toastify";

function Transaction() {
  const { token } = useSelector((state) => state.auth);
  const { data: users } = useGetProfileQuery(token);
  const { data: balance, refetch } = useGetBalanceQuery(token);
  const { data: services } = useGetServicesQuery(token);
  const [transaction, { isSuccess: isSuccessTopup, error, isError }] =
    useTransactionMutation(token);

  const [selectedAmount, setSelectedAmount] = useState("40000");
  const [selectedService, setSelectedService] = useState("PAJAK");

  console.log("data", selectedAmount);

  const handleOptionClick = (tariff, servicess) => {
    setSelectedAmount(tariff);
    setSelectedService(servicess);
  };

  const handleInputChange = useCallback((e) => {
    if (!e.target.value) {
      setSelectedAmount(0);
      return;
    }
    setSelectedAmount(parseInt(e.target.value));
    // console.log("yuhu", typeof selectedAmount);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      //   console.log("tarif", selectedAmount);
      transaction({ data: { service_code: selectedService }, token });
    },
    [selectedService, token, transaction]
  );

  useEffect(() => {
    if (isSuccessTopup) {
      toast.success("Pembayaran Berhasil");
      refetch();
    }
  }, [isSuccessTopup, refetch]);

  return (
    <div>
      <Header />
      <div className="topup">
        <div className="profile-section">
          <div className="profile-left">
            <img
              src={
                users?.data?.profile_image
                  ? `${users?.data?.profile_image}`
                  : defaultProfile
              }
              alt="Profile"
            />
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
        <div className="topup-title">
          <h4>Pembayaran</h4>
        </div>
        <div className="topup-options">
          {services?.data?.map((e, index) => (
            <div
              key={index}
              className={`services-card ${
                e.service_code === selectedService ? "active" : ""
              }`}
              onClick={() =>
                handleOptionClick(e.service_tariff, e.service_code)
              }
            >
              <img src={e.service_icon} alt="" />
              <p>{e.service_name}</p>
            </div>
          ))}
        </div>
        <div className="topup-section">
          <div className="topup-form">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="top_up_amount"
                value={selectedAmount}
                onChange={handleInputChange}
                disabled
              />
              <button type="submit">Bayar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transaction;
