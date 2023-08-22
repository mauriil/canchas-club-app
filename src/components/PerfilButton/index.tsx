import { Button, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface PerfilButtonProps {
  icon: SvgIconTypeMap<"svg">;
  text: string;
  onClick: () => void;
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
