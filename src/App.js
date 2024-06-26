import RecipeDetail from './pages/RecipeDetail';
import Layout from "./components/Layout.jsx";
import { Route, Routes } from 'react-router-dom';
import Favourites from './pages/Favourites.jsx';
import MyRecipes from './pages/MyRecipes.jsx';
import Home from "./pages/Home";
import CreateRecipe from './components/CreateRecipe/CreateRecipe';
import PaymentForm from './pages/Payment'
import Checkout from './components/RecipeInstructions.jsx'
import ForgotPassword from 'pages/ForgotPassword';
import ChangePassword from 'pages/ChangePassword';
import Login from 'components/Login/Login';
import Register from 'components/Register/Register';

function App() {
  return (
    <div className='layout'>
      <div className='main-content'>

        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home flag={false} />} />
            <Route path='/new-password' element={<Home flag={true} />} />
            <Route path='favourites' element={<Favourites />} />
            <Route path='my-recipes' element={<MyRecipes />} />
            <Route path='create-recipe' element={<CreateRecipe />} />
            <Route path='change-password' element={<ChangePassword />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route path='/payment' element={<PaymentForm />} />
            <Route path='recipes/:id' >
              <Route index element={<RecipeDetail />} />
            </Route>
          </Route>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Routes>
      </div>
    </div>

  );
}

export default App;
