/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PlanStatus, User } from "../types/users";
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

export const getPlanStatus = async (): Promise<PlanStatus> => {
    try {
        const response = await fetch(`${BASE_API_URL}/users/${userId}/planStatus`, {
            method: "GET",
            headers,
        });
        return await response.json();
    } catch (error) {
        console.error("Error fetching getPlanStatus:", error);
        throw error;
    }
}

export const cancelPlan = async () => {
    try {
        const response = await fetch(`${BASE_API_URL}/users/${userId}/subscription/cancel`, {
            method: "GET",
            headers,
        });
        return await response.json();
    } catch (error) {
        console.error("Error fetching cancelPlan:", error);
        throw error;
    }
}

export const createPremiumSubscription = async (typeOfPlan: string): Promise<{paymentUrl: string, statusCode?: number, message: string}> => {
    try {
        const response = await fetch(`${BASE_API_URL}/users/${userId}/subscription/create/${typeOfPlan}`, {
            method: "GET",
            headers,
        });
        return await response.json();
    } catch (error) {
        console.error("Error fetching createPremiumSubscription:", error);
        throw error;
    }
}
