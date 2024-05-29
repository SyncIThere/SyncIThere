import { Avatar } from "@mui/material";
import Badge from "@mui/material/Badge";
import Popover from "@mui/material/Popover";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import "../i18n";
import { useState, useEffect } from "react";
import useShowToast from '../hooks/useShowToast';
import PopupInfoProfil from "./PopupInfoProfil";
import UserSmallDetail from "./UserSmallDetail";
import UserInfo from "./UserInfo";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

const NavbarOnline = () => {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(true);

  const [userName, setUserName] = useState('');
  const [userInfoVisible, setUserInfoVisible] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(useRecoilValue(userAtom));

  const { t } = useTranslation();
  const StyledBadge = styled(Badge)(({ isonline }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: isonline === "true" ? "#44b700" : "#ff0000",
      color: isonline === "true" ? "#44b700" : "#ff0000",
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

  const [friends, setFriends] = useState([]);

  const getFriends = async () => {
    try {
      const res = await fetch("/api/users/getFriends", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 200) {
        setFriends(data);
        setIsLoading(false);
      } else {
        showToast(data.message, "error");
      }
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

  const handleUserClick = (e, user) => {
    setUserName(user);
    setUserInfoVisible(true);
    setAnchorEl(e.currentTarget);
  };

  const handlePopoverClose = () => {
    setUserInfoVisible(false);
    setAnchorEl(null);
  };


  if (isLoading) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <nav className="hidden h-[100vh] md:flex  md: bg-interactiveOpacity border-l border-border w-[300px] overflow-y-scroll">
        <ul className="w-full">
          <div className="pt-10 pl-5 pr-5">
            <h2 className="text-2xl">{t("Online")}</h2>
            <div id="friendsListonline" className="flex flex-col items-center justify-between my-5">
              {friends.onlineFriends.length === 0 && <p>No online friends</p>}
              {
                friends.onlineFriends.map((friend) => {
                  return (
                    // <PopupInfoProfil user={friend} />
                    <div className="flex items-center justify-between w-full" onClick={(e) => handleUserClick(e, friend)} key={friend._id}>
                      <UserSmallDetail userin={friend} key={friend._id} logoonly={false} />
                    </div>
                  );
                })
              }
            </div>
          </div>
          <div className="w-full border-b border-border "></div>
          <div className="p-5">
            <h2 className="text-2xl">{t("Offline")}</h2>
            <div id="friendsListoffline" className="flex flex-col items-center justify-between my-5">
              {friends.offlineFriends.length === 0 && <p>No offline friends</p>}
              {
                friends.offlineFriends.map((friend) => {
                  return (
                    // <PopupInfoProfil user={friend} />
                    <div className="flex items-center justify-between w-full" onClick={(e) => handleUserClick(e, friend)} key={friend._id}>
                      <UserSmallDetail userin={friend} key={friend._id} logoonly={false} />
                    </div>
                  );
                })
              }
            </div>
          </div>
        </ul>
      </nav>
      <Popover
        id="user-info-popover"
        open={userInfoVisible}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <UserInfo userin={userName} setUserInfoVisible={setUserInfoVisible} onClose={handlePopoverClose} />
      </Popover>
    </>
  );
};

export default NavbarOnline;
