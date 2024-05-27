import { Avatar } from "@mui/material";
import { Compass } from "lucide-react";
import Logo from "../assets/images/logo.svg";
import test from "../assets/images/test.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

const Drawer = () => {
  const [user, setUser] = useState(useRecoilValue(userAtom));

  return (
    <>
      <nav className="hidden md:block h-[100vh] bg-interactiveOpacity border-r border-border w-[100px]">
        <ul className="mt-1 mb-1">
          <li>
            <Link
              to="/friends"
              className="flex flex-col justify-center items-center text-text decoration-transparent font-light"
            >
              <img src={Logo} className="w-[50px] h-[50px] m-1" alt="logo" />
            </Link>
          </li>
          <li>
            <Link
              to="/account"
              className="flex flex-col justify-center items-center text-text decoration-transparent font-light"
            >
              <Avatar
                alt="Remy Sharp"
                src={user.profilePic ? user.profilePic : "https://www.gravatar.com/avatar/"}
                style={{ width: 50, height: 50 }}
                className="m-1"
              />
            </Link>
          </li>
          <li>
            <Link
              to="/discover"
              className="flex flex-col justify-center items-center text-text decoration-transparent font-light"
            >
              <Compass strokeWidth={1} size={50} color="#EDEEF0" className="m-1" />
            </Link>
          </li>
        </ul>
        <div className="w-full border-b border-border "></div>
        <ul id="serverList" className="">
          <li>
            <Link
              to="/"
              className="flex flex-col justify-center items-center text-text decoration-transparent font-light"
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                style={{ width: 50, height: 50 }}
                className="m-2"
              />
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="flex flex-col justify-center items-center text-text decoration-transparent font-light"
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                style={{ width: 50, height: 50 }}
                className="m-2"
              />
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="flex flex-col justify-center items-center text-text decoration-transparent font-light"
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                style={{ width: 50, height: 50 }}
                className="m-2"
              />
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="flex flex-col justify-center items-center text-text decoration-transparent font-light"
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                style={{ width: 50, height: 50 }}
                className="m-2"
              />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Drawer;
