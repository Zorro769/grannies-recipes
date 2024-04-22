import RecipeDetail from './pages/RecipeDetail';
import Layout from "./components/Layout.jsx";
import {Route,Routes} from 'react-router-dom';
import Favourites from './components/Favourites.jsx';
import MyRecipes from './components/MyRecipes.jsx';
import Home from "./pages/Home";
import CreateRecipe from './components/CreateRecipe';
import Checkout from './components/RecipeInstructions.jsx'

function App() {
  return (
    <div className='bg-black'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home flag = {false}/>} />
          <Route path='/new-password' element={<Home flag = {true}/>} />
          <Route path='favourites' element={<Favourites/>}/>
          <Route path='myrecipes' element={<MyRecipes/>}/>
          <Route path='createrecipe' element={<CreateRecipe/>}/>
          <Route path='text' element={<Checkout/>}/>
          <Route path='recipes/:id' >
            <Route index element={<RecipeDetail/>}/>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
