import axios, { axiosPrivate } from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const {auth, setAuth} = useAuth();
    
    const refresh = async() => {
        
        const response = await axiosPrivate.post('/users/refresh',{
            withCredentials: true,
            credentials: 'include',
        });
        console.log('Old token' + auth.accessToken);
        await setAuth((prev) => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return { ...prev, accessToken: response.data.accessToken };
        });
        localStorage.setItem('accessToken', response.data.accessToken);
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;