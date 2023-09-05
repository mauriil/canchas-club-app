import { ArrowBack } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';

interface UserProfilePlanStatusProps {
    onItemClick: (option: string) => void;
}
const UserProfilePlanStatus = ({onItemClick}: UserProfilePlanStatusProps) => {

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
            height="100%"
            width="100%"
            borderRadius="15px"
            sx={{
                backgroundColor: { md: 'background.paper' },
                boxShadow: { md: '0px 0px 25px 1px rgb(0,0,0)' },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#F5F5F5",
                    borderBottom: "1px solid #E0E0E0",
                    width: "100%",
                    padding: "1rem",
                }}
            >
                <IconButton >
                    <ArrowBack onClick={() => onItemClick('menu')}/>
                </IconButton>
            </Box>
            <p>HOLA</p>
        </Box>
    );
};

export default UserProfilePlanStatus;
