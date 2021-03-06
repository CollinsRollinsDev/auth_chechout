/* eslint-disable no-unreachable */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getValidate,
  setValidate,
  getUserData,
  setUserData,
} from "../redux/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";


const Dashboard = ({ newData }) => {
  const dispatch = useDispatch();
  const validate = useSelector(getValidate);
  const user_data = useSelector(getUserData);
  const [btn, setBtn] = useState("click here to logout");
  const navigate = useNavigate();
  const cookies = new Cookies();
  const handleLogout = async () => {
    try {
      cookies.remove('token');
      dispatch(setValidate(false))
      navigate("/login");
      return
      setBtn("Logging out....");
      const res = await fetch(`https://auth-checkout-server.vercel.app/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // credentials: "include",
      });
      const data = await res.json();
      if (data.success !== true) {
        alert("failed to logout. Try Again");
        setBtn("Failed to logout. Try again");
        return;
      }
      console.log(data, "As data");
      dispatch(setValidate(false))
      navigate("/login");
      return;
    } catch (error) {
      alert("Error occured!");
      console.log(error, "as error");
      return;
    }
  };

  return (
    <>
      <button onClick={handleLogout}>{btn}</button>
      <div style={{ fontSize: 50 }}>Welcome @{user_data?.username}</div>
    </>
  );
};

export default Dashboard;
