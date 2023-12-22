

import RecipeDetail from './pages/RecipeDetail';
import RequireAuth from './utils/requireAuth';
import { AuthProvider } from "./context/AuthProvider";
import ChangePassword from "./components/ChangePassword";
import Dialog from '@mui/material/Dialog';
import Login from "./components/Login";
import axios, { axiosPrivate } from "./api/axios";
import useAuth from './hooks/useAuth'
import Layout from "./components/Layout.jsx";
import {Route,Routes} from 'react-router-dom';
import Home from "./pages/Home";
import HomeWithChangePassword from './components/HomeWithChangePassword';

// function Layout(){
//   const location = useLocation();
//   const showLoginDialog = location.state?.showLoginDialog || false;
//   const showChangePasswordDialog = location.state?.showChangePasswordDialog || false;
//   const [openChangePasswordDialog, setChangePasswordDialog] = useState(true);

//   const handleDialogClose = () => {
//     setChangePasswordDialog(false);
//   };
//   return (
//     <>
//       <Navbar loginOpened={showLoginDialog}/>
//         <Outlet/>
//       <Footer/>
//       <Dialog
//         open={openChangePasswordDialog}
//         onClose={handleDialogClose}
//         fullWidth
//         maxWidth='xs'
//         PaperProps={{ style: { height: '200px' } }}
//       >
//         <ChangePassword />
//       </Dialog>
//     </>
//   )
// }
function App() {
  return (
    <AuthProvider>
      <div className='bg-black'>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home flag = {false}/>} />
            <Route path='/new-password' element={<Home flag = {true}/>} />
            {/* <Route path='/home/new-password' element={<HomeWithChangePassword />} /> */}
            <Route path='recipes/:id' element={<RequireAuth />}>
              <Route index element={<RecipeDetail/>}/>
            </Route>
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
