import { Box } from "@mui/material";
import Title from "../../components/Title";

const NotFoundPage = () => {
  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Title firtLineTitle="PAGE" secondLineTitle="NOT FOUND" />
    </Box>
  );
};

export default NotFoundPage;
