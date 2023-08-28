import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ClubAvatar from "../../components/ClubAvatar";
import { getAllClubsByUser } from "../../api/clubs";
import { Club } from "../../types/clubs";

const MiClub = () => {
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clubsResponse = await getAllClubsByUser();

        if (clubsResponse.ok) {
          const data = await clubsResponse.json() as Club[];
          console.log("🚀 ~ file: index.tsx:24 ~ fetchData ~ data:", data)
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
      flexWrap="wrap"
      alignItems="center"
      justifyContent="space-around"
      width="100%"
      height="100%"
    >
      {clubs.map((club: Club) => (
        <ClubAvatar
          key={club._id}
          width="20vw"
          height="20vw"
          title={club.name}
          logo={club.logo}
        />
      ))}
    </Box>
  );
};

export default MiClub;
