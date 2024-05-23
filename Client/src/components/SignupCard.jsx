// import Button from "@mui/material/Button";
// import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.svg";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import userAtom from "../atoms/userAtom";
import { Button as MuiButton } from "@mui/material";
import { FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, Link, FormErrorMessage, Text, } from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import useShowToast from "../hooks/useShowToast";


const SignupCard = () => {
    const [showPassword, setShowPassword] = useState(false);
    const setAuthScreen = useSetRecoilState(authScreenAtom);
    const setUserData = useSetRecoilState(userAtom);

    const showToast = useShowToast();

    const togglevalidity = (element, isValid) => {
        if (element) {
            if (isValid) {
                element.classList.add("valid");
                element.classList.remove("invalid");
            } else {
                element.classList.add("invalid");
                element.classList.remove("valid");
            }
        }
    }

    let pseudoFirstInput = false;
    const pseudoIsValid = (name) => {
        if (!pseudoFirstInput) {
            pseudoFirstInput = true;
            setSendButton();
            return true;
        }
        const regex = new RegExp("^[a-zA-Z0-9]{3,20}$");
        const element = document.getElementById("name");
        togglevalidity(element, regex.test(name));
        setSendButton();
        return regex.test(name);
    }

    let emailFirstInput = false;
    const emailIsValid = (email) => {
        if (!emailFirstInput) {
            emailFirstInput = true;
            return true;
        }
        const regex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$");
        const element = document.getElementById("email");
        togglevalidity(element, regex.test(email));
        setSendButton();
        return regex.test(email);
    }

    let passwordFirstInput = false;
    const passwordIsValid = (password) => {
        if (!passwordFirstInput) {
            passwordFirstInput = true;
            return true;
        }
        const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$");
        const element = document.getElementById("password");
        togglevalidity(element, regex.test(password));
        setSendButton();
        return regex.test(password);
    }

    let confirmPasswordFirstInput = false;
    const confirmPasswordIsValid = (password, confirmPassword) => {
        if (!confirmPasswordFirstInput) {
            confirmPasswordFirstInput = true;
            return true;
        }
        const element = document.getElementById("confirmPassword");
        togglevalidity(element, password === confirmPassword);
        setSendButton();
        return password === confirmPassword;
    }

    const setSendButton = () => {
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirmPassword");
        const sendButton = document.getElementById("sendButton");
        if (!name || !email || !password || !confirmPassword) {
            return;
        }
        if (name.classList.contains("valid") && email.classList.contains("valid") && password.classList.contains("valid") && confirmPassword.classList.contains("valid")) {
            sendButton.disabled = false;
        } else {
            sendButton.disabled = true;
        }
    }

    let [inputs, setInput] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleSignup = async () => {
        if (!pseudoIsValid(inputs.name) || !emailIsValid(inputs.email) || !passwordIsValid(inputs.password) || !confirmPasswordIsValid(inputs.password, inputs.confirmPassword)) {
            return;
        }
        try {
            let inputend = { name: inputs.name.trim(), email: inputs.email.trim(), password: inputs.password.trim() }
            const res = await fetch("/api/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputend),
            });
            const data = await res.json();
            if (res.status === 201) {
                localStorage.setItem("user", JSON.stringify(data));
                console.log(data);
                setUserData(data);
                showToast("Success", "User " + data.name + " registered", "success");
                document.location.href = "/friends";
            } else {
                showToast("Error", data.message, "error");
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <main className="flex flex-col items-center justify-center h-[100vh]">
                <div className=" bg-interactiveOpacity shadow-lg mx-3 py-5 h-[95vh] w-full md:w-[400px] md:h-[70vh] border border-border rounded-lg flex flex-col justify-center">
                    <div className="flex flex-col justify-center items-center">
                        <img className="w-[100px] mb-[20px]" src={Logo} alt="logo" />
                        <h1 className="text-3xl mb-[20px]">Inscription</h1>

                        <div className="h-[400px] flex flex-col items-center justify-between">

                            <FormControl className="flex flex-col justify-center" id="name" isRequired isInvalid={!pseudoIsValid(inputs.name)} >
                                <FormLabel htmlFor="name">Pseudo</FormLabel>
                                <Input type="text" placeholder="Pseudo"
                                    onChange={(e) => setInput({ ...inputs, name: e.target.value })}
                                    value={inputs.name}
                                />
                                {pseudoIsValid(inputs.name) ? (
                                    null
                                ) : (
                                    <FormErrorMessage>Invalid name</FormErrorMessage>
                                )}
                            </FormControl>

                            <FormControl className="flex flex-col justify-center" id="email" isRequired isInvalid={!emailIsValid(inputs.email)}>
                                <FormLabel htmlFor="">Email</FormLabel>
                                <Input type="mail" placeholder="Email"
                                    onChange={(e) => setInput({ ...inputs, email: e.target.value })}
                                    value={inputs.email}
                                />
                                {emailIsValid(inputs.email) ? (
                                    null
                                ) : (
                                    <FormErrorMessage>Invalid email</FormErrorMessage>
                                )}
                            </FormControl>

                            <FormControl className="flex flex-col justify-center" id="password" isRequired isInvalid={!passwordIsValid(inputs.password)}>
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
                                {passwordIsValid(inputs.password) ? (
                                    null
                                ) : (
                                    <FormErrorMessage>Invalid password</FormErrorMessage>
                                )}
                            </FormControl>

                            <FormControl className="flex flex-col justify-center" id="confirmPassword" isRequired isInvalid={!confirmPasswordIsValid(inputs.password, inputs.confirmPassword)}>
                                <FormLabel htmlFor="">Confirm Password</FormLabel>
                                <Input type="password" placeholder="Confirm Password"
                                    onChange={(e) => setInput({ ...inputs, confirmPassword: e.target.value })}
                                    value={inputs.confirmPassword}
                                />
                                {confirmPasswordIsValid(inputs.password, inputs.confirmPassword) ? (
                                    null
                                ) : (
                                    <FormErrorMessage>Passwords do not match</FormErrorMessage>
                                )}
                            </FormControl>

                            <MuiButton
                                variant="contained"
                                color="primary"
                                className="text-text w-[150px]"
                                onClick={handleSignup}
                                id="sendButton"
                            >
                                Register
                            </MuiButton>

                            <div className="flex">
                                <p>Already have an account ?</p>
                                <Link onClick={() => setAuthScreen("login")} cursor="pointer" color="blue.400">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default SignupCard;
