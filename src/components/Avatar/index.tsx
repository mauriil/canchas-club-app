import { Avatar } from "@mui/material";
import { useAuth } from "../../customHooks/useAuth";

interface AvatarProps {
  width: string;
  height: string;
}

const AvatarIcon = (props: AvatarProps) => {
  const { user } = useAuth();

  return (
    <Avatar
      alt={user?.userName}
      src="/static/images/avatar/1.jpg"
      sx={{ width: props.width, height: props.height }}
    />
  );
};

export default AvatarIcon;
