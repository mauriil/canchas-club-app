import { Alert, Box, Divider } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RoomIcon from "@mui/icons-material/Room";
import PaddleImage from "../../assets/icons/paddle.svg";

const BookingCard = ({ booking }) => {
  const image = booking.fieldId.photos[0];

  const navigateToBookingDetail = (bookingId: string) => {
    window.location.href = `detalleReserva/${bookingId}`;
  };

  return (
    <Card
      sx={{
        borderRadius: "0px 0px 25px 25px",
        height: 300,
        maxWidth: 345,
        minWidth: 300,
        display: "flex",
        borderTop: "solid",
        borderWidth: "0.5rem",
        borderColor: "#00a6c0",
        backgroundColor: "white",
      }}
      onClick={() => navigateToBookingDetail(booking._id)}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "35%",
          height: "100%",
          backgroundColor: "white",
          overflow: "hidden",
        }}
      >
        <img
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          src={`https://canchas-club.s3.amazonaws.com/${image}`}
          title={booking.fieldId.description} />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        sx={{ height: "100%", width: "65%" }}
      >
        <CardContent sx={{ height: "60%" }}>
          <Typography gutterBottom variant="h4" component="div">
            {`${booking.fieldId.clubId.name}`}
          </Typography>
          <Divider sx={{ margin: "1rem 0rem", width: "100%" }} />
          <Box display="flex" alignItems="center">
            <RoomIcon fontSize="large" color="primary" />
            <Typography variant="h6" color="primary.light">
              {booking.fieldId.clubId.address}
            </Typography>
          </Box>
          <Divider sx={{ margin: "1rem 0rem" }} />
          <Typography variant="h4" color="primary">
            {`${booking.time.from} - ${booking.time.to} hs`}
          </Typography>
          <Typography variant="h4" color="primary">
            {booking.fieldId.name}
          </Typography>
        </CardContent>
        <CardActions sx={{ width: "100%" }}>
          <Button
            sx={{ width: "100%", marginBottom: "2rem" }}
            fullWidth
            variant="contained"
            color={booking.status === 'pending' ? 'primary' :
              booking.status === 'approved - accredited' ? 'success' :
                booking.status === 'completed' ? 'success' :
                  booking.status === 'no-show' ? 'warning' :
                    booking.status === 'cancelled' ? 'error' : 'primary'}
          >
            {booking.status === 'pending' ? 'Pendiente' :
              booking.status === 'approved - accredited' ? 'Confirmado' :
                booking.status === 'completed' ? 'Completado' :
                  booking.status === 'no-show' ? 'No se presento' :
                    booking.status === 'cancelled' ? 'Cancelado' : ''}
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};

export default BookingCard;
