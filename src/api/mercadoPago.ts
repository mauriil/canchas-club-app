/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { EditUser, PlanStatus, User } from "../types/users";
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

export const checkMercadoPagoAccessToken = async (accessToken: string) => {
    try {
        const response = await fetch(`${BASE_API_URL}/payments/mercadopago/check/${accessToken}`, {
            method: "GET",
            headers,
        });
        return await response.json();
    } catch (error) {
        console.error("Error fetching getUser:", error);
        throw error;
    }
}

export const createPayment = async (payload: string) => {
    try {
        const response = await fetch(`${BASE_API_URL}/payments`, {
            method: "POST",
            headers,
            body: JSON.stringify(payload),
        });
        return await response.json();
    } catch (error) {
        console.error("Error fetching getUser:", error);
        throw error;
    }
}

export const createSubscription = async (payload: string) => {
    try {
        const response = await fetch(`${BASE_API_URL}/payments`, {
            method: "POST",
            headers,
            body: JSON.stringify(payload),
        });
        return await response.json();
    } catch (error) {
        console.error("Error fetching getUser:", error);
        throw error;
    }
}
