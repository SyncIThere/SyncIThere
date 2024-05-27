import { Avatar } from "@mui/material";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import test from "../assets/images/test.jpg";
import "../i18n";
import { useState, useEffect } from "react";
import useShowToast from '../hooks/useShowToast';

const NavbarOnline = () => {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(true);
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
        // setFriendsDisplay(data);
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
                    <li key={friend._id}>
                      <Link
                        to="/"
                        className="flex justify-center items-center text-text decoration-transparent font-light m-4"
                      >
                        <StyledBadge
                          isonline="true"
                          overlap="circular"
                          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                          variant="dot"
                          className="mr-2"
                        >
                          <Avatar
                            alt="Remy Sharp"
                            src={friend.profilePic ? friend.profilePic : "https://www.gravatar.com/avatar/"}
                            style={{ width: 50, height: 50 }}
                          />
                        </StyledBadge>

                        <p>{friend.name}</p>
                      </Link>
                    </li>
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
                    <li key={friend._id}>
                      <Link
                        to="/"
                        className="flex justify-center items-center text-text decoration-transparent font-light m-4"
                      >
                        <StyledBadge
                          isonline="false"
                          overlap="circular"
                          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                          variant="dot"
                          className="mr-2"
                        >
                          <Avatar
                            alt="Remy Sharp"
                            src={friend.profilePic ? friend.profilePic : "https://www.gravatar.com/avatar/"}
                            style={{ width: 50, height: 50 }}
                          />
                        </StyledBadge>

                        <p>{friend.name}</p>
                      </Link>
                    </li>
                  );
                })
              }
            </div>
          </div>
        </ul>
      </nav>
    </>
  );
};

export default NavbarOnline;
