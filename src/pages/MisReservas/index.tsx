import { Box } from "@mui/material";
import Title from "../../components/Title";

const misReservas = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
    >
      <Title firtLineTitle="Mis" secondLineTitle="Reservas" />
    </Box>
  );
};

export default misReservas;
