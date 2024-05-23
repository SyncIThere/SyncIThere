import { ThemeProvider } from "@mui/material/styles";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import theme from "../theme";
import Account from "./pages/Account";
import Conversation from "./pages/Conversation";
import Discover from "./pages/Discover";
import Friends from "./pages/Friends";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import LogoutButton from "./components/LogoutButton";

const App = () => {

  const user = useRecoilValue(userAtom);
  // console.log(user);

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/friends" />} />
        <Route path="/friends" element={user ? <Friends /> : <Navigate to="/auth" />} />
        <Route path="/conversation" element={<Conversation />} />
        <Route path="/account" element={<Account />} />
        <Route path="/discover" element={<Discover />} />
      </Routes>
      {user && <LogoutButton />}
    </ThemeProvider>
  );
};

export default App;
