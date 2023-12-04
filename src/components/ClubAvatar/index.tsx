/* eslint-disable no-inner-declarations */
/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Box } from "@mui/material";
import { useEffect, useState } from "react";
import getFileFromS3 from "../../api/getFileFromS3";
import useScreenSize from "../../customHooks/screenSize";

interface AvatarProps {
  width: string;
  height: string;
  title: string;
  logo: string;
  colors: {
    primary: string;
  };
}

const ClubAvatar = (props: AvatarProps) => {
  const [logoUrl, setLogoUrl] = useState('');
  const screenWidth = useScreenSize().width;

  useEffect(() => {
    if (props.logo) {
      async function fetchLogo() {
        const logo = await getFileFromS3(props.logo);
        setLogoUrl(logo);
      }
      void fetchLogo();
    } else {
      setLogoUrl(`https://ui-avatars.com/api/?name=${props.title}&color=${props.colors.primary}`);
    }
  }, [props.logo, props.title, props.colors.primary]);

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "150px",
      padding: "1rem",
      backgroundColor: "background.paper",
    }}>
      <Avatar
        alt={props.title}
        src={logoUrl}
        sx={{
          width: props.width,
          height: props.height,
          fontSize: "15rem",
          cursor: "pointer",
          backgroundColor: props.colors.primary,
          borderColor: props.colors.primary,
          borderWidth: "0.5rem",
          borderStyle: "solid",
          boxShadow: "0px 0px 10px 0.5px rgb(0,0,0)",
        }}
      />
      <Box
        style={{
          fontSize: screenWidth < 900 ? "1.5rem" : "2rem",
          fontWeight: "bold",
          fontFamily: "sans-serif",
          color: "primary.main",
          marginTop: "0.5rem",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        {props.title}
      </Box>
    </Box>
  );
};

export default ClubAvatar;