/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { LogInUser, User } from "../types/users";
import { ForgotPasswordBody } from "../types/users";
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
    mode: 'cors'
};

export const create = async (values: User) => {
    try {
        const response = await fetch(`${BASE_API_URL}/clubs/`, {
            method: "POST",
            headers,
            body: JSON.stringify(values)
        });
        return response;
    } catch (error) {
        console.error("Error creating club:", error);
        throw error;
    }
}

export const edit = async (values: LogInUser, clubId: string) => {
    try {
        const response = await fetch(`${BASE_API_URL}/clubs/${clubId}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(values)
        });
        return response;
    } catch (error) {
        console.error("Error editing club:", error);
        throw error;
    }
}

export const deleteClub = async (values: ForgotPasswordBody, clubId: string) => {
    try {
        const response = await fetch(`${BASE_API_URL}/clubs/${clubId}`, {
            method: "DELETE",
            headers,
            body: JSON.stringify(values)
        });
        return response;
    } catch (error) {
        console.error("Error deleting club:", error);
        throw error;
    }
}

export const getAllClubsByUser = async () => {
    try {
        const response = await fetch(`${BASE_API_URL}/clubs/${userId}`, {
            method: "GET",
            headers: { ...headers, "Authorization": `Bearer ${token}` },
        });
        return response;
    } catch (error) {
        console.error("Error getting clubs by user:", error);
        throw error;
    }
}

export const getClubById = async (clubId:  string | undefined) => {
    try {
        const response = await fetch(`${BASE_API_URL}/clubs/info/${clubId}`, {
            method: "GET",
            headers: { ...headers, "Authorization": `Bearer ${token}` },
        });
        return response;
    } catch (error) {
        console.error("Error getting clubs by user:", error);
        throw error;
    }
}
