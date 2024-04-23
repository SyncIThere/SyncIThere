import { Avatar } from "@mui/material";
import Logo from "../assets/images/logo.svg";

const Drawer = () => {
  return (
    <>
      <nav className="hidden md:block h-[100vh] bg-interactiveOpacity border-r border-border w-[100px]">
        <ul className="mt-10">
          <li>
            <a
              href="/"
              className="flex flex-col justify-center items-center text-text decoration-transparent font-light"
            >
              <img src={Logo} className="w-[50px] h-[50px]" alt="" />
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <a
              href="/"
              className="flex flex-col justify-center items-center text-text decoration-transparent font-light"
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                style={{ width: 50, height: 50 }}
                className="m-2"
              />
            </a>
          </li>
          <li>
            <a
              href="/"
              className="flex flex-col justify-center items-center text-text decoration-transparent font-light"
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                style={{ width: 50, height: 50 }}
                className="m-2"
              />
            </a>
          </li>
          <li>
            <a
              href="/"
              className="flex flex-col justify-center items-center text-text decoration-transparent font-light"
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                style={{ width: 50, height: 50 }}
                className="m-2"
              />
            </a>
          </li>
          <li>
            <a
              href="/"
              className="flex flex-col justify-center items-center text-text decoration-transparent font-light"
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                style={{ width: 50, height: 50 }}
                className="m-2"
              />
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Drawer;
