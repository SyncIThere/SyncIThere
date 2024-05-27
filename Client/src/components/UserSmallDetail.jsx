
import React from "react";
import { Avatar } from "@mui/material";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

export default function PopupInfoProfil({ userin, logoonly }) {

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

    return (
        <div>
            <li>
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
                    {logoonly ? "" : <p>{userin.name}</p>}
                </div>
            </li>
        </div>
    );
}
