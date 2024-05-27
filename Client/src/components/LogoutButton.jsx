
import React from "react";
import useShowToast from "../hooks/useShowToast";
import { IoIosLogOut } from "react-icons/io";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { Button } from "@chakra-ui/react";

const LogoutButton = () => {

    const setUserData = useSetRecoilState(userAtom);

    const showToast = useShowToast();

    const handleLogout = async () => {
        try {
            const res = await fetch("/api/users/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if (res.status === 200) {
                console.log(data);
                localStorage.removeItem("user");
                setUserData(null);
                showToast("Success", "User logged out successfully", "success");
                document.location.href = "/auth";
            } else {
                showToast("Error", data.message, "error");
            }
        }
        catch (err) {
            showToast("Error", err.message, "error");
        };
    }

    return (
        <Button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            size={"sm"}
            top={"30px"}
            right={"30px"}
            position="fixed"
        >
            <IoIosLogOut
                size={25} />
        </Button>
    );
}

export default LogoutButton;
