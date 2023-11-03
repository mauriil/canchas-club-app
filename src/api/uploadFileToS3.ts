/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Cookies from "js-cookie";
import axios from 'axios';

const cookies: {
    [key: string]: string;
} = Cookies.get();
const token = cookies["access-token"];
const userId = token ? JSON.parse(atob(token.split(".")[1])).sub : null;

async function putPresignedUrl(userId: string, folder: string, fileName: string) {

    const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/aws/putPresignedUrl/${userId}/${folder}/${fileName}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            credentials: "include",
            mode: "cors",
            "Authorization": `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error('Error al obtener la URL prefirmada');
    }

    return await response.text();
}

function sanitizeFileName(fileName: string) {
    return fileName.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
}

async function uploadFileToS3(folder: string, fileName: string, file, onProgress) {
    const presignedUrl = await putPresignedUrl(userId, folder, sanitizeFileName(fileName));

    const options = {
        onUploadProgress: (progressEvent: { loaded: number; total: number; }) => {
            const percentCompleted = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            onProgress(percentCompleted);
        },
    };

    try {
        const response = await axios.put(presignedUrl, file, options);

        if (response.status !== 200) {
            throw new Error('Error al subir el archivo');
        }

        return `${userId}/${folder}/${fileName}`;
    } catch (error) {
        console.error('Error al cargar el archivo:', error);
        throw error;
    }
}

export default uploadFileToS3;
