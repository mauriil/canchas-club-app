import { Box } from "@mui/material";
import canchasClubLoaderGif from "../../assets/images/canchasClubLoader.gif";

interface CanchasClubLoaderProps {
    width?: string;
    height?: string;
}

const CanchasClubLoader = ({width, height}: CanchasClubLoaderProps) => {

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: 'auto',
            }}
        >
            <img src={canchasClubLoaderGif} alt="Cargando..." height={height ? height : '100%'} width={width ? width : '100%'}/>
        </Box>
    );
};

export default CanchasClubLoader;
