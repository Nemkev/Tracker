import React, { useState, useReducer, useEffect } from "react";
import DatePicker from "react-datepicker";
import Modal from "react-modal";

import "react-datepicker/dist/react-datepicker.css";
import RunIcon from "../../assets/icon.svg";
import AddIcon from "../../assets/add.svg";
import CancelIcon from "../../assets/cancel.svg";
import axios from "axios";
import "./index.scss";

export const RunList = () => {
  // console.log(localStorage.userId);
  // console.log(localStorage.accessToken);
  // const config = {
  //   headers: { Authorization: `Bearer ${localStorage.accessToken}` },
  // };
  // const bodyParametrs = { userId: localStorage.userId };
  useEffect(() => {
    const getJogs = async () => {
      const listOfJogs = await axios.post(
        "http://localhost:4000/sync",
        { userId: localStorage.userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.accessToken}`,
          },
        }
      );

      console.log(listOfJogs);
      setState({ userJogs: listOfJogs.data.allThis });
    };
    getJogs();
  }, []);
  const [{ distanse, time, userJogs }, setState] = useReducer(
    (s, a) => ({
      ...s,
      ...a,
    }),
    { distanse: "", time: "", userJogs: "" }
  );
  console.log(userJogs);

  const [modalState, setModalState] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");

  const handleChangeStart = (date) => setStartDate(date);
  const handleChangeFinish = (date) => setFinishDate(date);

  const stylePreset = {
    overlay: {
      position: "fixed",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
    },
    content: {
      backgroundColor: "#7ed321",
      borderRadius: "44px",
      top: "100px",
      left: document.documentElement.clientWidth > 415 ? "200px" : "50px",
      right: document.documentElement.clientWidth > 415 ? "200px" : "50px",
      bottom: "100px",
    },
  };

  return (
    <main className="run-list-main">
      <Modal isOpen={modalState} ariaHideApp={false} style={stylePreset}>
        <form className="run-form">
          <div className="description">
            <p>Distance</p>
            <p>Time</p>
            <p>Date</p>
          </div>
          <div className="modal-input">
            <input className="distance-input" type="text" />
            <input className="time-input" type="text" />
            <input className="date-input" type="text" />
          </div>
          {/* <div className="input-form-zone">
            <div className="distance-input">
              <p>Distance</p>
              <input type="text" />
            </div>
            <div className="time-input">
              <p>Time</p>
              <input type="text" />
            </div>
            <div className="date-input">
              <p>Date</p>
              <input type="text" />
            </div>
          </div> */}
          <img
            className="close-button"
            src={CancelIcon}
            alt=""
            onClick={(e) => {
              e.preventDefault();
              setModalState(false);
            }}
          />
        </form>
      </Modal>
      <div className="filter-bar">
        <p className="date-from">Date from</p>
        <DatePicker
          name="startDate"
          value={startDate}
          selected={startDate}
          onChange={handleChangeStart}
        />
        <p className="date-to">Date to</p>
        <DatePicker
          name="finishDate"
          value={finishDate}
          selected={finishDate}
          onChange={handleChangeFinish}
        />
      </div>
      <ul className="run-info-list">
        {userJogs &&
          userJogs !== undefined &&
          userJogs.map((item) => (
            <>
              <li className="run-list-item">
                <div className="run-icon">
                  <img src={RunIcon} alt="" />
                </div>
                <div className="current-run-info">
                  <p>Speed</p>
                  <p>Distance: {item.distance}</p>
                  <p>Time: {item.time}</p>
                </div>
              </li>
            </>
          ))}
        {/* <li className="run-list-item">
          <div className="run-icon">
            <img src={RunIcon} alt="" />
          </div>
          <div className="current-run-info">
            <p>Speed</p>
            <p>Distance</p>
            <p>Time</p>
          </div>
        </li>
        <li className="run-list-item">
          <div className="run-icon">
            <img src={RunIcon} alt="" />
          </div>
          <div className="current-run-info">
            <p>Speed</p>
            <p>Distance</p>
            <p>Time</p>
          </div>
        </li> */}
      </ul>
      <img
        className="add-button"
        src={AddIcon}
        alt=""
        onClick={(e) => {
          e.preventDefault();
          setModalState(true);
        }}
      />
    </main>
  );
};
