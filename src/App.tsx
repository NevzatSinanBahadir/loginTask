import { BrowserRouter,Route, Routes } from 'react-router-dom';
import './App.css';

import Login from './Components/Login';
import Home from './Components/Home';

function App() {
  return (
   <>

   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Login/>}></Route>
    <Route path='/home' element={<Home/>}></Route>
   </Routes>
   
   </BrowserRouter>
  
   </>
  );
}

export default App;
