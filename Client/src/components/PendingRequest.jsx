
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useShowToast from '../hooks/useShowToast';
import { Dialog, DialogTitle, IconButton } from '@mui/material';
import { Inbox } from 'lucide-react';


export default function PendingRequest() {
    const { t } = useTranslation();
    const [pendingReq, setPendingReq] = useState([]);
    const [open, setOpen] = useState(false);
    const showToast = useShowToast();

    const handleClose = () => {
        setOpen(false);
    };

    const pendingRequests = async () => {
        try {
            const res = await fetch('/api/users/getFriendRequests', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            if (res.status === 200) {
                setPendingReq(data);
                setFriendRequestDisplay(data);
            } else {
                showToast(data.message, 'error');
            }
        } catch (err) {
            showToast(err.message, 'error');
        }
    };

    const acceptFriendRequest = async (name) => {
        try {
            const res = await fetch(`/api/users/acceptFriendRequest/${name}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            if (res.status === 200) {
                showToast("Success", 'friend request accepted', 'success');
                pendingRequests();
            } else {
                showToast("Error", data.message, 'error');
            }
        } catch (err) {
            showToast("Error", err.message, 'error');
        }
    };

    const rejectFriendRequest = async (name) => {
        try {
            const res = await fetch(`/api/users/rejectFriendRequest/${name}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            if (res.status === 200) {
                showToast("Success", 'friend request rejected', 'success');
                pendingRequests();
            } else {
                showToast("Error", data.message, 'error');
            }
        } catch (err) {
            showToast("Error", err.message, 'error');
        }
    };

    const setFriendRequestDisplay = (pendingReq) => {
        let pendingReqDisplay = document.getElementById('pendingReq');
        pendingReqDisplay.innerHTML = '';

        if (pendingReq.length === 0) {
            let noReq = document.createElement('p');
            noReq.innerHTML = 'No Pending Requests';
            pendingReqDisplay.appendChild(noReq);
        }

        pendingReq.forEach((req) => {
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
            let acceptButton = document.createElement('button');
            acceptButton.classList.add('bg-green-500', 'text-white', 'px-2', 'py-1', 'rounded', 'mr-2');
            acceptButton.innerHTML = 'Accept';
            acceptButton.onclick = () => acceptFriendRequest(req.name);
            let rejectButton = document.createElement('button');
            rejectButton.classList.add('bg-red-500', 'text-white', 'px-2', 'py-1', 'rounded');
            rejectButton.innerHTML = 'Reject';
            rejectButton.onclick = () => rejectFriendRequest(req.name);

            buttonDiv.appendChild(acceptButton);
            buttonDiv.appendChild(rejectButton);
            reqDiv.appendChild(name);
            reqDiv.appendChild(buttonDiv);
            pendingReqDisplay.appendChild(reqDiv);
        });
    };

    useEffect(() => {
        pendingRequests();
    }, []);

    return (
        <div>
            <IconButton onClick={() => setOpen(true)}>
                <Inbox size={24} />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{t('Pending Requests')}</DialogTitle>
                <div id="pendingReq"></div>
            </Dialog>
        </div>
    );

}


