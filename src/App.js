import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './Pages/Home';
import Regfrom from './Fomr/Regfrom';
import Login from './Fomr/Login';

function App() {
  return (
    <>
    <BrowserRouter>
       <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/register' element={<Regfrom/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
       </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
