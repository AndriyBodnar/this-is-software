import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faLocationDot,
  faPaperPlane,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Button from "../Button/Button";
import WeatherWidget from "../WeatherWidget/WeatherWidget";
import Modal from "../Modal/Modal";
import HourlyWeather from "../HourlyWeather/HourlyWeather";
import MapComponent from "../MapComponent/MapComponent";

export default function Card({ user, disableBtn, localStorageFunc }) {
  const coord = user.location.coordinates;

  const [weather, setWeather] = useState();
  const [loading, setLoading] = useState(false);
  const [isSaved, setSaved] = useState(false);

  const [modal, setModal] = useState(false);

  function setLocalStorageItem() {
    localStorage.setItem(
      `${user.name.first + "_" + user.name.last}`,
      JSON.stringify(user)
    );
    setSaved(true);
    localStorageFunc(localStorage.length);
  }
  function removeLocalStorageItem() {
    localStorage.removeItem(`${user.name.first + "_" + user.name.last}`);
    setSaved(false);
    localStorageFunc(localStorage.length);
  }

  async function getWeatherData() {
    await axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${coord.latitude}2&longitude=${coord.longitude}&current_weather=true&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto&current_weather=true&current=is_day&forecast_days=3`
      )
      .then((res) => {
        setWeather(res.data);
        setLoading(true);
      });
  }

  useEffect(() => {
    getWeatherData();

    const weatherEvery5Min = setInterval(getWeatherData, 300000);

    return () => {
      clearInterval(weatherEvery5Min);
    };
  }, []);

  return (
    <>
      <div className="my-1 px-1 w-full md:w-1/2 lg:my-4  lg:w-1/3 xl:w-1/4 border-2">
        <article className="overflow-hidden rounded-lg shadow-lg p-2 xl:p-1 md:p-4">
          <header className="flex items-center justify-between leading-tight py-1 md:py-2 xl:p-2">
            <Image
              src={user.picture.medium}
              alt="Vercel Logo"
              className="block rounded-full "
              width={50}
              height={50}
            />
            {loading && <WeatherWidget weather={weather} />}
          </header>

          <div className="flex items-center justify-between leading-none py-1 md:py-2">
            <p className="font-bold text-[#080708] ml-2 ">
              {user.name.first} {user.name.last}
            </p>
          </div>
          <div className="flex items-center justify-between leading-none py-1 md:py-2">
            <p className="ml-2 font-medium text-[#080708]">
              {" "}
              <FontAwesomeIcon icon={faVenusMars} width={16} height={16} />{" "}
              {user.gender}
            </p>
          </div>
          <div className="flex items-center justify-between  py-1 md:py-2">
            <p className="ml-2 text-[#080708]">
              {" "}
              <FontAwesomeIcon
                icon={faPaperPlane}
                width={16}
                height={16}
              />{" "}
              {user.email}
            </p>
          </div>
          <div className="flex items-center justify-between py-1 md:py-2">
            <p className="ml-2 text-[#080708]">
              <FontAwesomeIcon icon={faLocationDot} width={16} height={16} />{" "}
              {user.location.country}, {user.location.city}
            </p>
          </div>
          <div className="flex items-center justify-between py-1 md:py-2 xl:p-2">
            {!disableBtn && (
              <Button
                onClick={isSaved ? removeLocalStorageItem : setLocalStorageItem}
              >
                {" "}
                {isSaved ? "Delete" : "Save"}
              </Button>
            )}
            <Button onClick={() => setModal(true)}>Weather</Button>
            {modal && (
              <Modal visible={modal} setVisible={setModal}>
                <div className="flex flex-col">
                  {loading && (
                    <>
                      {" "}
                      <WeatherWidget weather={weather} />
                      <p>
                        Wind speed:{" "}
                        {Math.floor(weather.current_weather.windspeed)}{" "}
                        {weather.current_weather_units.windspeed}
                      </p>
                      <div>
                        Hourly weather:{" "}
                        <HourlyWeather
                          hourly={weather.hourly}
                          current_time={weather.current_weather.time}
                        />
                      </div>
                      <div className="mb-10">
                        <MapComponent
                          lat={coord.latitude}
                          lon={coord.longitude}
                          urlImg={user.picture.medium}
                        />
                      </div>
                      <Button onClick={() => setModal(false)}>Close</Button>
                    </>
                  )}
                </div>
              </Modal>
            )}
          </div>
        </article>
      </div>
    </>
  );
}
