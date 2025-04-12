import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token: string) => {
    console.log(token)
    const decoded = jwtDecode(token);
    if (decoded && decoded.exp) {
        return decoded?.exp * 1000 < Date.now();
    }
    return true
};