/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useState } from 'react';
import uploadFilesToS3 from '../../api/uploadFileToS3';
import { Box, Button, Grid, Input, LinearProgress, Paper, Typography } from '@mui/material';
import CanchasClubLoader from '../Loader';
import getFileFromS3 from '../../api/getFileFromS3';
import { useDropzone } from 'react-dropzone';
import { tr } from 'date-fns/locale';

interface MultipleImageUploadProps {
    onImagesUploaded: (urls: string[]) => void;
    photosArray: string[];
    folderName: string;
    onRemoveImage: (photo: string) => void;
}

function S3MultipleImageUpload({ onImagesUploaded, photosArray, folderName, onRemoveImage }: MultipleImageUploadProps) {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [imageUploadingProgress, setImageUploadingProgress] = useState({});
    const [imageHovered, setImageHovered] = useState(Array.from({ length: photosArray.length }, () => false));


    const handleMouseEnter = (index) => {
        const newHoveredState = Array.from({ length: photosArray.length }, () => false);
        newHoveredState[index] = true;
        setImageHovered(newHoveredState);
    };

    const handleMouseLeave = () => {
        setImageHovered(Array.from({ length: photosArray.length }, () => false));
    };

    const handleUpload = async (files) => {
        setSelectedFiles(files);
        if (files.length === 0) {
            return;
        }

        setIsLoading(true);

        const uploadPromises = files.map((file) => uploadFilesToS3(folderName, file.name, file, (progress) => {
            setImageUploadingProgress((prev) => ({
                ...prev,
                [file.name]: progress,
            }));
        }));

        try {
            const uploadedFiles = await Promise.all(uploadPromises);

            // Llamar a la función onImagesUploaded y pasar el array de URLs
            onImagesUploaded(uploadedFiles);

            // Hacer algo con las rutas de los archivos cargados, por ejemplo, guardarlas en el estado
            console.log('Archivos cargados:', uploadedFiles);
        } catch (error) {
            console.error('Error al subir archivos:', error);
        }

        setIsLoading(false);
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        multiple: true,
        onDrop: handleUpload,
    });

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Button variant="contained" color="primary" sx={{
                    marginTop: 2,
                }}>
                    Añadir imágenes
                </Button>
            </div>
            <Grid container spacing={2} sx={{
                marginTop: 2,
                justifyContent: 'center',
                justifyItems: 'center',
            }}>
                {selectedFiles.map((file, index) => (
                    imageUploadingProgress[file.name] && imageUploadingProgress[file.name] !== 100 &&
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Paper elevation={3}>
                            <Box p={2} sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}>
                                <Box mb={2}>
                                    <CanchasClubLoader width="10%" />
                                    <LinearProgress
                                        variant="determinate"
                                        value={imageUploadingProgress[file.name]}
                                    />
                                    <Typography variant="body2" color="textSecondary">
                                        {`${imageUploadingProgress[file.name]}%`}
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
                {photosArray.length !== 0 && (
                    photosArray.map((photo, index) => (
                        <Grid item key={index} >
                            <Paper elevation={8} sx={{ width: '300px', height: '200px' }}>
                                <Box
                                    mb={2}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={() => handleMouseLeave(index)}
                                    sx={{
                                        position: 'relative',
                                        width: '100%',
                                        height: '100%',
                                    }}
                                >
                                    <img
                                        src={`https://canchas-club.s3.amazonaws.com/${photo}`}
                                        alt={photo}
                                        style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: imageHovered[index] ? 0.7 : 1 }}
                                        loading='lazy'
                                    />
                                    {imageHovered[index] && (
                                        <Button variant="contained" color="error" onClick={() => onRemoveImage(photo)} sx={{
                                            position: 'absolute',
                                            bottom: '50%',
                                            left: '50%',
                                            transform: 'translateX(-50%) translateY(50%)',
                                        }}>
                                            Eliminar
                                        </Button>
                                    )}
                                </Box>
                            </Paper>
                        </Grid>

                    ))

                )}
            </Grid>
        </Box>
    );
}

export default S3MultipleImageUpload;
