import { axiosPrivate } from "../api/axios";
import { useLayoutEffect } from "react";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
    const refreshToken = useRefreshToken();
    useLayoutEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                config.headers.Authorization =
                    !config._retry && localStorage.getItem('accessToken')
                        ? `Bearer ${localStorage.getItem('accessToken')}`
                        : config.headers.Authorization;
                return config;
            });
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
        };
    }, [localStorage.getItem('accessToken')]);
    useLayoutEffect(() => {
        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    try {
                        const newAccessToken = await refreshToken();
                        localStorage.setItem('accessToken', newAccessToken);
                        prevRequest.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
                        return axiosPrivate(prevRequest);
                    } catch (refreshError) {
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }

        );
        return () => {
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [refreshToken]);

    console.log('Everything is good...');

    return axiosPrivate;
};

export default useAxiosPrivate;
