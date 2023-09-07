import React, { useCallback, useEffect, useState } from "react";
import "./Topup.scss";
import { useSelector } from "react-redux";
import {
  useGetBalanceQuery,
  useGetProfileQuery,
} from "../../redux/reducer/homeQuery";
import { formatRupiah } from "../../features/formatter";
import Header from "../Header/Header";
import defaultProfile from "../../images/Profile Photo.png";
import { useTopupMutation } from "../../redux/reducer/transactionQuery";
import { toast } from "react-toastify";

function Topup() {
  const { token } = useSelector((state) => state.auth);
  const { data: users } = useGetProfileQuery(token);
  const { data: balance, refetch } = useGetBalanceQuery(token);
  const [topup, { isSuccess:isSuccessTopup, error, isError }] = useTopupMutation(token);

  const [selectedAmount, setSelectedAmount] = useState(""); // State untuk jumlah yang dipilih

  const handleOptionClick = (amount) => {
      setSelectedAmount(amount);
      console.log("yuhu", selectedAmount);
  };

  const handleInputChange = useCallback(
      (e) => {
          if (!e.target.value) {
              setSelectedAmount(0)
              return
          }
          setSelectedAmount(parseInt(e.target.value))
      // console.log("yuhu", typeof selectedAmount);
    },
    []
  );

  const handleSubmit = useCallback(
    (e) => {
          e.preventDefault();
          console.log("amount",selectedAmount)
      topup({ data:{top_up_amount:selectedAmount}, token });
    },
    [selectedAmount, token, topup]
    );
    
    useEffect(() => {
        if (isSuccessTopup) {
            toast.success("Top Up Berhasil")
           refetch()
       } 
    },[isSuccessTopup, refetch])

  return (
    <div>
      <Header />
      <div className="topup">
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
        <div className="topup-title">
          <h4>Silahkan masukan</h4>
          <h2>Nominal Top Up</h2>
        </div>
        <div className="topup-section">
          <div className="topup-form">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="top_up_amount"
                value={selectedAmount}
                onChange={handleInputChange}
                placeholder="masukan nominal Top up"
              />
              <button type="submit">Top Up</button>
            </form>
          </div>
          <div className="topup-options">
            {[10000, 20000, 50000, 100000, 250000, 500000].map((amount) => (
              <button
                key={amount}
                className={amount === selectedAmount ? "active" : ""}
                onClick={() => handleOptionClick(amount)}
              >
                {formatRupiah(amount)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topup;
