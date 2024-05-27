
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useShowToast from '../hooks/useShowToast';
import { Dialog, DialogTitle, IconButton } from '@mui/material';
import { Inbox } from 'lucide-react';


export default function SentRequest() {
    const { t } = useTranslation();
    const [sentReq, setSentReq] = useState([]);
    const [open, setOpen] = useState(false);
    const showToast = useShowToast();

    const handleClose = () => {
        setOpen(false);
    };

    const sentRequests = async () => {
        try {
            const res = await fetch('/api/users/getSentFriendRequests', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            if (res.status === 200) {
                setSentReq(data);
                setSentRequestDisplay(data);
            } else {
                showToast(data.message, 'error');
            }
        } catch (err) {
            showToast(err.message, 'error');
        }
    };

    const cancelFriendRequest = async (name) => {
        try {
            const res = await fetch(`/api/users/cancelFriendRequest/${name}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            if (res.status === 200) {
                showToast("Success", 'friend request cancelled', 'success');
                sentRequests();
            } else {
                showToast("Error", data.message, 'error');
            }
        } catch (err) {
            showToast("Error", err.message, 'error');
        }
    };

    const setSentRequestDisplay = (data) => {
        const sentReqDiv = document.getElementById('sentReq');
        sentReqDiv.innerHTML = '';

        if (data.length === 0) {
            let noReq = document.createElement('p');
            noReq.innerHTML = 'No Sent Requests';
            sentReqDiv.appendChild(noReq);
        }

        data.forEach((req) => {
            let reqDiv = document.createElement('div');
            reqDiv.classList.add('flex', 'items-center', 'justify-between', 'w-full', 'p-2', 'border-b', 'border-gray-200');
            let avatar = document.createElement('img');
            let avatarsrc = req.profilePic ? req.profilePic : 'https://www.gravatar.com/avatar/ ';
            avatar.src = avatarsrc;
            avatar.classList.add('w-10', 'h-10', 'rounded-full', 'mr-2');
            reqDiv.appendChild(avatar);
            let name = document.createElement('p');
            name.classList.add('text-lg', 'font-semibold', 'mr-2');
            name.innerHTML = req.name;
            let buttonDiv = document.createElement('div');
            buttonDiv.classList.add('flex', 'items-center');
            let cancelButton = document.createElement('button');
            cancelButton.classList.add('bg-red-500', 'text-white', 'p-1', 'rounded', 'mr-2');
            cancelButton.innerHTML = t('Cancel');
            cancelButton.addEventListener('click', () => cancelFriendRequest(req.name));
            buttonDiv.appendChild(cancelButton);
            reqDiv.appendChild(name);
            reqDiv.appendChild(buttonDiv);
            sentReqDiv.appendChild(reqDiv);
        }
        );
    }

    useEffect(() => {
        sentRequests();
    }, []);

    return (
        <div>
            <IconButton onClick={() => setOpen(true)}>
                <Inbox size={24} />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{t('Sent request')}</DialogTitle>
                <div id="sentReq"></div>
            </Dialog>
        </div>
    );

}


