import { ThemeProvider } from "@mui/material/styles";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import theme from "../theme";
import Friends from "./pages/Friends";
import Home from "./pages/Home";
import Inscription from "./pages/Inscription";
import Conversation from "./pages/Conversation";

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/conversation" element={<Conversation />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
