import {LogInUser, User} from "../types/users";
import { ForgotPasswordBody } from "../types/users";

const API = `${import.meta.env.VITE_BACKEND_API_URL}/auth`;

export const registerRequest = async (values: User) => {
    return await fetch(`${API}/signUp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        credentials: 'include',
        mode: 'cors'
    });
}

export const logInRequest = async (values: LogInUser) => {
    return await fetch(`${API}/signIn`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        credentials: 'include',
        mode: 'cors'
    });
}

export const forgotPasswordRequest = async (values: ForgotPasswordBody) => {
    return await fetch(`${API}/passwordRecovery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        credentials: 'include',
        mode: 'cors'
    });
}

export const verifyTokenRequest = async (token: string) => {
    return await fetch(`${API}/verifyToken`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    });
}