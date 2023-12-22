// Layout.jsx

import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import React,{useEffect, useState} from "react"
import {Routes, Route, Outlet,  useLocation} from 'react-router-dom'
import ChangePassword from "./ChangePassword";
import Dialog from '@mui/material/Dialog';
function Layout() {
    const location = useLocation();
    const showLoginDialog = location.state?.showLoginDialog || false;
    const showChangePasswordDialog = location.state?.showChangePasswordDialog || false;
  
    const [openChangePasswordDialog, setChangePasswordDialog] = useState(true);
  
    const handleDialogClose = () => {
      setChangePasswordDialog(false);
    };
  
    return (
      <>
        <Navbar loginOpened={showLoginDialog} />
        <Outlet />
        <Footer />
        {/* <Dialog
          open={openChangePasswordDialog}
          onClose={handleDialogClose}
          fullWidth
          maxWidth='xs'
          PaperProps={{ style: { height: '200px' } }}
        >
          <ChangePassword />
        </Dialog> */}
      </>
    );
  };

  export default Layout;
  