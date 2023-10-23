import React from "react";

export default function HourlyWeather({ hourly, current_time }) {
  let temp = [];
  let time = [];

  function roundMinutes(date) {
    let date1 = new Date(date);
    date1.setHours(date1.getHours() + Math.round(date1.getMinutes() / 60));
    date1.setMinutes(0, 0, 0);

    let testIndex = hourly.time.findIndex(
      (el) => el === current_time.slice(0, -5) + date1.toString().slice(16, 21)
    );
    for (let i = testIndex; i < testIndex + 4; i++) {
      temp.push(hourly.temperature_2m[i]);
      time.push(hourly.time[i].slice(11, 16));
    }

    return temp;
  }

  return (
    <ul>
      {roundMinutes(current_time).map((el, i) => (
        <li key={time[i]}>
          {time[i]}: {el}°C
        </li>
      ))}
    </ul>
  );
}
