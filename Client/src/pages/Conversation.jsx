import { Avatar } from "@mui/material";
import Badge from "@mui/material/Badge";
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import { ArrowLeftFromLine, ArrowUpFromDot, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import test from "../assets/images/test.jpg";
import Drawer from "../components/Drawer";
import NavbarOnline from "../components/NavbarOnline";
import "../i18n";

const Conversation = () => {
  const { t } = useTranslation();
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
        <div className="md:flex md:justify-between">
          <Drawer />
          <main className="w-full">
            {/* Entete de la conversation */}
            <div className="bg-border md:bg-interactiveOpacity md:border-b md:border-border  p-3 w-full flex justify-between items-center">
              <Link to="/friends">
                <ArrowLeftFromLine color="#EDEEF0" />
              </Link>
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
              <Link to="/">
                <Phone color="#EDEEF0" />
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="flex justify-between items-center w-[300px] absolute bottom-10">
                <input type="text" placeholder={t("Your message")} />
                <Fab size="small" color="primary" aria-label="add">
                  <ArrowUpFromDot size={16} color="#EDEEF0" />
                </Fab>
              </div>
            </div>
          </main>

          <NavbarOnline />
        </div>
      </div>
    </>
  );
};

export default Conversation;
