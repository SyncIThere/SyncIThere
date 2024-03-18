import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";

export default function BasicButtons() {
  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2} direction="row">
        <Button variant="text">Text</Button>
        <Button variant="contained" color="secondary">
          Contained
        </Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>
    </ThemeProvider>
  );
}
