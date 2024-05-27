
import {
  Avatar,
  Button,
  IconButton,
  Input,
  Text,
  Textarea,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import { SmallCloseIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Cog, Pencil } from "lucide-react";
import { useTranslation } from 'react-i18next';
import test from '../assets/images/test.jpg';
import Drawer from '../components/Drawer';
import LanguageSelector from '../components/LanguageSelector';
import Menu from '../components/Menu';
import { useState, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import usePreviewImg from '../hooks/usePreviewImg';
import useShowToast from '../hooks/useShowToast';


export default function UpdateProfile() {

  const showToast = useShowToast();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [user, setUser] = useState(useRecoilValue(userAtom));

  const { t } = useTranslation();

  const [isEditing, setIsEditing] = useState(false);

  let [inputs, setInput] = useState({
    name: user.name,
    email: user.email,
    oldpassword: "",
    newpassword: "",
    bio: user.bio
  });

  const fileRef = useRef(null);

  const { handleImageChange, imgUrl } = usePreviewImg();

  const checkPassword = () => {
    const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$");
    return regex.test(inputs.newpassword);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputs.newpassword !== "" && !checkPassword()) {
      showToast("Error", "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character", "error");
      return;
    }

    try {
      const res = await fetch("/api/users/updateUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputs, profilePic: imgUrl }),
      });
      const data = await res.json(); // updated user
      if (res.status === 200) {
        showToast("Success", "Profile updated successfully", "success");
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        handleSaveClick();
        if (document.getElementById("oldpassword") !== null && document.getElementById("newpassword") !== null) {
          emptyNewPassword();
          emptyOldPassword();
        }
      } else {
        showToast("Error", data.message, "error");
      }

    } catch (error) {
      showToast("Error", "Image size is too large", "error");
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const emptySpeudo = () => {
    setInput({ ...inputs, name: "" });
    const input = document.getElementById("name");
    input.value = "";
  }

  const emptyEmail = () => {
    setInput({ ...inputs, email: "" });
    const input = document.getElementById("email");
    input.value = "";
  }

  const emptyOldPassword = () => {
    setInput({ ...inputs, oldpassword: "" });
    const input = document.getElementById("oldpassword");
    input.value = "";
  }

  const emptyNewPassword = () => {
    setInput({ ...inputs, newpassword: "" });
    const input = document.getElementById("newpassword");
    input.value = "";
  }

  const emptyBio = () => {
    setInput({ ...inputs, bio: "" });
    const input = document.getElementById("bio");
    input.value = "";
  }

  return (
    <>
      <div className="h-[100vh]">
        <Menu />
        <div className="md:flex md:justify-between">
          <Drawer />
          <main className="w-full p-5">

            <h2 className="text-2xl">{t("Account")}</h2>
            <div>
              <form className="flex flex-col items-center mb-12">
                {isEditing ? (
                  <div className="flex items-center w-full md:w-[350px]">
                    <>
                      <Avatar
                        boxShadow={"md"}
                        alt="Remy Sharp"
                        src={imgUrl || user.profilePic}
                        style={{ width: 150, height: 150 }}
                      />
                      <Button bg="blue.400" color="white" borderRadius="md" m="2" p="2"
                        className="hover:bg-blue-500 active:bg-blue-600 focus:ring-blue-500"
                        onClick={() => fileRef.current.click()}
                      >{t("Change profile picture")}</Button>
                      <Input type="file" hidden ref={fileRef} accept="image/*" onChange={handleImageChange} />
                    </>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full md:w-[350px]">
                    <Avatar
                      boxShadow={"md"}
                      alt="Remy Sharp"
                      src={imgUrl || user.profilePic}
                      style={{ width: 150, height: 150 }}
                    />
                  </div>
                )}
                <div className="flex items-center justify-end w-full md:w-[350px]">
                  {isEditing ? (
                    <IconButton
                      icon={<SmallCloseIcon
                        style={{ width: 24, height: 24, margin: 8 }}
                      />}
                      onClick={handleSaveClick}
                    />
                  ) : (
                    <Pencil
                      color="#EDEEF0"
                      className="m-2"
                      onClick={handleEditClick}
                    />
                  )}
                  <Cog color="#EDEEF0" className="m-2" />
                  <LanguageSelector />
                </div>
                <div className="flex items-center w-full md:w-[350px] flex-col">
                  <div className="flex items-center w-full md:w-[350px]">
                    <p>{t("Speudo")}</p>
                  </div>
                  <div className="flex items-center justify-center w-full md:w-[350px] border border-border rounded-lg ml-5 mr-5 mb-5 p-2">
                    {isEditing ? (
                      <>
                        <Input placeholder={t("Speudo")}
                          defaultValue={inputs.name}
                          id="name"
                          className="text-center w-full"
                          onChange={(e) => setInput({ ...inputs, name: e.target.value })} />
                        <IconButton
                          icon={<SmallCloseIcon />}
                          onClick={emptySpeudo}
                        />
                      </>
                    ) : (
                      <>
                        <p>{inputs.name}</p>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center w-full md:w-[350px] flex-col">
                  <div className="flex items-center w-full md:w-[350px]">
                    <p>{t("Email")}</p>
                  </div>
                  <div className="flex items-center justify-center w-full md:w-[350px] border border-border rounded-lg ml-5 mr-5 mb-5 p-2">
                    {isEditing ? (
                      <>
                        <Input placeholder={t("Email")}
                          defaultValue={inputs.email}
                          id="email"
                          className="text-center w-full"
                          onChange={(e) => setInput({ ...inputs, email: e.target.value })} />
                        <IconButton
                          icon={<SmallCloseIcon />}
                          onClick={emptyEmail}
                        />
                      </>
                    ) : (
                      <>
                        <p>{inputs.email}</p>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center w-full md:w-[350px] flex-col">
                  <div className="flex items-center w-full md:w-[350px]">
                    <p>{t("Password")}</p>
                  </div>
                  <div className="flex items-center justify-center w-full md:w-[350px] border border-border rounded-lg ml-5 mr-5 mb-5 p-2">
                    {isEditing ? (
                      <div className="flex items-center w-full md:w-[350px] flex-col">
                        <p className="w-full md:w-[350px] pl-2"
                        >{t("Old password")}</p>
                        <div className="flex items-center w-full md:w-[350px] p-2">
                          <InputGroup>
                            <Input type={showOldPassword ? 'text' : 'password'} placeholder={t("Old password")}
                              onChange={(e) => setInput({ ...inputs, oldpassword: e.target.value })}
                              value={inputs.oldpassword}
                              id="oldpassword"
                              className="text-center w-full"
                            />
                            <InputRightElement h={'100%'} w={'3rem'}>
                              <Button
                                variant={'ghost'}
                                onClick={() =>
                                  setShowOldPassword((showOldPassword) => !showOldPassword)
                                }>
                                {showOldPassword ? <ViewIcon /> : <ViewOffIcon />}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                          <IconButton
                            icon={<SmallCloseIcon />}
                            onClick={emptyOldPassword}
                          />
                        </div>
                        <p className="w-full md:w-[350px] pl-2"
                        >{t("New password")}</p>
                        <div className="flex items-center w-full md:w-[350px] p-2">
                          <InputGroup>
                            <Input type={showNewPassword ? 'text' : 'password'} placeholder={t("New password")}
                              onChange={(e) => setInput({ ...inputs, newpassword: e.target.value })}
                              value={inputs.newpassword}
                              id="newpassword"
                              className="text-center w-full"
                            />
                            <InputRightElement h={'100%'} w={'3rem'}>
                              <Button
                                variant={'ghost'}
                                onClick={() =>
                                  setShowNewPassword((showNewPassword) => !showNewPassword)
                                }>
                                {showNewPassword ? <ViewIcon /> : <ViewOffIcon />}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                          <IconButton
                            icon={<SmallCloseIcon />}
                            onClick={emptyNewPassword}
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <p>********</p>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center w-full md:w-[350px] flex-col">
                  <div className="flex items-center w-full md:w-[350px]">
                    <p>{t("Bio")}</p>
                  </div>
                  <div className="flex items-center justify-center w-full md:w-[350px] border border-border rounded-lg ml-5 mr-5 mb-5 p-2">
                    {isEditing ? (
                      <>
                        <Textarea placeholder={t("Bio")}
                          defaultValue={inputs.bio}
                          id="bio"
                          className="text-center h-[150px] w-full"
                          rounded={"md"}
                          background={"#2e3135"}
                          onChange={(e) => setInput({ ...inputs, bio: e.target.value })} />
                        <IconButton
                          icon={<SmallCloseIcon />}
                          onClick={emptyBio}
                        />
                      </>
                    ) : (
                      <>
                        <Text>{(inputs.bio === undefined || inputs.bio === "") ? t("No bio") : inputs.bio}</Text>
                      </>
                    )}
                  </div>
                </div>
                {isEditing ? (
                  <Button bg="blue.400" color="white" borderRadius="md" m="2" pl="10" pr="10" pt="5" pb="5"
                    type="submit"
                    className="hover:bg-blue-500 active:bg-blue-600 focus:ring-blue-500"
                    onClick={handleSubmit}>{t("Save")}</Button>
                ) : null}

              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}



