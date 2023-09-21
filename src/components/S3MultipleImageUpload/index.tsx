/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useState } from 'react';
import uploadFilesToS3 from '../../api/uploadFileToS3';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import CanchasClubLoader from '../Loader';
import getFileFromS3 from '../../api/getFileFromS3';

interface MultipleImageUploadProps {
    onImagesUploaded: (urls: string[]) => void;
    photosArray: string[];
    folderName: string;
}

function S3MultipleImageUpload({ onImagesUploaded, photosArray, folderName }: MultipleImageUploadProps) {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [imageUploadingProgress, setImageUploadingProgress] = useState({});

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            return;
        }

        setIsLoading(true);

        const uploadPromises = selectedFiles.map((file) => uploadFilesToS3(folderName, file.name, file, (progress) => {
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

    return (
        <Box>
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
            />
            <button onClick={handleUpload} disabled={isLoading || selectedFiles.length === 0}>
                Subir Imágenes
            </button>
            {isLoading && <p>Cargando...</p>}
            <Grid container spacing={2}>
                {selectedFiles.map((file, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Paper elevation={3}>
                            <Box p={2} sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}>
                                {imageUploadingProgress[file.name] && imageUploadingProgress[file.name] !== 100 && (
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
                                )}
                                {imageUploadingProgress[file.name] && imageUploadingProgress[file.name] === 100 && (
                                    <img
                                        src={`https://canchas-club.s3.amazonaws.com/${photosArray.filter((photo) => photo.includes(file.name))}`}
                                        alt={file.name}
                                        style={{ maxWidth: '50%', maxHeight: '50%' }}
                                    />
                                )}
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default S3MultipleImageUpload;
