/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Field } from "../types/fields";
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

export const createField = async (values: Field) => {
    try {
        const response = await fetch(`${BASE_API_URL}/fields/`, {
            method: "POST",
            headers: { ...headers, "Authorization": `Bearer ${token}` },
            body: JSON.stringify(values)
        });
        return await response.json();
    } catch (error) {
        console.error("Error creating club:", error);
        throw error;
    }
}

export const editField = async (values: Field) => {
    try {
        const response = await fetch(`${BASE_API_URL}/fields/${values._id}`, {
            method: "PATCH",
            headers: { ...headers, "Authorization": `Bearer ${token}` },
            body: JSON.stringify(values)
        });
        return response;
    } catch (error) {
        console.error("Error editing club:", error);
        throw error;
    }
}

export const deleteField = async (fieldId: string | undefined) => {
    try {
        const response = await fetch(`${BASE_API_URL}/fields/${fieldId}`, {
            method: "DELETE",
            headers: { ...headers, "Authorization": `Bearer ${token}` },
        });
        return response;
    } catch (error) {
        console.error("Error deleting club:", error);
        throw error;
    }
}

export const getFieldById = async (fieldId: string | undefined): Promise<Field> => {
    try {
        const response = await fetch(`${BASE_API_URL}/fields/${fieldId}`, {
            method: "GET",
            headers: { ...headers, "Authorization": `Bearer ${token}` },
        });
        return await response.json();
    } catch (error) {
        console.error("Error getting club by id:", error);
        throw error;
    }
}

export const getAllByClubId = async (clubId: string | undefined) => {
    try {
        const response = await fetch(`${BASE_API_URL}/fields?clubId=${clubId}`, {
            method: "GET",
            headers: { ...headers, "Authorization": `Bearer ${token}` },
        });
        return response;
    } catch (error) {
        console.error("Error getting clubs by user:", error);
        throw error;
    }
}
