import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../providers/Socket";

const HomePage = () => {
    const { socket } = useSocket();
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [roomCode, setRoomCode] = useState();

    const handleRoomJoin = useCallback(({ roomId }) => {
        navigate(`/room/${roomId}`);
    }, [navigate]);

    useEffect(() => {
        socket.on('user-joined', handleRoomJoin);

        return () => {
            socket.off('user-joined', handleRoomJoin);
        }
    }, [socket, handleRoomJoin]);

    const handleJoinRoom = () => {
        socket.emit('join-room', { roomId: roomCode, emailId: email });
    }

    return (
        <div className="homepage-container">
            <div className="input-container">
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" />
                <input value={roomCode} onChange={e => setRoomCode(e.target.value)} type="text" placeholder="Room Code" />
                <button onClick={handleJoinRoom}>Join Room</button>
            </div>
        </div>
    );
}

export default HomePage;
