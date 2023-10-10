/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface TopBarProps {
    backUrl?: string;
}

export default function TopBar({ backUrl }: TopBarProps) {
    const navigate = useNavigate();
    function handleGoBack(): void {
        if (backUrl) {
            navigate(backUrl);
        } else {
            navigate(-1);
        }
    }

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#F5F5F5",
                    borderBottom: "1px solid #E0E0E0",
                    position: "sticky",
                    top: "0px",
                    width: "100%",
                    zIndex: "100",
                    padding: "1rem",
                }}
            >
                <IconButton onClick={handleGoBack}>
                    <ArrowBack />
                </IconButton>
            </Box>
        </>
    );
}
