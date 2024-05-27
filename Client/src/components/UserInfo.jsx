import React, { useState } from 'react'
import { Card, Typography, TextField } from '@mui/material';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import { Avatar, Badge } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PopupInfoProfil from './PopupInfoProfil';
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import { useEffect } from 'react';
import useShowToast from '../hooks/useShowToast';
import Dialog from '@mui/material/Dialog';


export default function UserInfo(props) {

    const [user, setUser] = useState(useRecoilValue(userAtom));

    const { userin, setUserInfoVisible } = props;
    const [messageText, setMessageText] = useState('');
    const [commonFriends, setCommonFriends] = useState([]);
    const showToast = useShowToast();

    const { t } = useTranslation();

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

    // Handles keypress and calls the callback method
    const handleKeyPress = (e, callbackMethod) => {
        if (e.key === "Enter") {
            callbackMethod();
        }
    }

    useEffect(() => {
        getCommonFriends(userin.name);
    }, []);

    const handleClose = () => {
        setUserInfoVisible(false);
    }


    return (
        <Dialog onClose={handleClose} open={open}>
            <Card className="w-[300px] h-[500px] bg-background flex items-center flex-col">
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
            </Card>
        </Dialog>
    )
}