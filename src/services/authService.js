import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const loginUser = async (email, password) => {
    try {

        const response = await axios.post(
            `${BASE_URL}/auth/login`,
            {
                email,
                password
            }
        );
        return response.data;
    } catch (error) {
        console.log(
            "Login Error:",
            error.response?.data
        );
        throw error;
    }
};