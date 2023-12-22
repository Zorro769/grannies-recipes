import React,{useState, useEffect} from 'react'
import useAuth from '../hooks/useAuth'
import BackGround from '../images/login-image.jpg'
import {loginUser, registerUser} from '../utils/auth.js'
import Cookies from 'universal-cookie';
const Register = () => {
    const { setAuth } = useAuth();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const cookies = new Cookies();

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(confirmPassword !== password){
            setErrMsg('Password and confirm password must be the same');
        }
        try {
            const response = await registerUser(username, email, password);
            const accessToken = response?.data?.accessToken;

            if(accessToken){
                alert("Register successfully")
            }
            localStorage.setItem('accessToken', accessToken);
                
            setEmail('');
            setPassword('');
        } catch (err) {
            console.log(err)
        }
    }
  return (
    <div className="relative h-full w-full">
        <img src={BackGround} alt="login" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className='object-cover bg-gradient-to-r from-transparent to-black to-65% absolute w-full h-full top-0 z-8 flex flex-col items-end justify-start pt-40 2xl:pt-20 px-4'>
            <div className='h-full w-[400px] z-20 text-center flex flex-col items-center'>
                <span className='text-white font-Nunito text-xl font-bold'>Granny's<span className='text-[#166534] text-2xl'>Recipes</span></span>
                <p className='text-[#1FB137] mt-5 text-base font-bold'>Register with your email address and password</p>
                <form onSubmit={handleSubmit} className='text-left w-[340px] mt-10'>
                <label className='text-[#1FB137] text-base font-bold'>
                        Username:
                        <br />
                        <input type="text" name="username" id="username" className=' border-[#1FB137] bg-black border w-full' onChange={(e) => setUsername(e.target.value)}/>
                    </label>
                    <label className='text-[#1FB137] mt-5 text-base font-bold block'>
                        Email address:
                        <br />
                        <input type="email" name="email" id="email" className=' border-[#1FB137] bg-black border w-full' onChange={(e) => setEmail(e.target.value)}/>
                    </label>
                            
                    <label className='text-[#1FB137] mt-5 text-base font-bold block'>
                        Password:
                        <br />
                        <input type="password" name="password" id="password" className='border-[#1FB137] bg-black border w-full' onChange={(e) => setPassword(e.target.value)}/>
                    </label>
                    <label className='text-[#1FB137] mt-5 text-base font-bold block'>
                        Confirm Password:
                        <br />
                        <input type="password" name="password" id="password" className='border-[#1FB137] bg-black border w-full' onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </label>
                    <div className='text-left text-orange-900 mt-5'>
                        {errMsg}
                    </div>
                    <div className="flex justify-center mt-12">
                        <button type="submit" value="Sign in" className='bg-[#166534] w-[130px] h-[45px]  rounded-3xl text-white text-xl self-center' >
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register