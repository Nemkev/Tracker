import React, { useState, useReducer, useEffect } from "react";
import DatePicker from "react-datepicker";
import Modal from "react-modal";

import "react-datepicker/dist/react-datepicker.css";
import RunIcon from "../../assets/icon.svg";
import AddIcon from "../../assets/add.svg";
import CancelIcon from "../../assets/cancel.svg";
import SadSmile from "../../assets/sad-rounded-square-emoticon.svg";
import axios from "axios";
import "./index.scss";

export const RunList = () => {
  const [
    {
      distance,
      time,
      userJogs,
      distanceUpdate,
      timeUpdate,
      id,
      speed,
      speedUpdate,
    },
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
      speed: "",
      speedUpdate: "",
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
          "https://react-jog-client.herokuapp.com/filterDate",
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
          "https://react-jog-client.herokuapp.com/sync",
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

  const logout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("accessToken");
  };

  const handleCreateJog = async (e) => {
    e.preventDefault();
    axios.post(
      "https://react-jog-client.herokuapp.com/v1/data/jog",
      {
        userId: localStorage.userId,
        time,
        distance,
        date: jogDate,
        speed,
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
    axios.delete("https://react-jog-client.herokuapp.com/v1/data/jog", {
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
      "https://react-jog-client.herokuapp.com/v1/data/jog",
      {
        userId: localStorage.userId,
        id,
        time: timeUpdate,
        distance: distanceUpdate,
        date: jogDateUpdate,
        speed: speedUpdate,
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

  if (userJogs && userJogs.length < 1) {
    return (
      <main className="run-list-main-empty">
        <Modal
          isOpen={modalStateCreate}
          ariaHideApp={false}
          style={stylePreset}
        >
          <form className="run-form">
            <div className="modal-input">
              <div className="input-block">
                <p>Distance</p>
                <input
                  className="distance-input"
                  name="distance"
                  value={distance}
                  onChange={handleChange}
                  type="text"
                />
              </div>
              <div className="input-block">
                <p>Time</p>
                <input
                  className="time-input"
                  name="time"
                  value={time}
                  onChange={handleChange}
                  type="text"
                />
              </div>
              <div className="input-block">
                <p>Speed</p>
                <input
                  className="time-input"
                  name="speed"
                  value={speed}
                  onChange={handleChange}
                  type="text"
                />
              </div>
              <div className="input-block">
                <p>Date</p>
                <DatePicker
                  className="date-input"
                  name="jogDate"
                  value={jogDate}
                  selected={jogDate}
                  onChange={handleChangeJog}
                />
              </div>
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
        <img src={SadSmile} alt="" />
        <p className="empty-message">Nothing is there</p>
        <button
          className="create-button"
          onClick={(e) => {
            e.preventDefault();
            setModalStateCreate(true);
          }}
        >
          Create your first jog
        </button>
      </main>
    );
  }

  return (
    <main className="run-list-main">
      <Modal isOpen={modalStateCreate} ariaHideApp={false} style={stylePreset}>
        <form className="run-form">
          <div className="modal-input">
            <div className="input-block">
              <p>Distance</p>
              <input
                className="distance-input"
                name="distance"
                value={distance}
                onChange={handleChange}
                type="text"
              />
            </div>
            <div className="input-block">
              <p>Time</p>
              <input
                className="time-input"
                name="time"
                value={time}
                onChange={handleChange}
                type="text"
              />
            </div>
            <div className="input-block">
              <p>Speed</p>
              <input
                className="time-input"
                name="speed"
                value={speed}
                onChange={handleChange}
                type="text"
              />
            </div>
            <div className="input-block">
              <p>Date</p>
              <DatePicker
                className="date-input"
                name="jogDate"
                value={jogDate}
                selected={jogDate}
                onChange={handleChangeJog}
              />
            </div>
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
          <div className="modal-input">
            <div className="input-block">
              <p>Distance</p>
              <input
                className="distance-input"
                name="distanceUpdate"
                value={distanceUpdate}
                onChange={handleChange}
                type="text"
              />
            </div>
            <div className="input-block">
              <p>Time</p>
              <input
                className="time-input"
                name="timeUpdate"
                value={timeUpdate}
                onChange={handleChange}
                type="text"
              />
            </div>
            <div className="input-block">
              <p>Speed</p>
              <input
                className="time-input"
                name="speedUpdate"
                value={speedUpdate}
                onChange={handleChange}
                type="text"
              />
            </div>
            <div className="input-block">
              <p>Date</p>
              <DatePicker
                className="date-input"
                name="jogDateUpdate"
                value={jogDateUpdate}
                selected={jogDateUpdate}
                onChange={handleChangeUpdateJog}
              />
            </div>
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
          className="start-date"
          name="startDate"
          value={startDate}
          selected={startDate}
          onChange={handleChangeStart}
        />
        <p className="date-to">Date to</p>
        <DatePicker
          className="finish-date"
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
                  <p>Date: {item.date.slice(0, 10)}</p>
                  <p>Speed: {item.speed}</p>
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
