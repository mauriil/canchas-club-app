import { Avatar, Box } from "@mui/material";

interface AvatarProps {
  width: string;
  height: string;
  title: string;
  logo: string;
  colors: {
    primary: string;
    secondary: string;
  };
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
          cursor: "pointer",
          backgroundColor: props.colors.primary,
          borderColor: props.colors.secondary,
          borderWidth: "0.5rem",
          borderStyle: "solid",
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