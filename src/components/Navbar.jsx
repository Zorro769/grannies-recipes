import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Login from './Login.jsx';
import Register from './Register.jsx';
import ChangePassword from './ChangePassword.jsx';
import useAuth from '../hooks/useAuth.js';
import Logo from '../images/logo.png';
import axios, { axiosPrivate } from '../api/axios';

import { HiMenuAlt3 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { VscAccount } from 'react-icons/vsc';
import Dialog from '@mui/material/Dialog';

const Navbar = ({loginOpened}) => {
  const [open, setOpen] = useState(false);
  const [openLoginDialog, setLoginOpenDialog] = useState(loginOpened);
  const [openRegisterDialog, setRegisterOpenDialog] = useState(false);
  const [openChangePasswordDialog, setChangePasswordDialog] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  
  const { auth, setAuth } = useAuth();

const location = useLocation();
  const showLoginDialog = location.state?.showLoginDialog;

  useEffect(() => {
    if (showLoginDialog) {
      setLoginOpenDialog(true);
    }
  }, [showLoginDialog]);

  const handleLogin = () => {
    setLoginOpenDialog(true);
  };

  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };

  const handleRegister = () => {
    setRegisterOpenDialog(true);
  };

  const handleLoginDialogClose = () => {
    setLoginOpenDialog(false);
    console.log(openLoginDialog);
  };

  const handleDialogClose = () => {
    setRegisterOpenDialog(false);
    setLoginOpenDialog(false);
    setChangePasswordDialog(false);
  };
  const handleLogOut = async() => {
    await axiosPrivate.post("/users/logout");
    localStorage.removeItem("accessToken");
    if (!localStorage.getItem("accessToken")) {
      handleButtonClick();
    }
  };

  return (
    <header className='w-full fixed z-10 bg-black opacity-90 object-cover'>
      <nav className='relative flex w-full py-2 md:py-3 px-4 md:px-20 items-center'>
        <a href="/" className='flex items-center justify-center text-white text-lg cursor-pointer'>
          <img src={Logo} alt='Logo' className='hidden md:block w-8 h-8 lg:w-14 lg:h-14' />
        </a>

        <ul className='hidden md:flex text-white gap-6'>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="/#recipes">Favourites</a>
          </li>
          <li>
            <a href="/favorites">My Recipes</a>
          </li>
          <li>
            <a href="/favorites">Settings</a>
          </li>
        </ul>
        <div className='text-white ml-auto relative flex gap-6 inline-block cursor-pointer'>
          <div>
            <button onClick={handleButtonClick}>
              <VscAccount className='text-3xl' />
            </button>
          </div>
          {isVisible && !localStorage.getItem('accessToken')  && (
            <div
              id='dropdown'
              className={`absolute ${isVisible ? 'block' : 'none'} z-10 divide-y bg-black opacity-90 text-center`}
              style={{ top: '158%', left: '-25%' }}
            >
              <ul class=' text-sm text-gray-700 dark:text-gray-200 text-center' aria-labelledby='dropdownDefaultButton'>
                <li>
                  <button className='w-full inline-block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-left' onClick={() => setLoginOpenDialog(true)}>
                    Log in
                  </button>
                </li>
                <li>
                <button className='w-full inline-block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-left' onClick={() => setRegisterOpenDialog(true)}>
                    Register
                  </button>
                </li>
              </ul>
            </div>
          )}
          {isVisible && localStorage.getItem('accessToken')  && (
            <div
              id='dropdown'
              className={`absolute ${isVisible ? 'block' : 'none'} z-10 divide-y bg-black opacity-90 text-center`}
              style={{ top: '158%', left: '-25%' }}
            >
              <ul class=' text-sm text-gray-700 dark:text-gray-200 text-center' aria-labelledby='dropdownDefaultButton'>
                <li>
                  <button className='w-full inline-block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-left' onClick={() => handleLogOut()}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* <button
          className='block md:hidden text-white text-xl outline-0 shadow-0'
          onClick={() => setOpenDialog(true)}
        >
          {open ? <AiOutlineClose /> : <HiMenuAlt3 />}
        </button> */}
      </nav>
      <div className={`${open ? 'flex' : 'hidden'} bg-black flex-col w-full px-4 pt-16 pb-10 text-white gap-6 text-[14px]`}>
        <a href='/'>Home</a>
        <a href='/#recipes'>Recipes</a>
        <a href='/'>Favorites</a>
      </div>
      <Dialog
        open={openLoginDialog}
        onClose={handleLoginDialogClose}
        fullWidth
        maxWidth='lg'
        PaperProps={{ style: { height: '800px' } }}>
        <Login  onClose={handleLoginDialogClose} handleButtonClick={handleButtonClick}/>
      </Dialog>
      <Dialog
        open={openRegisterDialog}
        onClose={handleDialogClose}
        fullWidth
        maxWidth='lg'
        PaperProps={{ style: { height: '800px' } }}>
        <Register />
      </Dialog>
    </header>

    
  );
};

export default Navbar;
