"use client";
import React, { useEffect, useState } from "react";
import { atcList } from "@/data/atc";
import { usePathname } from "next/navigation";
function Airplane() {
  const [toggle, setToggle] = useState(false);
  const [city, setCity] = useState("");
  const [audio, setAudio] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [pathname, setPathname] = useState();

  let sound = audio;

  let cities = [
    "Los Angeles",
    "New York",
    "Tokyo",
    "Toronto",
    "Taipei",
    "Hong Kong",
    "Singapore",
    "Melbourne",
    "Zurich",
  ];
  let sortedCities = cities.sort();

  const handleChange = (value) => {
    setCity(value);
    let soundUrl = atcList.find((item) => item.city === value).url;
    sound.src = soundUrl;
  };
  const togglePlayPause = () => {
    if (city.length === 0) {
      return;
    } else if (city.length !== 0 && toggle) {
      sound.play();
      setIsPlaying(true);
    } else if (city.length !== 0 && !toggle) {
      sound.pause();
      setIsPlaying(false);
    }
  };

  const toggleBtn = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    togglePlayPause();
    if (!audio) {
      setAudio(new Audio("https://s1-fmt2.liveatc.net/kjfk9_s"));
      setPathname(window.location.pathname);
    }

    return () => (sound ? sound.pause() : "");
  }, [city, toggle, pathname]);

  return (
    <div className="w-4/5 mx-auto">
      <div className="flex flex-col items-center text-white p-8 relative">
        <div className="mx-auto flex items-center mt-4 mb-10">
          <div className="relative block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              name="toggle"
              id="toggle"
              className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white  appearance-none cursor-pointer"
              onClick={() => toggleBtn()}
            />
            <label
              htmlFor="toggle"
              className="toggle-label block overflow-hidden h-5 rounded-full bg-darkgrey cursor-pointer"
            ></label>
          </div>
          <p className={`text-sm ${toggle ? "text-white" : "text-lightgrey"}`}>
            {toggle ? "on" : "off"}
          </p>
        </div>
        <label htmlFor="airport-select" className="text-sm text-center">
          Live ATC <br></br>
          choose an airport
        </label>
        <select
          onChange={(e) => handleChange(e.target.value)}
          className={`form-select w-1/5 focus:ring-0 focus:border-darkgrey focus:within:hidden ${
            !toggle ? "cursor-not-allowed" : ""
          } relative text-sm border-2 border-darkgrey py-2 px-4 bg-black mt-4 mb-4 outline-none`}
          disabled={toggle ? "" : "disabled"}
        >
          <option>-</option>
          {sortedCities.map((item, index) => (
            <option key={index} value={item} disabled={toggle ? false : true}>
              {item}
            </option>
          ))}
        </select>

        <div
          className={`text-center w-full absolute bottom-0 flex justify-center`}
        >
          <div className="relative">
            <div
              id="bar-1"
              className={`sbar ${!isPlaying ? "noanim" : ""}`}
            ></div>
            <div
              id="bar-2"
              className={`sbar ${!isPlaying ? "noanim" : ""}`}
            ></div>
            <div
              id="bar-3"
              className={`sbar ${!isPlaying ? "noanim" : ""}`}
            ></div>
            <div
              id="bar-4"
              className={`sbar ${!isPlaying ? "noanim" : ""}`}
            ></div>
            <div
              id="bar-5"
              className={`sbar ${!isPlaying ? "noanim" : ""}`}
            ></div>
            <div
              id="bar-6"
              className={`sbar ${!isPlaying ? "noanim" : ""}`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Airplane;
