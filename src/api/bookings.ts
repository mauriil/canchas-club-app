/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Cookies from "js-cookie";
import { Booking } from "../types/booking";

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
        const response = await fetch(`${BASE_API_URL}/bookings/byuser/${userId}`, {
            method: "GET",
            headers: { ...headers },
        });
        return response;
    } catch (error) {
        console.error("Error getting bookings by user:", error);
        throw error;
    }
}

export const getBooking = async (bookingId: string) => {
    try {
        const response = await fetch(`${BASE_API_URL}/bookings/${bookingId}`, {
            method: "GET",
            headers: { ...headers },
        });
        return await response.json();
    } catch (error) {
        console.error("Error getting bookings by user:", error);
        throw error;
    }
}

export const createBooking = async (values: Booking) => {
    try {
        const response = await fetch(`${BASE_API_URL}/bookings`, {
            method: "POST",
            headers,
            body: JSON.stringify(values)
        });
        return await response.json();
    } catch (error) {
        console.error("Error creating club:", error);
        throw error;
    }
}

export const cancelBooking = async (bookingId: string) => {
    try {
        const response = await fetch(`${BASE_API_URL}/bookings/${bookingId}`, {
            method: "DELETE",
            headers: { ...headers },
        });
        return await response.json();
    } catch (error) {
        console.error("Error deleting club:", error);
        throw error;
    }
}

export const checkAvailability = async (values: any) => {
    try {
        const response = await fetch(`${BASE_API_URL}/bookings/checkavailability`, {
            method: "POST",
            headers,
            body: JSON.stringify(values)
        });
        return await response.json();
    } catch (error) {
        console.error("Error creating club:", error);
        throw error;
    }
}
