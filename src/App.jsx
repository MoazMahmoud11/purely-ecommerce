import { RouterProvider } from 'react-router-dom'
import './App.css'
import {router} from './Routing/AppRoutes.jsx'
// import useFetchProducts, {} from './hooks/useFetchProducts.js'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';



function App() {
  const theme = useSelector((state) => state.ui.theme);

  // useFetchProducts(); // mistake one: security error in App.jsx 


  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);


  return (
    <RouterProvider router={router} />
  )
}

export default App
