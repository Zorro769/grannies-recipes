import React,{useState, useEffect} from 'react'
import BackGround from '../images/login-image.jpg'
import {loginUser} from '../utils/auth.js'
import ForgotPassword from './ForgotPassword'
import Dialog from '@mui/material/Dialog';
import Loading from './Loading'
import Register from './Register.jsx';
import getGoogleOAuthURL from "../utils/getGoogleUrl";
import InfoDialog from './InfoDialog';
import { FaGoogle } from "react-icons/fa";

const Login = ({ onClose, handleButtonClick  }) => {
    const [openForgotPassword, setOpenForgotPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [regDialog, setRegDialog] = useState(false);
    const [infoDialog, setInfoDialog] = useState(false);

    const closeDialog = () => {
        setInfoDialog(false);
        onClose();
    }
    const handleForgotPassword = (e) => {
        e.preventDefault();
        setOpenForgotPassword(!openForgotPassword);
    };
    const handleDialogClose = (e) => {
        onClose();
        setRegDialog(false);
        setLoading(false);
    }
    const handleSignUp = (e) => {
        // onClose();  
        handleButtonClick();
        setRegDialog(true);
    }
    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser(email, password);
            setErrMsg(response.data.message)
            const accessToken = response?.data?.accessToken;
            setInfoDialog(true);
            handleButtonClick();

            localStorage.setItem('accessToken', accessToken);

            setEmail('');
            setPassword('');
        } catch (err) {
            setErrMsg(err.response.data.message);
        }
    }
  return (
    <div className="relative h-full w-full">
        <img src={BackGround} alt="login" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className='object-cover bg-gradient-to-r from-transparent to-black to-65% absolute w-full h-full top-0 z-8 flex flex-col items-end justify-start pt-40 2xl:pt-20 px-4'>
            <div className='h-full w-[400px] z-20 text-center flex flex-col items-center'>
                <span className='text-white font-Nunito text-xl font-bold'>Granny's<span className='text-[#166534] text-2xl'>Recipes</span></span>
                <p className='text-[#1FB137] mt-5 text-base font-bold'>Sign in with your email address and password</p>
                <form onSubmit={handleSubmit} className='text-left w-[340px] mt-10'>
                    <label className='text-[#1FB137] text-base font-bold'>
                        Email address:
                        <br />
                        <input type="email" name="email" id="email" required className='border-[#1FB137] bg-black border w-full' onChange={(e) => setEmail(e.target.value)}/>
                    </label>
                    <label className='text-[#1FB137] mt-5 text-base font-bold block'>
                        Password:
                        <br />
                        <input type="password" name="password" id="password" required className='border-[#1FB137] bg-black border w-full' onChange={(e) => setPassword(e.target.value)}/>
                    </label>
                    <button className='text-[#1FB137] mt-3 text-base font-bold block ml-auto flex gap-6 inline-block text-xs' onClick={handleForgotPassword} >
                        Forgot password?  
                    </button>
                    <div className='text-left text-orange-900 mt-5'>
                        {errMsg}
                    </div>
                    <div className="flex justify-center mt-12">
                        <button type="submit" value="Sign in" className='bg-[#166534] w-[130px] h-[45px]  rounded-3xl text-white text-xl self-center' >
                            Sign in
                        </button>
                    </div>
                </form>
                <div className='mt-10 text-center'>
                    <p className='text-[#1FB137]'>OR</p>
                <a className='text-[#1FB137] flex items-center justify-center text-center p-1.5 rounded-sm text-white mt-5' href={getGoogleOAuthURL()}>
    <FaGoogle size={18} /><span className='ml-1'>Login with Google</span>
</a>

                    <button onClick={handleSignUp} className='text-[#1FB137] mt-3 text-base font-bold block ml-auto flex gap-6 inline-block text-sm' 
                    >
                        Don’t have an account?Sign up 
                    </button> 
                </div>
            </div>
        </div>
        <Dialog
        open={openForgotPassword}
        onClose={handleForgotPassword}
        fullWidth
        maxWidth='xs'
        PaperProps={{ style: { height: '250px' } }}>
        <ForgotPassword onClose={handleForgotPassword}/>
      </Dialog>
      <Dialog
        open={loading}
        onClose={handleDialogClose}
        fullWidth
        maxWidth='lg'
        PaperProps={{ style: { height: '800px' } }}>
        <Loading />
      </Dialog>
      <Dialog
        open={regDialog}
        onClose={handleDialogClose}
        fullWidth
        maxWidth='lg'
        PaperProps={{ style: { height: '800px' } }}>
        <Register />
      </Dialog>
      <Dialog
            open={infoDialog}
            onClose={closeDialog}
            fullWidth
            maxWidth='xs'
            PaperProps={{ style: { height: '100px', borderradius: '50%' }}}>
            <InfoDialog info={'You have been logged in successfully'} onClose={closeDialog}/>
          </Dialog>
    </div>
    
  )
}

export default Login