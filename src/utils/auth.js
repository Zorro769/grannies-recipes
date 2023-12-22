import axios, { axiosPrivate } from '../api/axios';

export const registerUser = async (username, email, password) => {
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    var body = JSON.stringify({
        username,email,password 
    });
    return axiosPrivate.post("/users/register", body);
};
export async function loginUser(email, password){
    var body = JSON.stringify({
        email, password
    });

    const response = await axiosPrivate.post("/users/login",body)

    return response;
};