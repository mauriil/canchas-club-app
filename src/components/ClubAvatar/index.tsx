import { Avatar, Box } from "@mui/material";

interface AvatarProps {
  width: string;
  height: string;
  title: string;
  logo: string;
}

const ClubAvatar = (props: AvatarProps) => {
  return (
    <Box textAlign="center">
      <Avatar
        alt={props.title}
        src={props.logo}
        sx={{
          width: props.width,
          height: props.height,
          fontSize: "15rem",
          backgroundColor: "primary.main",
         }}
      />
      <div>{props.title}</div>
    </Box>
  );
};

export default ClubAvatar;