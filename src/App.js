import RecipeDetail from './pages/RecipeDetail';
import Layout from "./components/Layout.jsx";
import { Route, Routes } from 'react-router-dom';
import Favourites from './pages/Favourites.jsx';
import MyRecipes from './pages/MyRecipes.jsx';
import Home from "./pages/Home";
import CreateRecipe from './components/CreateRecipe';
import PaymentForm from './pages/Payment'
import Checkout from './components/RecipeInstructions.jsx'

function App() {
  return (
    <div className='bg-black'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home flag={false} />} />
          <Route path='/new-password' element={<Home flag={true} />} />
          <Route path='favourites' element={<Favourites />} />
          <Route path='myrecipes' element={<MyRecipes />} />
          <Route path='createrecipe' element={<CreateRecipe />} />
          <Route path='/payment' element={<PaymentForm />} />
          <Route path='recipes/:id' >
            <Route index element={<RecipeDetail />} />
          </Route>
          <Route path='search/'>
            <Route path='query' element={<Home/>}/>
            <Route path='sort' element={<Home/>}/>
            <Route path='filter' element={<Home/>}/>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
