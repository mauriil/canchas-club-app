import { Box } from "@mui/material";
import canchasClubLoaderGif from "../../assets/images/canchasClubLoader.gif";

const CanchasClubLoader = () => {

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: 'auto',
            }}
        >
            <img src={canchasClubLoaderGif} alt="Cargando..." />
        </Box>
    );
};

export default CanchasClubLoader;
