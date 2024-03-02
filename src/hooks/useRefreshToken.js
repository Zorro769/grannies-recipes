import { axiosPrivate } from '../api/axios';

const useRefreshToken = () => {

    const refresh = async () => {

        const response = await axiosPrivate.get('/users/refresh', {
            withCredentials: true,
            credentials: 'include',
        });
        localStorage.setItem('accessToken', response.data.accessToken);
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;