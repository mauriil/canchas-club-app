/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useState, useEffect } from "react";
import { Alert, AlertColor, Box, Button, Snackbar } from "@mui/material";
import ClubAvatar from "../../components/ClubAvatar";
import { getAllClubsByUser } from "../../api/clubs";
import { Club } from "../../types/clubs";
import { Link, useNavigate } from "react-router-dom";
import { getPlanStatus } from "../../api/users";
import { PlanStatus } from "../../types/users";
import CanchasClubLoader from "../../components/Loader";

const MiClub = () => {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState("success");
  const handelSnackClose = () => {
    setSnackBarOpen(false);
  }
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clubsResponse = await getAllClubsByUser();

        if (clubsResponse.ok) {
          const data = await clubsResponse.json() as Club[];
          setClubs(data);
        } else {
          console.error("Error fetching clubs:", clubsResponse.statusText);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching clubs:", error);
        setIsLoading(false);
      }
    };

    fetchData().catch(error => {
      console.error("Error in fetchData:", error);
      setIsLoading(false);
    });
  }, []);

  const handleCreateClub = async () => {
    try {
      const planStatus: PlanStatus = await getPlanStatus();
      if (planStatus.remainingClubCreations > 0) {
        navigate("/dashboard/miClub/new");
      } else {
        setSnackBarMessage("No tienes más creaciones de club disponibles, actualiza tu plan");
        setSnackBarSeverity("error");
        setSnackBarOpen(true);
      }
    } catch (error) {
      console.error("Error creating club:", error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      height="100%"
      paddingBottom="1rem"
      paddingTop="3rem"
      sx={{
        backgroundColor: { xs: "background.paper" },
      }}
    >
      <Box
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
        width="100%"
        flexGrow={1}
        overflow="auto"
      >
        {isLoading ? (
          <CanchasClubLoader width="80%" />
        ) :
        clubs.length > 0 ? (
          clubs.map((club: Club) => (
            <Link key={club._id} to={`${club._id}`}>
              <ClubAvatar
                key={club._id}
                width="20vw"
                height="20vw"
                title={club.name}
                logo={club.logo}
                colors={club.colors}
              />
            </Link>
          )))
          :
          (<Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
          >
            <h1>No tienes ningún club</h1>
          </Box>)
        }
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        marginTop="1rem"
        paddingTop="1rem"
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleCreateClub}
          sx={{
            backgroundColor: { xs: "primary.main" },
            color: { xs: "common.white" },
          }}
        >
          Crear Nuevo Club
        </Button>
        <Snackbar open={snackBarOpen} autoHideDuration={5000} onClick={handelSnackClose} onClose={handelSnackClose}>
          <Alert severity={snackBarSeverity as AlertColor} sx={{ width: '100%', fontSize: '15px' }} onClose={handelSnackClose}>
            {snackBarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default MiClub;
