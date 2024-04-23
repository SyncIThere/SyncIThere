import { Avatar } from "@mui/material";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import test from "../assets/images/test.jpg";

const AvatarPP = () => {
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
      <div className="md:hidden">
        {" "}
        <Stack
          direction="row"
          spacing={2}
          className="m-5 overflow-x-scroll no-scrollbar mt-[90px] md:overflow-hidden"
        >
          <div className="p-[10px] bg-interactiveOpacity border border-border rounded-lg flex justify-center items-center">
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
          </div>
          <div className="p-[10px] bg-interactiveOpacity border border-border rounded-lg flex justify-center items-center">
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
          </div>
          <div className="p-[10px] bg-interactiveOpacity border border-border rounded-lg flex justify-center items-center">
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
          </div>
          <div className="p-[10px] bg-interactiveOpacity border border-border rounded-lg flex justify-center items-center">
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
          </div>
          <div className="p-[10px] bg-interactiveOpacity border border-border rounded-lg flex justify-center items-center">
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
          </div>
          <div className="p-[10px] bg-interactiveOpacity border border-border rounded-lg flex justify-center items-center">
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
          </div>
          <div className="p-[10px] bg-interactiveOpacity border border-border rounded-lg flex justify-center items-center">
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
          </div>
          <div className="p-[10px] bg-interactiveOpacity border border-border rounded-lg flex justify-center items-center">
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
          </div>
        </Stack>
      </div>
    </>
  );
};

export default AvatarPP;
