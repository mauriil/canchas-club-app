import { useAuth } from "../../customHooks/useAuth";
import Title from "../../components/Title";
import logo from "../../assets/images/canchasCubLogo.png";
import BottomNavigation from "../../components/BottomNavigation";
import { Box } from "@mui/material";

const Dashboard = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <Box
      sx={{
        flexDirection: { md: "row", xs: "column" },
      }}
      display="flex"
      justifyContent="space-between"
      bgcolor={"primary.dark"}
      alignItems="center"
      height="100vh"
      width="100vw"
    >
      <Title firtLineTitle={user ? user.userName : ""} />
      <BottomNavigation />
    </Box>
  );
};

export default Dashboard;
