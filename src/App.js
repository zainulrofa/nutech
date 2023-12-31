import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { ToastContainer } from "react-toastify";
import Registration from "./components/Regist/Registration";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import Topup from "./components/Topup/Topup"
import History from "./components/History/History"
import Profile from "./components/Profile/Profile"
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import Transaction from "./components/Transaction/Transaction";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ToastContainer
            position="top-left"
            autoClose={2000}
            hideProgressBar={false}
            closeOnClick={true}
            pauseOnHover={true}
            draggable={true}
            theme="light"
          />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Registration" element={<Registration />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Topup" element={<Topup />} />
            <Route path="/History" element={<History />} />
            <Route path="/Transaction" element={<Transaction />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
