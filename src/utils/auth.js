import { axiosPrivate } from '../api/axios';

export const registerUser = async (username, email, password) => {
    var body = JSON.stringify({
        username,email,password 
    });
    return axiosPrivate.post("/users/register", body,{
        headers: { 'Content-Type': 'application/json' },
    });
};
export async function loginUser(email, password){
    var body = JSON.stringify({
        email, password
    });

    const response = await axiosPrivate.post("/users/login",body,{
        headers: { 'Content-Type': 'application/json' },
    })

    return response;
};