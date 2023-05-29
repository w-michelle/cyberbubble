"use client";
import React, { useEffect, useState } from "react";
import { atcList } from "@/data/atc";
import { usePathname } from "next/navigation";
function Airplane() {
  const [toggle, setToggle] = useState(false);
  const [city, setCity] = useState("");
  const [audio, setAudio] = useState(() => {
    let current = new Audio("https://s1-fmt2.liveatc.net/kjfk9_s");
    return current;
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [pathname, setPathname] = useState(window.location.pathname);
  console.log(pathname);
  let sound = audio;
  console.log(sound);
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

    return () => sound.pause();
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
        <label htmlFor="airport-select" className="text-sm">
          listen to live ATC <br></br>
          choose an airport
        </label>
        <select
          onChange={(e) => handleChange(e.target.value)}
          className={`${
            !toggle ? "cursor-not-allowed" : ""
          } relative text-sm border-2 border-darkgrey py-2 px-4 bg-black mt-4 mb-6 outline-none`}
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
          className={`md:left-[48%] 2xl:left-[49.5%] text-center w-full left-[47%] absolute bottom-0`}
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
