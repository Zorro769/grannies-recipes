import React, {useState} from 'react'
import axiosPrivate from '../api/axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      localStorage.setItem('email', email);
        await axiosPrivate.post('/users/forget-password', {email: email});
    } catch (err) {
        console.log(err)
    }
}
  

  return (
    <div className='w-full h-full bg-black text-center p-1'>
        <span className='text-[#1FB137] text-2xl bold'>Forgot password</span>
        <p className='text-[#1FB137] text-base bold mt-2'>Please enter your email which was registerd</p>
        <div className='text-center inline-block mt-2'>
          <form onSubmit={handleSubmit}>
          <label className='text-[#1FB137] mt-5 text-base font-bold block'>
            <input type="email" name="email" id="email" className='w-[300px] text-[#1FB137 border-[#1FB137] bg-black border w-full' onChange={(e) => setEmail(e.target.value)}/>
          </label>
          <p className='text-[#1FB137] text-base bold mt-3'>We will send a letter on your email to set new password</p>
                <button type="submit" value="Sign in" className='bg-[#166534] w-[100px] h-[30px] mt-3 rounded-3xl text-white text-xl self-center' >
                  Send 
                </button>
          </form>
          
        </div>
        <div className="text-center mt-5">

            </div>
    </div>
  )
}

export default ForgotPassword