import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import { useSocket } from "../providers/Socket";
import { usePeer } from "../providers/Peer";

const RoomPage = () => {
    const { socket } = useSocket();
    const { peer, createOffer, createAnswer, setRemoteAnswer, sendStream, remoteStream } = usePeer();

    const [myStream, setMyStream] = useState(null);
    const [remoteEmailId, setRemoteEmailId] = useState(null);

    const handleNewUserJoined = useCallback(async (data) => {
        const { emailId } = data;
        console.log('User', emailId, 'joined the room');
        const offer = await createOffer();
        socket.emit('call-user', { emailId, offer });
        setRemoteEmailId(emailId);
    }, [socket, createOffer]);

    const handleIncomingCall = useCallback(async (data) => {
        const { from, offer } = data;
        console.log('Incoming call from', from);
        const ans = await createAnswer(offer);
        socket.emit('call-accepted', { emailId: from, answer: ans });
        setRemoteEmailId(from);
    }, [socket, createAnswer]);

    const handleCallAccepted = useCallback(async (data) => {
        const { ans } = data;
        console.log('Call accepted', ans);
        await setRemoteAnswer(ans);
    }, [setRemoteAnswer]);

    const getUserMediaStream = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });
        setMyStream(stream);
    }, []);

    const handleNegotiation = useCallback(async () => {
        const localOffer = peer.localDescription;
        socket.emit('call-user', { emailId: remoteEmailId, offer: localOffer });
    }, [peer.localDescription, remoteEmailId, socket]);

    useEffect(() => {
        socket.on('user-joined', handleNewUserJoined);
        socket.on('incoming-call', handleIncomingCall);
        socket.on('call-accepted', handleCallAccepted);
        

        return () => {
            socket.off('user-joined', handleNewUserJoined);
            socket.off('incoming-call', handleIncomingCall);
            socket.off('call-accepted', handleCallAccepted);
        }

    }, [handleNewUserJoined, handleIncomingCall, handleCallAccepted, socket]);

    useEffect(() => {
        peer.addEventListener('negotiationneeded', handleNegotiation);
        return () => {
            peer.removeEventListener('negotiationneeded', handleNegotiation);
        }
    }, [peer, handleNegotiation]);

    useEffect(() => {
        getUserMediaStream();
    }, [getUserMediaStream]);

    return (
        <div className="room-page-container">
            <h1>Room Page</h1>
            <h4>Your are connected with {remoteEmailId}</h4>
            <button onClick={e => sendStream(myStream)} >Send My Video</button>
            <ReactPlayer url={myStream} playing={true} muted />
            <ReactPlayer url={remoteStream} playing={true} />
        </div>
    );
}

export default RoomPage;

