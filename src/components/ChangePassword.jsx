import React, {useState} from 'react'
import axiosPrivate from '../api/axios';
  import { useNavigate } from "react-router-dom";
const ChangePassword = ({onClose}) => {
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axiosPrivate.post("/users/change-password", {email:localStorage.getItem('email'),password: password});
  
      if (response.data === 'Password changed successfully'){
        onClose();
        navigate('/', { state: { showLoginDialog: false }, replace: true });    
      }
    }
    catch (err) {
      setErrMsg(err.message);
    }
  }
  return (
    <div className='w-full h-full bg-black text-center p-1'>
        <p className='text-[#1FB137] text-base bold mt-2'>Please enter your new password</p>
        <div className='text-center inline-block mt-2'>
          <form onSubmit={handleSubmit}>
          <label className='text-[#1FB137] mt-5 text-base font-bold block'>New password
            <input type="password" name="password" id="password" className='w-[300px] text-[#1FB137 border-[#1FB137] bg-black border w-full' onChange={(e) => setPassword(e.target.value)}/>
          </label>
          <label className='text-[#1FB137] mt-5 text-base font-bold block'>Confirm new password
            <input type="password" name="password" id="password" className='w-[300px] text-[#1FB137 border-[#1FB137] bg-black border w-full' onChange={(e) => setPassword(e.target.value)}/>
          </label>
          <div className='text-left text-orange-900 mt-5'>
              {errMsg}
          </div>
          <p className='text-[#1FB137] text-base bold mt-3'>We will change your old password to new password</p>
                <button type="submit" value="Sign in" className='bg-[#166534] w-[100px] h-[30px] mt-3 rounded-3xl text-white text-xl self-center' >
                  Change 
                </button>
          </form>
          
        </div>
        <div className="text-center mt-5">

            </div>
    </div>
  )
}

export default ChangePassword