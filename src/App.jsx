import { RouterProvider } from 'react-router-dom';
import router from './router/router.jsx';
import "react-multi-carousel/lib/styles.css";
import './index.css'; 

function App() {
  return <RouterProvider router={router} />;
}

export default App;
