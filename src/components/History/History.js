import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetBalanceQuery,
  useGetProfileQuery,
} from "../../redux/reducer/homeQuery";
import { formatDateTime, formatRupiah } from "../../features/formatter";
import Header from "../Header/Header";
import defaultProfile from "../../images/Profile Photo.png";
import { toast } from "react-toastify";
import "./History.scss";
import { useGetHistoryQuery } from "../../redux/reducer/transactionQuery";

function History() {
  const { token } = useSelector((state) => state.auth);
  const { data: users } = useGetProfileQuery(token);
  const { data: balance } = useGetBalanceQuery(token);
  const [limit, setLimit] = useState(5)
  const { data: history, refetch } = useGetHistoryQuery({
    token,
    offset: 0,
    limit: limit,
  });
    console.log("history nih", history);
    
    const handleShowMoreClick = useCallback(
        () => {
            setLimit(limit + 2);
        }, [limit]
    )

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div>
      <Header />
      <div className="topup">
        <div className="profile-section">
          <div className="profile-left">
            <img src={defaultProfile} alt="Profile" />
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
        <h4 className="title-history">Semua Transaksi</h4>
        <div className="history-section">
          {history?.data?.records?.map((e) => (
            <div className="history-card">
              <div className="left-side">
                <div className={`nominal ${e.transaction_type === "TOPUP" ? "plus-text" : "minus-text"}`}>{`${e.transaction_type === "TOPUP" ? "+" : "-"} ${formatRupiah(
                  e.total_amount
                )}`}</div>
                <div className="datetime">{formatDateTime(e.created_on)}</div>
              </div>
              <div className="status">{e.description}</div>
            </div>
          ))}
          <button onClick={handleShowMoreClick}>Show more</button>
        </div>
      </div>
    </div>
  );
}

export default History;
