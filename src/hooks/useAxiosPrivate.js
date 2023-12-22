import axios, { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import Cookies from 'universal-cookie';

const useAxiosPrivate = () => {
    const refreshToken = useRefreshToken();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    try {
                        const newAccessToken = await refreshToken();
                        console.log('New access token: ' + newAccessToken);
                        // Use the returned Promise to ensure the state has been updated
                       localStorage.setItem('accessToken', newAccessToken);
                        prevRequest.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
                        return axiosPrivate(prevRequest);
                    } catch (refreshError) {
                        // Handle refresh error (e.g., redirect to login page)
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [refreshToken]);

    return axiosPrivate;
};

export default useAxiosPrivate;
