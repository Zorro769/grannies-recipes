import RecipeDetail from './pages/RecipeDetail';
import Layout from "./components/Layout.jsx";
import {Route,Routes} from 'react-router-dom';
import Home from "./pages/Home";

function App() {
  return (
    <div className='bg-black'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home flag = {false}/>} />
          <Route path='/new-password' element={<Home flag = {true}/>} />
          <Route path='recipes/:id' >
            <Route index element={<RecipeDetail/>}/>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
