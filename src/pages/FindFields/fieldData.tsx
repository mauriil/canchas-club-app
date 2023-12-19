/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Alert, AlertColor, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Snackbar, Typography } from '@mui/material';
import { Watch } from 'react-loader-spinner';
import HalfHourTimeSelector from './HalfHoursSelector';
import Slider from "react-slick";
import { sports, fieldType, floorType } from './dicctionary.json'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { preBooking } from '../../api/bookings';
import { set } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const FieldData = (props) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [seeDispo, setSeeDispo] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedStartTime, setSelectedStartTime] = useState('17:00');
    const [selectedEndTime, setSelectedEndTime] = useState('17:30');
    const [isBooking, setIsBooking] = useState(false);
    const [dateKey, setDateKey] = useState(null);
    const [halfHourError, setHalfHourError] = useState(false);
    const [noAvailableHours, setNoAvailableHours] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarSeverity, setSnackBarSeverity] = useState('success');
    const navigate = useNavigate();

    const normalizeDate = (date) => {
        const [year, month, day] = date.split('-').map(Number);
        return new Date(year, month - 1, day);
    };

    const availableDates = props.canchaData.availability.map((availability) => {
        return { day: normalizeDate(availability.day), status: availability.status };
    });

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const handleCloseModal = () => {
        setHalfHourError(false);
        setOpenModal(false);
    };

    const handleStartTimeChange = (event) => {
        setSelectedStartTime(event);
        if (event > selectedEndTime) {
            setSelectedEndTime(event);
        }
    };

    const handleEndTimeChange = (event) => {
        setSelectedEndTime(event);
        if (event < selectedStartTime) {
            setSelectedStartTime(event);
        }
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    const handleReservation = async () => {
        if (selectedStartTime === selectedEndTime) {
            setHalfHourError(true);
            return;
        }
        const startTime = new Date(`01/01/2007 ${selectedStartTime}`);
        const endTime = new Date(`01/01/2007 ${selectedEndTime}`);
        const difference = endTime - startTime;
        if (difference < 1920000) {
            setHalfHourError(true);
            return;
        }
        setIsBooking(true);
        const day = props.canchaData.availability.find((availability) => availability.key === dateKey)?.day;

        const responsePreBooking = await preBooking({
            time: {
                from: selectedStartTime,
                to: selectedEndTime,
                day: day,
            },
            fieldId: props.canchaData._id,
        });

        if (!responsePreBooking.bookingId) {
            setSnackBarOpen(true);
            setSnackBarMessage('Error al reservar');
            setSnackBarSeverity('error');
            setIsBooking(false);
            return;
        }
        navigate(`/reserva/${responsePreBooking.bookingId}`)

    };

    return (
        <Box>
            {/* <!-- Image --> */}
            <Box sx={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
                marginBottom: '3.5rem',
            }}>
                <Slider {...sliderSettings}>
                    {props.canchaData.photos.map((photo, index) => (
                        <div>
                            <img key={index} src={`https://canchas-club.s3.amazonaws.com/${photo}`}
                                alt={photo}
                                style={{ width: '100%', height: '400px', objectFit: 'cover', margin: '0 auto' }} />
                        </div>

                    ))}
                </Slider>
            </Box>

            <Box>
                <Box>
                    <Typography component='h1' variant='h2' align='center' overflow='hidden' whiteSpace='nowrap' textOverflow='ellipsis' marginBottom='1rem'>{props.canchaData.name}</Typography>
                    <Typography variant='h4' align='center' overflow='hidden' whiteSpace='wrap' textOverflow='ellipsis' marginBottom='1rem'>{props.canchaData.description}</Typography>
                </Box>
                <Box>
                    <Button color='primary' variant='outlined' sx={{
                        marginBottom: '1rem',
                        width: '90%',
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',

                     }} onClick={() => setSeeDispo((value) => !value)}>{seeDispo ? 'Ocultar' : 'Ver disponibilidad'}</Button>
                    {seeDispo && (
                        <div style={{ padding: '1rem' }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <div className="availability-indicator" style={{ backgroundColor: '#4ebedd', width: '8px', height: '8px', marginRight: '5px' }}></div>
                                <span style={{ marginRight: '15px' }}>Disponible</span>
                                <div className="availability-indicator" style={{ backgroundColor: '#cccccc', width: '8px', height: '8px', marginRight: '5px' }}></div>
                                <span>No Disponible</span>
                            </div>
                            <Calendar
                                value={selectedDate}
                                tileDisabled={({ date }) => !availableDates.some((dateAvail) => dateAvail.day.toDateString() === date.toDateString())}
                                onClickDay={handleDateClick}
                                tileClassName={({ date }) => {
                                    return availableDates.some((dateAvail) => dateAvail.day.toDateString() === date.toDateString() && dateAvail.status === 'available') ?
                                        'available-day'
                                        : availableDates.some((dateAvail) => dateAvail.day.toDateString() === date.toDateString()) ?
                                            'unavailable-day'
                                            : '';
                                }}
                                tile
                            />
                        </div>
                    )}
                    {selectedDate && seeDispo && (
                        <Box>
                            <Typography variant='h3' align='center' margin={1}>Precios para el {selectedDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
                            {props.canchaData.availability
                                .filter((availability) => normalizeDate(availability.day).toDateString() === selectedDate.toDateString())
                                .filter((availability) => availability.status === 'available' || availability.status === 'closed')
                                .map((availability, index) => (
                                    <Typography variant='h3' sx={{
                                        textAlign: 'center',
                                        marginBottom: '1rem',
                                        cursor: 'pointer',
                                        backgroundColor: 'background.paper',
                                        width: '90%',
                                        display: 'block',
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        borderRadius: '0.4rem',
                                        height: '2rem',
                                    }} key={index} onClick={() => {
                                        if (availability.status === 'available') {
                                            setOpenModal(true); setDateKey(availability.key); setNoAvailableHours(false);
                                        }
                                    }} >
                                        {availability.from} - {availability.to} ({
                                            availability.status === 'available' ? `$${availability.price}` : 'Cerrado'
                                        })
                                    </Typography>
                                ))}
                        </Box>
                    )}
                </Box>

                <ul style={{
                    listStyle: 'none',
                    padding: '0',
                    marginBottom: '1rem',
                }}>
                    <li>
                        <Typography variant='h4' sx={{ marginLeft: '2rem' }}>Deporte: {sports[props.canchaData.sport]}</Typography>
                    </li>
                    <li>
                        <Typography variant='h4' sx={{ marginLeft: '2rem' }}>Tipo de cancha: {fieldType[props.canchaData.fieldType]}</Typography>
                    </li>
                    <li>
                        <Typography variant='h4' sx={{ marginLeft: '2rem' }}>Tipo de piso: {floorType[props.canchaData.floorType]}</Typography>
                    </li>
                    <li>
                        <Typography variant='h4' sx={{ marginLeft: '2rem' }}>Iluminación: {props.canchaData.illumination ? 'Si' : 'No'}</Typography>
                    </li>
                </ul>

            </Box>

            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>
                    <Typography variant='h3'>
                    Reservar {props.canchaData.name}
                    </Typography>
                </DialogTitle>
                {isBooking ? (
                    <DialogContent>
                        <Grid container spacing={2} sx={{
                            maxHeight: '600px',
                            alignContent: 'center',
                            justifyContent: 'center',
                            height: '200px',
                            width: '200px',
                        }}>
                            <Watch
                                type="ThreeDots"
                                color="#00BFFF"
                                height={100}
                                width={100}
                            />
                        </Grid>
                    </DialogContent>
                ) : (
                    <>
                        <DialogContent>
                            <Typography variant="h4" color="text.secondary">
                                {selectedDate && (selectedDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))}
                            </Typography>
                            <HalfHourTimeSelector
                                day={selectedDate}
                                fromHour={
                                    props.canchaData.availability.find((availability) => availability.key === dateKey)?.from
                                }
                                toHour={
                                    props.canchaData.availability.find((availability) => availability.key === dateKey)?.to
                                }
                                onStartTimeChange={(e) => handleStartTimeChange(e.target.value)}
                                onEndTimeChange={(e) => handleEndTimeChange(e.target.value)}
                                startTime={selectedStartTime}
                                endTime={selectedEndTime}
                                halfHourError={halfHourError}
                                noAvailableHours={() => setNoAvailableHours(true)}
                            />
                        </DialogContent>
                        <DialogActions>
                            {noAvailableHours ? (
                                <Button onClick={handleCloseModal} color="primary">
                                    Aceptar
                                </Button>
                            ) : (
                                <>
                                    <Button onClick={handleCloseModal} color="warning" variant='outlined'>
                                        Cancelar
                                    </Button><Button onClick={handleReservation} color="primary" className="btn" variant='outlined'>
                                        Reservar
                                    </Button>
                                </>
                            )}
                        </DialogActions>
                    </>
                )}
            </Dialog>

            <Snackbar
                open={snackBarOpen}
                autoHideDuration={5000}
                onClose={() => setSnackBarOpen(false)}
            >
                <Alert severity={snackBarSeverity as AlertColor} onClose={() => setSnackBarOpen(false)} sx={{ width: '100%', fontSize: '15px' }} >
                    {snackBarMessage}
                </Alert>
            </Snackbar>

        </Box>
    );
}

export default FieldData;