/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useState, useEffect } from "react";
import { Alert, AlertColor, Box, Button, Pagination, Snackbar } from "@mui/material";
import ClubAvatar from "../../components/ClubAvatar";
import { getAllClubsByUser } from "../../api/clubs";
import { Club } from "../../types/clubs";
import { Link, useNavigate } from "react-router-dom";
import { getPlanStatus } from "../../api/users";
import { PlanStatus } from "../../types/users";
import CanchasClubLoader from "../../components/Loader";
import { Field, FieldResponse } from "../../types/fields";
import { getAll } from "../../api/fields";
import FieldData from "./fieldData";
import TopBar from "../../components/TopBar";
import useScreenSize from "../../customHooks/screenSize";
import FieldFilters from "../../components/FieldFilters/FieldFilters";
import Cookies from "js-cookie";

const FindFields = () => {
  const screenWidth = useScreenSize().width;
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState("success");
  const handelSnackClose = () => {
    setSnackBarOpen(false);
  }
  const [fields, setFields] = useState<Field[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    sport: "",
    fieldType: "",
    floorType: "",
    illumination: "",
    availability: "",
    province: "",
    department: "",
  });
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchData = async (filters: {
    sport: string,
    fieldType: string,
    floorType: string,
    illumination: string,
    availability: string,
    province: string,
    department: string,
    page?: number,
  }) => {
    try {
      let queryString = "";
      for (const [key, value] of Object.entries(filters)) {
        if (value !== "") {
          queryString += `${key}=${value}&`;
        }
      }
      const fieldsResponse = await getAll(queryString);

      if (fieldsResponse.ok) {
        const data = await fieldsResponse.json() as FieldResponse;
        setFields(data.fields);
        setTotalPages(data.totalPages);
      } else {
        console.error("Error fetching fields:", fieldsResponse.statusText);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching fields:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchData(filters).catch(error => {
      console.error("Error in fetchData:", error);
      setIsLoading(false);
    });
  }, []);

  const changeFilter = (filterName: string, filterValue: string) => {
    if (filterName === 'owner-fields') {
      if (filterValue) {
        const cookies: {
          [key: string]: string;
        } = Cookies.get();
        const token = cookies["access-token"];
        const userId = token ? JSON.parse(atob(token.split(".")[1])).sub : null;
        void fetchData({ ...filters, 'owner-fields': userId }).catch(error => {
          console.error("Error in fetchData:", error);
          setIsLoading(false);
        });
        return;
      } else {
        void fetchData(filters).catch(error => {
          console.error("Error in fetchData:", error);
          setIsLoading(false);
        });
        return;
      }
    } else {
      setFilters({ ...filters, [filterName]: filterValue });
    }
    setIsLoading(true);
    void fetchData({ ...filters, [filterName]: filterValue }).catch(error => {
      console.error("Error in fetchData:", error);
      setIsLoading(false);
    });
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setIsLoading(true);
    void fetchData({ ...filters, page: value }).catch(error => {
      console.error("Error in fetchData:", error);
      setIsLoading(false);
    });
  }

  return (
    <>
      <TopBar />
      <FieldFilters onFilterChange={changeFilter} />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        height="100%"
        paddingBottom="1rem"
        sx={{
          backgroundColor: { xs: "background.paper" },
        }}
      >
        <Box
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
          width={screenWidth < 900 ? "95%" : "100%"}
          flexGrow={1}
          gap={{ xs: 2 }}
        >
          {isLoading ? (
            <Box flexWrap='wrap' sx={{
              width: '100%',
              height: 'auto',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '1rem',
            }}>
              <CanchasClubLoader width="80%" />
            </Box>
          ) :
            fields.length > 0 ? (
              fields.map((field: Field) => (
                <Box key={field._id} sx={{
                  width: screenWidth < 900 ? '100%' : '33.33%',
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                }}>
                  <FieldData canchaData={field} />
                </Box>
              ))
            )
              :
              (<Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
                height="100%"
              >
                <h1>No hay canchas disponibles</h1>
              </Box>)}

          {fields.length > 0 && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
              sx={{
                backgroundColor: 'white',
                padding: '1rem',
                marginBottom: screenWidth < 900 ? '5rem' : '0px'
              }}
            >
              <Pagination count={totalPages} color="primary" variant="outlined" siblingCount={0} onChange={handlePageChange} />
            </Box>
          )}
        </Box>
        <Snackbar open={snackBarOpen} autoHideDuration={5000} onClick={handelSnackClose} onClose={handelSnackClose}>
          <Alert severity={snackBarSeverity as AlertColor} sx={{ width: '100%', fontSize: '15px' }} onClose={handelSnackClose}>
            {snackBarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default FindFields;
