import { Avatar } from "@mui/material";

interface AvatarProps {
  width: string;
  height: string;
}

const ClubAvatar = (props: AvatarProps) => {
  return (
    <Avatar
      alt={"G"}
      src="/static/images/avatar/1.jpg"
      sx={{ width: props.width, height: props.height, fontSize: "15rem" }}
    />
  );
};

export default ClubAvatar;
