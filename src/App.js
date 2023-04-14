import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Friends from './pages/Friends';
import Credits from './pages/Credits';
import Connect from './pages/Connect';

import { Navigate, Outlet,RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './authContext';
import './styles/styles.scss'

function App() {
  
  const {userOnline} = useContext(AuthContext)

  const RouteProtected = ({children}) => {
    if(!userOnline){
      return <Navigate to={'/connect'}/>
    }
    return children
  }
const Layout = () =>{
  return(
    <div id='Layout' style={{display: 'flex', background : '#567174'}}>
        <Navbar/>
      <div style={{flex : 2}}>
        <Outlet />
      </div>
      
    </div>
  )

}
 const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:'/',
        element:<RouteProtected><Home/></RouteProtected>,
      },
      {
        path:'/settings',
        element:<RouteProtected><Settings/></RouteProtected>,
      },
      {
        path:'/friends/:id',
        element:<RouteProtected><Friends/></RouteProtected>,
      },
      {
        path:'/profile/:id',
        element:<RouteProtected><Profile/></RouteProtected>,
      },
      {
        path:'/credits',
        element:<RouteProtected><Credits/></RouteProtected>,
      },
    ]
  },
  {
    path:'/connect',
    element: <Connect/>,
  }
 ])

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
