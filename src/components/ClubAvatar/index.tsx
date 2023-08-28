import { Avatar, Box } from "@mui/material";

interface AvatarProps {
  width: string;
  height: string;
  title: string;
  logo: string;
}

const ClubAvatar = (props: AvatarProps) => {
  return (
    <Box textAlign="center" >
      <Avatar
        alt={props.title}
        src={props.logo}
        sx={{
          width: props.width,
          height: props.height,
          fontSize: "15rem",
          backgroundColor: "primary.main",
          cursor: "pointer",
          marginRight: "1.5rem",
        }}
      />
      <div
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          fontFamily: "sans-serif",
          color: "primary.main",
          marginTop: "0.5rem",
          marginBottom: "1.5rem",
        }}
      >
        {props.title}
      </div>
    </Box>
  );
};

export default ClubAvatar;