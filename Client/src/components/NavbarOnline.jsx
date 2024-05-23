import { Avatar } from "@mui/material";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import test from "../assets/images/test.jpg";
import "../i18n";

const NavbarOnline = () => {
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
      <nav className="hidden h-[100vh] md:flex  md: bg-interactiveOpacity border-l border-border w-[300px]">
        <ul className="mt-10 ml-5">
          <h2 className="text-2xl">{t("Online")}</h2>
          <li>
            <Link
              to="/"
              className="flex justify-center items-center text-text decoration-transparent font-light m-4"
            >
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
                className="mr-2"
              >
                <Avatar
                  alt="Remy Sharp"
                  src={test}
                  style={{ width: 50, height: 50 }}
                />
              </StyledBadge>

              <p>Pseudo</p>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="flex justify-center items-center text-text decoration-transparent font-light m-4"
            >
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
                className="mr-2"
              >
                <Avatar
                  alt="Remy Sharp"
                  src={test}
                  style={{ width: 50, height: 50 }}
                />
              </StyledBadge>

              <p>Pseudo</p>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="flex justify-center items-center text-text decoration-transparent font-light m-4"
            >
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
                className="mr-2"
              >
                <Avatar
                  alt="Remy Sharp"
                  src={test}
                  style={{ width: 50, height: 50 }}
                />
              </StyledBadge>

              <p>Pseudo</p>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="flex justify-center items-center text-text decoration-transparent font-light m-4"
            >
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
                className="mr-2"
              >
                <Avatar
                  alt="Remy Sharp"
                  src={test}
                  style={{ width: 50, height: 50 }}
                />
              </StyledBadge>

              <p>Pseudo</p>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="flex justify-center items-center text-text decoration-transparent font-light m-4"
            >
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
                className="mr-2"
              >
                <Avatar
                  alt="Remy Sharp"
                  src={test}
                  style={{ width: 50, height: 50 }}
                />
              </StyledBadge>

              <p>Pseudo</p>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="flex justify-center items-center text-text decoration-transparent font-light m-4"
            >
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
                className="mr-2"
              >
                <Avatar
                  alt="Remy Sharp"
                  src={test}
                  style={{ width: 50, height: 50 }}
                />
              </StyledBadge>

              <p>Pseudo</p>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavbarOnline;
