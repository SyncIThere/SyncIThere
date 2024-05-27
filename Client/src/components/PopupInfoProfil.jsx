import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { Inbox } from "lucide-react";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";
import "../i18n";
import { Avatar } from "@mui/material";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";

const emails = ["username@gmail.com", "user02@gmail.com"];

function SimpleDialog(props) {
  const { onClose, selectedValue, open, userin, commonFriends } = props;
  const { t } = useTranslation();
  const [user, setUser] = useState(useRecoilValue(userAtom));

  const showToast = useShowToast();

  const date = new Date(userin.createdAt);

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

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <div className="bg-background  flex items-center flex-col w-[300px] h-[500px]">
        <DialogTitle className="text-3xl text-text mt-2">
          {t("User info")}
        </DialogTitle>
        <div className="flex items-center flex-col">
          <StyledBadge
            isonline="false"
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
            className="mr-2"
          >
            <Avatar
              alt="Remy Sharp"
              src={userin.profilePic ? userin.profilePic : "https://www.gravatar.com/avatar/"}
              style={{ width: 100, height: 100 }}
              className="m-2"
            />
          </StyledBadge>
          <p>{userin.name}</p>
        </div>
        {userin.bio ? (
          <>
            <div className="w-full border-b border-border "></div>
            <div className="flex items-center flex-col">
              <p>{t("Bio")}</p>
              <p>{userin.bio}</p>
            </div>
          </>
        ) : null}
        <div className="w-full border-b border-border "></div>
        <div className="flex items-center flex-col">
          <p>{t("Member since")}</p>
          <p>{date.toDateString()}</p>
        </div>
        <div className="w-full border-b border-border "></div>
        <div className="flex items-center flex-col">
          <p>{t("Common friend")}</p>
          <ul className="w-full">
            {commonFriends.map((friend) => {
              return (
                <PopupInfoProfil user={friend} key={friend._id} />
              );
            })}
          </ul>
        </div>
      </div>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  userin: PropTypes.object.isRequired,
};

export default function PopupInfoProfil(userin) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const [commonFriends, setCommonFriends] = useState([]);
  const showToast = useShowToast();

  userin = userin.user;

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

  const getCommonFriends = async (friendName) => {
    try {
      const res = await fetch(`/api/users/getCommonFriends/${friendName}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 200) {
        setCommonFriends(data);
      } else {
        showToast(data.message, "error");
      }
    } catch (err) {
      showToast(err.message, "error");
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
    getCommonFriends(userin.name);

  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <li key={userin._id} onClick={handleClickOpen} >
        <div
          className="flex justify-center items-center text-text decoration-transparent font-light m-4 cursor-pointer"
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
              src={userin.profilePic ? userin.profilePic : "https://www.gravatar.com/avatar/"}
              style={{ width: 50, height: 50 }}
            />
          </StyledBadge>

          <p>{userin.name}</p>
        </div>
      </li>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        userin={userin}
        commonFriends={commonFriends}
      />
    </div>
  );
}
