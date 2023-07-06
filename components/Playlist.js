"use client";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { audioList } from "../data/audio.js";
import { usePathname } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/utils/firebase.js";

function Playlist() {
  const pathname = usePathname();

  const [user, loading] = useAuthState(auth);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSound, setCurrentSound] = useState(null);

  let sound = currentSound;

  const mainPlay = async (index) => {
    console.log(isPlaying);
    if (currentIndex === index) {
      togglePlayPause();
      setIsPlaying(!isPlaying);
    } else if (currentIndex !== index && isPlaying) {
      setIsPlaying(!isPlaying);
      setCurrentIndex(index);
      // setIsPlaying(!isPlaying);
    } else {
      setCurrentIndex(index);
    }
  };
  const changeSound = () => {
    if (sound !== null) {
      sound.pause();

      sound.src = audioList[currentIndex].url;
      sound.loop = true;
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSound(new Audio(audioList[currentIndex].url));
    }
  };

  const togglePlayPause = () => {
    if (sound !== null) {
      if (sound.paused) {
        sound.play();
        sound.loop = true;
      } else {
        sound.pause();
      }
    }
  };
  const toggleIsPlaying = () => {
    isPlaying ? setIsPlaying(false) : setIsPlaying(true);
  };

  const toggleBigBtn = () => {
    if (isPlaying) {
      setIsPlaying(false);
      sound.pause();
    } else {
      setIsPlaying(true);
      sound.play();
    }
  };
  const changeVolume = (e) => {
    return (sound.volume = e.target.value / 100);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentSound(new Audio(audioList[currentIndex].url));
    }
  }, []);

  useEffect(() => {
    changeSound();
    togglePlayPause();
  }, [currentIndex]);
  return (
    <div className="text-white">
      <div
        className={`big-btn text-lg fixed bottom-0 w-1/8 left-[48%] flex justify-center ${
          pathname === "/" ? "hidden" : ""
        } z-50`}
      >
        <div
          className="bg-black shadow-custom hover:bg-greyBlue rounded-lg mb-8 p-4 cursor-pointer"
          onClick={() => toggleBigBtn()}
        >
          {isPlaying ? (
            <BsPauseFill
              className="my-0 mx-auto hover:text-darkblue"
              aria-label="Pause"
              title="Pause"
            />
          ) : (
            <BsPlayFill
              className="my-0 mx-auto hover:text-darkblue"
              aria-label="Play"
              title="Play"
            />
          )}
        </div>
      </div>
      {user && (
        <ul
          className={`playlist flex flex-col items-center py-6 ${
            pathname === "/" ? "" : "hidden"
          } `}
        >
          {audioList?.map((item, index) => (
            <li className="mt-6" key={item.id}>
              <p className="text-xs mb-2">
                {item.country.split(/(?=[A-Z])/).join(" ")}
              </p>
              <div className="audio flex items-center gap-2 ">
                {currentIndex === index && isPlaying ? (
                  <BsPauseFill
                    className="cursor-pointer"
                    onClick={() => mainPlay(index)}
                    aria-label="Pause"
                    title="Pause"
                  />
                ) : (
                  <BsPlayFill
                    className="cursor-pointer"
                    onClick={() => mainPlay(index)}
                    aria-label="Play"
                    title="Play"
                  />
                )}

                <input
                  className="md:w-52 lg:w-56 appearance-none w-40 h-0.5 outline-none opacity-70 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-lg [&::-webkit-slider-thumb]:cursor-pointer"
                  type="range"
                  min="1"
                  max="100"
                  step="1"
                  defaultValue={50}
                  onChange={changeVolume}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Playlist;
