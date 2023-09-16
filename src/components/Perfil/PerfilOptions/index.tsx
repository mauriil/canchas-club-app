import { Box } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BusinessIcon from '@mui/icons-material/Business';
import KeyIcon from '@mui/icons-material/Key';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import PerfilButton from '../PerfilButton';
import { useAuth } from "../../../customHooks/useAuth";


interface UserProfileOptionsProps {
    isPremium: boolean;
    onItemClick: (option: string) => void;
}

const UserProfileOptions = ({ isPremium, onItemClick }: UserProfileOptionsProps) => {
    const { logOut } = useAuth();

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
            padding={{ md: '3rem' }}
        >
            <PerfilButton text="Editar Perfil" icon={<PersonOutlineIcon />} />
            {isPremium ? (
                <PerfilButton text="Mi plan" icon={<AccountBalanceWalletIcon />} onClick={() => onItemClick('myPlan')}  />
            ) : (
                <PerfilButton text="Soy dueño de un club" icon={<BusinessIcon />} onClick={() => onItemClick('showPlans')} />
            )}
            <PerfilButton text="Mercado Pago token" icon={<KeyIcon />} />
            <PerfilButton
                onClick={logOut}
                text="Cerrar sesion"
                icon={<LogoutIcon />}
            />
        </Box>
    );
};

export default UserProfileOptions;
