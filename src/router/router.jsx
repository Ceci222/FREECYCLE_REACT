import { createBrowserRouter } from 'react-router-dom';
import Root from '../pages/root/Root';
import Home from '../components/home/Home';
import Contact from '../pages/contact/Contact';
import Donate from '../pages/donate/Donate';
import AvailableObjects from '../components/availableObjects/AvailableObjects';
import ObjectDetail from '../components/objectDetail/ObjectDetail';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import PrivateRoute from '../utils/privateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />, // Layout o wrapper general (puede incluir Navbar o los componentes que hagan falta)
    children: [
      { path: '/', element: <Home /> },
      { path: 'contact', element: <Contact /> },
      {
        path: 'donate',
        element: (
          <PrivateRoute>
            <Donate/>
          </PrivateRoute>
        ),
      },
      {
        path: 'available-objects',
        element: (
          <PrivateRoute>
            <AvailableObjects/>
          </PrivateRoute>
        ),
      },
      {
        path: 'available-objects/:id',
        element: (
          <PrivateRoute>
            <ObjectDetail/>
          </PrivateRoute>
        ),
      },
      { path: 'login', element: <Login/> },
      { path: 'register', element: <Register/> },
    ],
  },
]);

export default router;
