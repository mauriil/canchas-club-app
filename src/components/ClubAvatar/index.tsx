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
    secondary: string;
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
      setLogoUrl(`https://ui-avatars.com/api/?name=${props.title}&background=${props.colors.primary}&color=${props.colors.secondary}`);
    }
  }, [props.logo, props.title, props.colors.primary, props.colors.secondary]);

  return (
    <Box textAlign="center">
      <Avatar
        alt={props.title}
        src={logoUrl}
        sx={{
          width: props.width,
          height: props.height,
          fontSize: "15rem",
          cursor: "pointer",
          backgroundColor: props.colors.primary,
          borderColor: props.colors.secondary,
          borderWidth: "0.5rem",
          borderStyle: "solid",
        }}
      />
      <div
        style={{
          fontSize: screenWidth < 900 ? "1.5rem" : "2rem",
          fontWeight: "bold",
          fontFamily: "sans-serif",
          color: "primary.main",
          marginTop: "0.5rem",
          marginBottom: "1.5rem",
        }}
      >
        {props.title}
      </div>
    </Box>
  );
};

export default ClubAvatar;