import { Box } from "@mui/material";
import ClubAvatar from "../../components/ClubAvatar";

const MiClub = () => {
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="space-around"
      width="100%"
      height="100%"
    >
      <ClubAvatar width="20vw" height="20vw" />
      <ClubAvatar width="20vw" height="20vw" />
      <ClubAvatar width="20vw" height="20vw" />
      <ClubAvatar width="20vw" height="20vw" />
      <ClubAvatar width="20vw" height="20vw" />
      <ClubAvatar width="20vw" height="20vw" />
    </Box>
  );
};

export default MiClub;
