import { ThemeProvider } from "@mui/material/styles";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import theme from "../theme";
import Home from "./pages/Home";

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
