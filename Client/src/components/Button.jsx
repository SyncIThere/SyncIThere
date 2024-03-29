import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";


export default function BasicButtons() {
  return (
    <Stack spacing={2} direction="row">
      {" "}
      <Button variant="contained" color="primary" className="text-text">
        Contained
      </Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>
  );
}
