import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Loading from './components/Shared/Loading';

const Home = lazy(() => import('./pages/Home'));
const Favourites = lazy(() => import('./pages/Favourites.jsx'));
const MyRecipes = lazy(() => import('./pages/MyRecipes.jsx'));
const CreateRecipe = lazy(() => import('./components/CreateRecipe/CreateRecipe'));
const ChangePassword = lazy(() => import('./pages/ChangePassword'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Login = lazy(() => import('./components/Login/Login'));
const Register = lazy(() => import('./components/Register/Register'));
const SearchRecipe = lazy(() => import('./pages/SearchRecipe'));
const PaymentForm = lazy(() => import('./pages/Payment'));
const RecipeDetail = lazy(() => import('./pages/RecipeDetail'));

function App() {
  return (
    <div className='layout'>
      <div className='main-content'>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Suspense fallback={<Loading />}><Home flag={false} /></Suspense>} />
            <Route path='/new-password' element={<Suspense fallback={<Loading />}><Home flag={true} /></Suspense>} />
            <Route path='/favourites' element={<Suspense fallback={<Loading />}><Favourites /></Suspense>} />
            <Route path='/my-recipes' element={<Suspense fallback={<Loading />}><MyRecipes /></Suspense>} />
            <Route path='/create-recipe' element={<Suspense fallback={<Loading />}><CreateRecipe /></Suspense>} />
            <Route path='/change-password' element={<Suspense fallback={<Loading />}><ChangePassword /></Suspense>} />
            <Route path='/forgot-password' element={<Suspense fallback={<Loading />}><ForgotPassword /></Suspense>} />
            <Route path='/payment' element={<Suspense fallback={<Loading />}><PaymentForm /></Suspense>} />
            <Route path='/search' element={<Suspense fallback={<Loading />}><SearchRecipe /></Suspense>} />
            <Route path='/recipes/:id' element={<Suspense fallback={<Loading />}><RecipeDetail /></Suspense>} />
          </Route>
          <Route path='/login' element={<Suspense fallback={<Loading />}><Login /></Suspense>} />
          <Route path='/register' element={<Suspense fallback={<Loading />}><Register /></Suspense>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
