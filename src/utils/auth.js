import { axiosPrivate } from '../api/axios';

export const registerUser = async (username, email, password) => {
    var body = JSON.stringify({
        username, email, password
    });
    return axiosPrivate.post("/users/register", body, {
        headers: { 'Content-Type': 'application/json' },
    });
};
export const loginUser = async (email, password) => {
    var body = JSON.stringify({
        email, password
    });

    const response = await axiosPrivate.post("/users/login", body, {
        headers: { 'Content-Type': 'application/json' },
    })

    return response;
};

export const logoutUser = async () => {
    try {
        await axiosPrivate.get("/users/logout");
    } catch (err) {
        throw (err)
    }
}

export const isCookiesExist = async () => {
    try {
        const response = await axiosPrivate.get("/users/is-logged");
        return response.data;
    }
    catch (err) { 
        return false;
    }
}