import { IconButton } from "@mui/material";
import { Inbox } from "lucide-react";
import AvatarPP from "../components/Avatar";
import Drawer from "../components/Drawer";
import Menu from "../components/Menu";
import NavbarOnline from "../components/NavbarOnline";

import { Link } from "react-router-dom";

import { Avatar, AvatarGroup } from "@mui/material";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

import test from "../assets/images/test.jpg";
import PopupAddFriend from "../components/PopupAddfriend";
import PopupAddGoupe from "../components/PopupAddGoupe";

const Friends = () => {
  const StyledBadge = styled(Badge)(() => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px #18191B`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));
  return (
    <>
      <div className="h-[100vh]">
        <Menu />

        <div className="md:flex md:justify-between">
          <Drawer />

          <main className="w-full">
            <div className="p-2 mt-5 flex justify-between items-center fixed top-0 w-full  md:w-[300px] z-50">
              <h2 className="text-2xl">Messages</h2>

              <div className="flex">
                <PopupAddFriend />

                <IconButton aria-label="Add Friends" color="text">
                  <Inbox />
                </IconButton>
              </div>
            </div>

            <AvatarPP />

            <div className="w-full border-b border-border "></div>

            <Link
              className="m-0 p-3 border-b border-border w-full flex items-center justify-between md:mt-[90px] no-underline"
              to="/conversation"
            >
              {" "}
              <div className="flex items-center justify-center">
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={test}
                    style={{ width: 50, height: 50 }}
                  />
                </StyledBadge>

                <div className="flex flex-col ml-5">
                  <p className="opacity-50">Pseudo</p>
                  <p className="opacity-50 font-light">toi: salut</p>
                </div>
              </div>
              <p className="opacity-50 font-light">5min</p>
            </Link>

            <Link
              className="m-0 p-3 border-b border-border w-full flex items-center justify-between no-underline"
              to="/conversation"
            >
              <div className="flex items-center justify-center">
                <AvatarGroup max={2}>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar alt="Remy Sharp" src={test} />
                  </StyledBadge>
                  <Avatar
                    alt="Travis Howard"
                    src="/static/images/avatar/2.jpg"
                  />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </AvatarGroup>

                <div className="flex flex-col ml-5">
                  <p className="opacity-50">Pseudo</p>
                  <p className="opacity-50 font-light">toi: salut</p>
                </div>
              </div>
              <p className="opacity-50 font-light">5min</p>
            </Link>

            <div className="absolute bottom-[95px] right-[25px] md:right-[250px]">
              <PopupAddGoupe />
            </div>
          </main>
          <NavbarOnline />
        </div>
      </div>
    </>
  );
};

export default Friends;
