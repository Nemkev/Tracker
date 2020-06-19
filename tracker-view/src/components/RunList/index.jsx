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
  const [
    { distance, time, userJogs, distanceUpdate, timeUpdate, id },
    setState,
  ] = useReducer(
    (s, a) => ({
      ...s,
      ...a,
    }),
    {
      distance: "",
      time: "",
      userJogs: "",
      distanceUpdate: "",
      timeUpdate: "",
      id: "",
    }
  );

  const [modalStateCreate, setModalStateCreate] = useState(false);
  const [modalStateUpdate, setModalStateUpdate] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [jogDateUpdate, setJogDateUpdate] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [jogDate, setJogDate] = useState("");

  useEffect(() => {
    if (startDate.length !== 0 && finishDate.length !== 0) {
      const filterJogs = async () => {
        const filteredJogs = await axios.post(
          "http://localhost:4000/filterDate",
          {
            userId: localStorage.userId,
            startDate,
            finishDate,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.accessToken}`,
            },
          }
        );
        setState({ userJogs: filteredJogs.data });
      };
      filterJogs();
    } else {
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
        setState({ userJogs: listOfJogs.data.allThis });
      };
      getJogs();
    }
  }, [startDate, finishDate]);

  const handleCreateJog = async (e) => {
    e.preventDefault();
    axios.post(
      "http://localhost:4000/newJog",
      {
        userId: localStorage.userId,
        time,
        distance,
        date: jogDate,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      }
    );
  };

  const handleDeleteJog = async (e) => {
    e.preventDefault();
    axios.delete("http://localhost:4000/deleteJog", {
      headers: {
        Authorization: `Bearer ${localStorage.accessToken}`,
      },
      data: {
        id,
      },
    });
  };

  const handleUpdateJog = async (e) => {
    e.preventDefault();
    axios.put(
      "http://localhost:4000/updateJog",
      {
        userId: localStorage.userId,
        id,
        time: timeUpdate,
        distance: distanceUpdate,
        date: jogDateUpdate,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      }
    );
  };

  const handleChangeStart = (date) => setStartDate(date);
  const handleChangeFinish = (date) => setFinishDate(date);
  const handleChangeJog = (date) => setJogDate(date);
  const handleChangeUpdateJog = (date) => setJogDateUpdate(date);
  const handleChange = ({ target: { value, name } }) => {
    setState({
      [name]: value,
    });
  };

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

  console.log(userJogs);

  return (
    <main className="run-list-main">
      <Modal isOpen={modalStateCreate} ariaHideApp={false} style={stylePreset}>
        <form className="run-form">
          <div className="description">
            <p>Distance</p>
            <p>Time</p>
            <p>Date</p>
          </div>
          <div className="modal-input">
            <input
              className="distance-input"
              name="distance"
              value={distance}
              onChange={handleChange}
              type="text"
            />
            <input
              className="time-input"
              name="time"
              value={time}
              onChange={handleChange}
              type="text"
            />
            <DatePicker
              name="jogDate"
              value={jogDate}
              selected={jogDate}
              onChange={handleChangeJog}
            />
            <button className="create-button" onClick={handleCreateJog}>
              Create
            </button>
          </div>
          <img
            className="close-button"
            src={CancelIcon}
            alt=""
            onClick={(e) => {
              e.preventDefault();
              setModalStateCreate(false);
            }}
          />
        </form>
      </Modal>
      <Modal isOpen={modalStateUpdate} ariaHideApp={false} style={stylePreset}>
        <form className="run-form">
          <div className="description">
            <p>Distance</p>
            <p>Time</p>
            <p>Date</p>
          </div>
          <div className="modal-input">
            <input
              className="distance-input"
              name="distanceUpdate"
              value={distanceUpdate}
              onChange={handleChange}
              type="text"
            />
            <input
              className="time-input"
              name="timeUpdate"
              value={timeUpdate}
              onChange={handleChange}
              type="text"
            />
            <DatePicker
              name="jogDateUpdate"
              value={jogDateUpdate}
              selected={jogDateUpdate}
              onChange={handleChangeUpdateJog}
            />
            <button className="create-button" onClick={handleUpdateJog}>
              Update
            </button>
            <button className="create-button" onClick={handleDeleteJog}>
              Delete
            </button>
          </div>
          <img
            className="close-button"
            src={CancelIcon}
            alt=""
            onClick={(e) => {
              e.preventDefault();
              setModalStateUpdate(false);
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
            <div key={`${item._id}`}>
              <li className="run-list-item">
                <div className="run-icon">
                  <img src={RunIcon} alt="" />
                </div>
                <div
                  className="current-run-info"
                  onClick={(e) => {
                    e.preventDefault();
                    setState({ id: item._id });
                    setModalStateUpdate(true);
                  }}
                >
                  <p>Speed</p>
                  <p>Distance: {item.distance}</p>
                  <p>Time: {item.time}</p>
                </div>
              </li>
            </div>
          ))}
      </ul>
      <img
        className="add-button"
        src={AddIcon}
        alt=""
        onClick={(e) => {
          e.preventDefault();
          setModalStateCreate(true);
        }}
      />
    </main>
  );
};
