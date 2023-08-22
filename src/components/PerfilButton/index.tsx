import { Button } from "@mui/material";

interface PerfilButtonProps {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}

const PerfilButton = (props: PerfilButtonProps) => {
  return (
    <Button
      onClick={props.onClick}
      sx={{
        borderRadius: "5px",
      }}
      variant="outlined"
      startIcon={props.icon}
    >
      {props.text}
    </Button>
  );
};

export default PerfilButton;
