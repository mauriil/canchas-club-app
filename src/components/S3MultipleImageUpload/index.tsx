/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useState } from 'react';
import uploadFilesToS3 from '../../api/uploadFileToS3';
import { Box, Grid, Input, LinearProgress, Paper, Typography } from '@mui/material';
import CanchasClubLoader from '../Loader';
import getFileFromS3 from '../../api/getFileFromS3';
import { useDropzone } from 'react-dropzone';
import { tr } from 'date-fns/locale';

interface MultipleImageUploadProps {
    onImagesUploaded: (urls: string[]) => void;
    photosArray: string[];
    folderName: string;
}

function S3MultipleImageUpload({ onImagesUploaded, photosArray, folderName }: MultipleImageUploadProps) {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [imageUploadingProgress, setImageUploadingProgress] = useState({});

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
        <Box>
            <div {...getRootProps()}>
                Subir img<input {...getInputProps()} />
            </div>
            {isLoading && <p>Cargando...</p>}
            <Grid container spacing={2} sx={{
                marginTop: 2,
            }}>
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
