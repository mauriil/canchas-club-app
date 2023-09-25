/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Cookies from "js-cookie";

const cookies: {
    [key: string]: string;
} = Cookies.get();
const token = cookies["access-token"];
const userId = token ? JSON.parse(atob(token.split(".")[1])).sub : null;

const BASE_API_URL = import.meta.env.VITE_BACKEND_API_URL;

const headers = {
    "Content-Type": "application/json",
    credentials: 'include',
    mode: 'cors',
    "Authorization": `Bearer ${token}`
};

export const getAllBookingsByUser = async () => {
    try {
        const response = await fetch(`${BASE_API_URL}/bookings/bytenant/${userId}`, {
            method: "GET",
            headers: { ...headers },
        });
        return response;
    } catch (error) {
        console.error("Error getting bookings by user:", error);
        throw error;
    }
}
