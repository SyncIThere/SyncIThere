
import React from "react";
import SignupCard from "../components/SignupCard";
import LoginCard from "../components/LoginCard";
import { useRecoilValue } from "recoil";
import authScreenAtom from "../atoms/authAtom";

const Auth = () => {
    const authSreenState = useRecoilValue(authScreenAtom);

    return (
        <>
            {authSreenState === "login" ? <LoginCard /> : <SignupCard />}
        </>
    );
};

export default Auth;

