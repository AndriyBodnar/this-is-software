import Image from "next/image";
import React from "react";
import weatherDescr from "../../assets/weather.json" assert { type: "json" };

export default function WeatherWidget({ weather }) {
  return (
    <>
      <div className=" flex ">
        <div
          className="  bg-black text-white  font-medium w-20 text-3xl   box-border  flex justify-center items-center
      "
        >
          {Math.floor(weather.current_weather.temperature)}
          <span className="text-3xl">
            {weather.current_weather_units.temperature}
          </span>
        </div>

        <div className="widget__right-col bg-[#FDCA40] w-24 h-16 flex flex-col justify-center items-center">
          <div className="widget__weather-icon text-5xl">
            <Image
              src={
                weatherDescr[weather.current_weather.weathercode][
                  !!weather.current_weather.is_day ? "day" : "night"
                ].image
              }
              alt="Vercel Logo"
              className="block  rounded-full "
              width={45}
              height={25}
              style={{ width: 50, height: 45 }}
            />
          </div>
          <div className="widget__attrs bg-[#3772FF] text-white text-xs h-9 w-24 flex">
            <div className="widget__attr flex items-center justify-center w-1/2">
              <div className="widget__attr-value font-bold  ">
                H: {Math.floor(weather.daily.temperature_2m_max[0])}
                {weather.current_weather_units.temperature}
              </div>
            </div>
            <div className="widget__attr flex items-center justify-center w-1/2">
              <div className="widget__attr-value font-bold ">
                L: {Math.floor(weather.daily.temperature_2m_min[0])}{" "}
                {weather.current_weather_units.temperature}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
