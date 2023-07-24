import {User} from "../contexts/userContext"

const API = 'http://localhost:3000/auth';

export const registerRequest = async (values: User) => {
    console.log(values)
    return await fetch(`${API}/signUp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
    });
}

export const logInRequest = async (values: User) => {
    return await fetch(`${API}/signIn`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
    });
}