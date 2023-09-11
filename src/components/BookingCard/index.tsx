import { NavLink } from "react-router-dom";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";

const BookingCard = ({ booking }) => {
  return (
    <Card sx={{ height: 400, maxWidth: 345, minWidth: 300 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "250px",
          backgroundColor: "white",
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          sx={{ height: "auto", width: "100%" }}
          src={booking.image}
          title={booking.title}
        />
      </Box>
      <Box sx={{ height: 150 }}>
        <CardContent sx={{ height: 100 }}>
          <Typography gutterBottom variant="h5" component="div">
            {booking.title}
          </Typography>
          <Typography variant="h4" color="primary">
            ${booking.price}
          </Typography>
        </CardContent>
        <NavLink to={`${booking.id}`}>
          <CardActions>
            <Button
              sx={{ width: "100%" }}
              size="large"
              color="primary"
              variant="contained"
            >
              Descripcion
            </Button>
          </CardActions>
        </NavLink>
      </Box>
    </Card>
  );
};

export default BookingCard;
