import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { UserPlus } from "lucide-react";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";
import "../i18n";
const emails = ["username@gmail.com", "user02@gmail.com"];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const { t } = useTranslation();

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <div className="bg-background w-[300px] flex items-center flex-col ">
        <DialogTitle className="bg-background">{t("Add a friend")}</DialogTitle>
        <div className="h-[200px] flex flex-col items-center justify-between my-5">
          <div className="flex flex-col justify-center bg-background">
            <label htmlFor="">{t("Pseudo")}</label>
            <input type="mail" placeholder={t("Pseudo")} />
          </div>
          <div className="flex flex-col justify-center bg-background">
            <label htmlFor="">Email</label>
            <input type="mail" placeholder="Email" />
          </div>

          <Button
            variant="contained"
            color="primary"
            className="text-text w-[150px]"
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
