import { Box } from "@mui/material";
import { useAuth } from "../../customHooks/useAuth";
import Title from "../../components/Title";
import logo from "../../assets/images/canchasCubLogo.png";

const Dashboard = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <Box
      sx={{
        flexDirection: { md: "row", xs: "column" },
      }}
      display="flex"
      justifyContent="space-around"
      bgcolor={"primary.dark"}
      alignItems="center"
      height="100vh"
      width="100vw"
    >
      <Title firtLineTitle={user ? user.userName : ""} />
    </Box>
  );
};

export default Dashboard;
