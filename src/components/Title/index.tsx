import { Box, Typography } from "@mui/material";

interface TitleProps {
  firtLineTitle: string;
  secondLineTitle?: string;
}

const Title = (props: TitleProps) => {
  return (
    <Box
      sx={{ marginTop: { xs: "1rem" } }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Typography
        sx={{
          marginBottom: { xs: "1rem", sm: "1rem", md: "3rem", lg: "4rem" },
          marginTop: { xs: "1rem", sm: "1rem", md: "0rem", lg: "0rem" },
          fontSize: { xs: "3rem", sm: "4rem", md: "4rem", lg: "4rem" },
        }}
        className="size"
        width="100%"
        textAlign="center"
        fontWeight="100"
        component="h2"
        variant="h1"
        fontFamily="sportFont"
      >
        {props.firtLineTitle}
      </Typography>
      <Typography
        sx={{
          marginBottom: { xs: "1rem", sm: "1rem", md: "3rem", lg: "4rem" },
          marginTop: { xs: "1rem", sm: "1rem", md: "0rem", lg: "0rem" },
          fontSize: { xs: "2rem", sm: "2rem", md: "2rem", lg: "3rem" },
        }}
        className="size"
        width="100%"
        textAlign="center"
        fontWeight="100"
        component="h2"
        variant="h1"
        fontFamily="sportFont"
      >
        {props.secondLineTitle}
      </Typography>
    </Box>
  );
};

export default Title;
