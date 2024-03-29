"use client";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/utils/firebase";
import { AiOutlineHome } from "react-icons/ai";
import { TbPencilMinus } from "react-icons/tb";
import { BsChatSquareDots, BsAirplane } from "react-icons/bs";
import { useRouter } from "next/navigation";

export default function Nav() {
  const [user, loading] = useAuthState(auth);
  const route = useRouter();

  return (
    <>
      {user && (
        <div className="md:flex-row md:gap-0 md:justify-between md:px-6 mt-4 flex flex-col gap-4 items-center mx-auto py-6 bg-darkgrey rounded-lg w-10/12">
          <div className="username">
            <h1 className="text-sm font-weight text-white">
              {user.isAnonymous ? "anonymous" : user.displayName}
            </h1>
          </div>
          <div className="md:gap-6 navbar flex gap-4 text-white">
            <Link href="/">
              <AiOutlineHome
                className="hover:text-greyBlue"
                aria-label="Home"
                title="Home"
              />
            </Link>
            <Link href="/productive">
              <TbPencilMinus
                className="hover:text-greyBlue"
                aria-label="Productive"
                title="Productive Space"
              />
            </Link>
            <Link href="/log">
              <BsChatSquareDots
                className="hover:text-greyBlue"
                aria-label="Log"
                title="Log"
              />
            </Link>
            <Link href="/airplane">
              <BsAirplane
                className="hover:text-greyBlue"
                aria-label="Live Air Traffic Control"
                title="Live Air Traffic Control"
              />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
