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
        width: "90%",
        margin: "auto",
        marginBottom: "1rem",
        marginTop: "1rem",
        color: "text.primary",
        borderColor: "text.primary",
        "&:hover": {
          backgroundColor: "text.primary",
          color: "background.paper",
        },
      }}
      variant="outlined"
      startIcon={props.icon}
    >
      {props.text}
    </Button>
  );
};

export default PerfilButton;
