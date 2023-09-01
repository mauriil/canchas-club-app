/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Cookies from "js-cookie";

const cookies: {
    [key: string]: string;
} = Cookies.get();
const token = cookies["access-token"];

async function getPresignedUrl(location: string) {

    const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/aws/getPresignedUrl/${location}`, {
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

async function getFileFromS3(location: string) {
    try {
        const presignedUrl = await getPresignedUrl(location);
        return presignedUrl;
    } catch (error) {
        console.error('Error al cargar el archivo:', error);
        throw error;
    }
}

export default getFileFromS3;
