import { Avatar } from "@mui/material";
import { Compass } from "lucide-react";
import Logo from "../assets/images/logo.svg";
import test from "../assets/images/test.jpg";
import { Link } from "react-router-dom";

const Drawer = () => {
  return (
    <>
      <nav className="hidden md:block h-[100vh] bg-interactiveOpacity border-r border-border w-[100px]">
        <ul className="mt-8">
          <li>
            <Link
              to="/discover"
              className="flex flex-col justify-center items-center text-text decoration-transparent font-light"
            >
              <Compass strokeWidth={1} size={50} color="#EDEEF0" />
            </Link>
          </li>

          <li>
            <Link
              to="/account"
              className="flex flex-col justify-center items-center text-text decoration-transparent font-light"
            >
              <Avatar
                alt="Remy Sharp"
                src={test}
                style={{ width: 50, height: 50 }}
                className="m-2"
              />
            </Link>
          </li>
          <li>
            <Link
              to="/friends"
              className="flex flex-col justify-center items-center text-text decoration-transparent font-light"
            >
              <img src={Logo} className="w-[50px] h-[50px]" alt="" />
            </Link>
          </li>
        </ul>
        <ul>
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
