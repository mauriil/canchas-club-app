import {LogInUser, User} from "../contexts/userContext"

const API = 'http://localhost:3000/auth';

export const registerRequest = async (values: User) => {
    console.log(values)
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

export const verifyTokenRequest = async (token: string) => {
    return await fetch(`${API}/verifyToken`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    });
}