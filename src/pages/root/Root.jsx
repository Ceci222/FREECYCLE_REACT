import { Outlet } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';

function Root() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Root;
