import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { UserPlus } from "lucide-react";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";
import "../i18n";
import useShowToast from '../hooks/useShowToast';
const emails = ["username@gmail.com", "user02@gmail.com"];


function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const { t } = useTranslation();
  const showToast = useShowToast();

  const handleClose = () => {
    onClose(selectedValue);
  };

  const hadleAdd = async () => {
    const pseudo = document.getElementById("pseudo").value;

    if (pseudo === "") {
      showToast("Error", "Pseudo is required", "error");
      return;
    }

    try {
      const res = await fetch(`/api/users/sendFriendRequest/${pseudo}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: pseudo }),
      });
      const data = await res.json();
      if (res.status === 200) {
        showToast("Success", "Friend request sent", "success");
        handleClose();
      } else {
        showToast("Error", data.message, "error");
      }

    } catch (error) {
      showToast("Error", error.message, "error");
    }

  };


  return (
    <Dialog onClose={handleClose} open={open} className="flex justify-center">
      <div className="bg-background w-[300px] flex items-center flex-col">
        <DialogTitle className="bg-background">{t("Add a friend")}</DialogTitle>
        <div className="h-[125px] flex flex-col items-center justify-between mb-5">
          <div className="flex flex-col justify-center bg-background">
            <label htmlFor="">{t("Pseudo")}</label>
            <input type="text" placeholder={t("Pseudo")}
              id="pseudo" className="w-[200px] h-[30px] border-2 border-primary rounded-md" />
          </div>
          <Button
            variant="contained"
            color="primary"
            className="text-text w-[150px]"
            onClick={hadleAdd}
          >
            {t("Add")}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function PopupAddFriend() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <IconButton
        aria-label="Add Friends"
        color="text"
        onClick={handleClickOpen}
      >
        <UserPlus />
      </IconButton>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
