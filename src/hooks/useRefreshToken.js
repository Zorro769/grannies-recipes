import axios, { axiosPrivate } from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const {auth, setAuth} = useAuth();
    
    const refresh = async() => {
        
        const response = await axiosPrivate.post('/users/refresh',{
            withCredentials: true,
            credentials: 'include',
        });
        await setAuth((prev) => {
            return { ...prev, accessToken: response.data.accessToken };
        });
        localStorage.setItem('accessToken', response.data.accessToken);
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;