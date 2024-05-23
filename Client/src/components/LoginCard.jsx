import Logo from "../assets/images/logo.svg";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import userAtom from "../atoms/userAtom";
import { Button as MuiButton } from "@mui/material";
import { FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, Link, FormErrorMessage, Text, } from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import useShowToast from "../hooks/useShowToast";

const LoginCard = () => {
    const [showPassword, setShowPassword] = useState(false);
    const setAuthScreen = useSetRecoilState(authScreenAtom);
    const setUserData = useSetRecoilState(userAtom);

    const showToast = useShowToast();

    let [inputs, setInput] = useState({
        name: "",
        password: "",
    });

    const handleLogin = async () => {
        if (inputs.name === "" || inputs.password === "") {
            showToast("Error", "Please fill all fields", "error");
            return;
        }
        try {
            const res = await fetch("/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            });
            const data = await res.json();
            if (res.status === 200) {
                console.log(data);
                localStorage.setItem("user", JSON.stringify(data));
                setUserData(data);
                showToast("Success", "User logged in successfully", "success");
                await new Promise(r => setTimeout(r, 3000));
                document.location.href = "/friends";
            } else {
                showToast("Error", data.message, "error");
            }
        }
        catch (err) {
            console.log(err);
        };
    }

    return (
        <>
            <main className="flex flex-col items-center justify-center h-[100vh]">
                <div className=" bg-interactiveOpacity shadow-lg mx-3 py-5 h-[90vh] w-full md:w-[400px] md:h-[60vh] border border-border rounded-lg flex flex-col justify-center">
                    <div className="flex flex-col justify-center items-center">
                        <img className="w-[100px] mb-[25px]" src={Logo} alt="logo" />
                        <h1 className="text-3xl mb-[25px]">Connection</h1>

                        <div className="h-[280px] flex flex-col items-center justify-between">
                            <FormControl className="flex flex-col justify-center" id="name" isRequired>
                                <FormLabel htmlFor="name">Pseudo</FormLabel>
                                <Input type="text" placeholder="Pseudo"
                                    onChange={(e) => setInput({ ...inputs, name: e.target.value })}
                                    value={inputs.name}
                                />
                            </FormControl>

                            <FormControl className="flex flex-col justify-center" id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? 'text' : 'password'} placeholder="Password"
                                        onChange={(e) => setInput({ ...inputs, password: e.target.value })}
                                        value={inputs.password}
                                    />
                                    <InputRightElement h={'100%'} w={'3rem'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() =>
                                                setShowPassword((showPassword) => !showPassword)
                                            }>
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>

                            <MuiButton
                                variant="contained"
                                color="primary"
                                className="text-text w-[150px]"
                                onClick={handleLogin}
                                id="sendButton"
                            >
                                Connect
                            </MuiButton>

                            <div className="flex">
                                <p>Do not have an account yet ? </p>
                                <Link onClick={() => setAuthScreen("signup")} cursor="pointer" color="blue.400">Register now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default LoginCard;
