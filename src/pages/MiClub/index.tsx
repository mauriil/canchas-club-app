import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import ClubAvatar from "../../components/ClubAvatar";
import { getAllClubsByUser } from "../../api/clubs";
import { Club } from "../../types/clubs";
import { Link } from "react-router-dom";

const MiClub = () => {
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
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    fetchData().catch(error => {
      console.error("Error in fetchData:", error);
    });
  }, []);

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
        {clubs.map((club: Club) => (
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
        ))}
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
        >
          Agregar club +
        </Button>
      </Box>
    </Box>
  );
};

export default MiClub;
