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

export const getUser = async (userIdToGet: string = userId): Promise<User> => {
    try {
        const response = await fetch(`${BASE_API_URL}/users/${userIdToGet}`, {
            method: "GET",
            headers,
        });
        return await response.json();
    } catch (error) {
        console.error("Error fetching getUser:", error);
        throw error;
    }
}

export const updateUser = async (user: EditUser): Promise<User> => {
    console.log("🚀 ~ file: users.ts:37 ~ updateUser ~ user:", user)
    try {
        const response = await fetch(`${BASE_API_URL}/users/${userId}`, {
            method: "PATCH",
            headers,
            body: JSON.stringify(user),
        });
        return await response.json();
    } catch (error) {
        console.error("Error fetching updateUser:", error);
        throw error;
    }
}

export const updateUserPassword = async (oldPassword: string, newPassword: string) => {
    try {
        const response = await fetch(`${BASE_API_URL}/auth/newPassword/${userId}`, {
            method: "PATCH",
            headers,
            body: JSON.stringify({oldPassword, newPassword}),
        });
        return await response.json();
    } catch (error) {
        console.error("Error fetching updateUserPassword:", error);
        throw error;
    }
}

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
