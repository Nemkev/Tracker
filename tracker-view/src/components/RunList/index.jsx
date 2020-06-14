import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import RunIcon from "../../assets/icon.svg";
import "./index.scss";

export const RunList = () => {
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");

  const handleChangeStart = (date) => setStartDate(date);
  const handleChangeFinish = (date) => setFinishDate(date);

  return (
    <main className="run-list-main">
      <div className="filter-bar">
        <DatePicker
          name="startDate"
          value={startDate}
          selected={startDate}
          onChange={handleChangeStart}
        />
        <DatePicker
          name="finishDate"
          value={finishDate}
          selected={finishDate}
          onChange={handleChangeFinish}
        />
      </div>
      <ul className="run-info-list">
        <li className="run-list-item">
          <div className="run-icon">
            <img src={RunIcon} alt="" />
          </div>
          <div className="current-run-info">
            <p>Speed</p>
            <p>Distance</p>
            <p>Time</p>
          </div>
        </li>
      </ul>
    </main>
  );
};
