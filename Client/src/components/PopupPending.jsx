import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { Inbox } from "lucide-react";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";
import "../i18n";
import BasicTabs from "./BasicTabs";
const emails = ["username@gmail.com", "user02@gmail.com"];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const { t } = useTranslation();

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <div className="bg-background  flex items-center flex-col ">
        <DialogTitle className="bg-background">
          {t("Pending request")}
        </DialogTitle>
        <div className="h-[200px] flex flex-col items-center justify-between my-5">
          {/* <Code></Code> */}
          <BasicTabs />
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

export default function PopupPending() {
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
        <Inbox />
      </IconButton>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
