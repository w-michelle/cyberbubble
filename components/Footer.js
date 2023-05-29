"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { auth } from "@/utils/firebase";
import About from "./About.js";
import Credit from "./Credit.js";
function Footer() {
  const [user, loading] = useAuthState(auth);
  const [toggleCredit, setToggleCredit] = useState(false);
  const [toggleAbout, setToggleAbout] = useState(false);

  return (
    <div className="text-white w-full absolute bottom-0 flex justify-center mb-4">
      <div className="footer gap-4 text-sm py-6 px-4 w-10/12">
        <ul className="flex gap-4">
          <li>
            {toggleAbout ? <About toggle={setToggleAbout} /> : ""}
            <p className="cursor-pointer" onClick={() => setToggleAbout(true)}>
              About
            </p>
          </li>
          <li>
            {toggleCredit ? <Credit toggle={setToggleCredit} /> : ""}

            <p className="cursor-pointer" onClick={() => setToggleCredit(true)}>
              Credits
            </p>
          </li>
          <li className="ml-auto text-2xl">
            <BiLogOut
              className="cursor-pointer relative"
              onClick={() => auth.signOut()}
            />
            {/* <p class="absolute text-xs w-15 px-3 py-2 text-center text-gray-600 truncate -translate-x-1/2 -top-5 bg-white rounded-lg shadow-md shadow-gray-200">
              Log Out
            </p> */}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
