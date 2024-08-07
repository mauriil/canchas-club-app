/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Club } from "../types/clubs";
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

export const createClub = async (values: Club) => {
    try {
        values.userId = userId;
        const response = await fetch(`${BASE_API_URL}/clubs`, {
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

export const editClub = async (values: Club, clubId: string) => {
    try {
        const response = await fetch(`${BASE_API_URL}/clubs/${clubId}`, {
            method: "PATCH",
            headers,
            body: JSON.stringify(values)
        });
        return response;
    } catch (error) {
        console.error("Error editing club:", error);
        throw error;
    }
}

export const deleteClub = async (clubId: string) => {
    try {
        const response = await fetch(`${BASE_API_URL}/clubs/${clubId}`, {
            method: "DELETE",
            headers,
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

export const checkAlias = async (alias: string) => {
    try {
        const response = await fetch(`${BASE_API_URL}/clubs/alias/check/${alias}`, {
            method: "GET",
            headers: { ...headers, "Authorization": `Bearer ${token}` },
        });
        return await response.json();
    } catch (error) {
        console.error("Error checking alias:", error);
        throw error;
    }
}
