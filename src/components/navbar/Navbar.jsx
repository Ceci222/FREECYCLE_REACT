import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { userData, onLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleProtectedClick = (e, path) => {
    if (!userData) {
      e.preventDefault();
      navigate('/login');
      setMenuOpen(false);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar__logo">Freecycle</div>

      <button 
        className={`navbar__hamburger ${menuOpen ? 'open' : ''}`} 
        onClick={() => setMenuOpen(!menuOpen)} 
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`navbar__menu ${menuOpen ? 'open' : ''}`}>
        <NavLink onClick={closeMenu} className="navbar__link   navbar__link__general" to="/">Inicio</NavLink>

        <NavLink 
          onClick={(e) => {handleProtectedClick(e, '/donate');}} 
          className="navbar__link   navbar__link__general" 
          to="/donate"
        >
          Donar
        </NavLink>

        <NavLink 
          onClick={(e) => {handleProtectedClick(e, '/available-objects');}} 
          className="navbar__link   navbar__link__general"
          to="/available-objects"
        >
          Objetos Disponibles
        </NavLink>

        <NavLink onClick={closeMenu} className="navbar__link   navbar__link__general" to="/contact">Contacto</NavLink>


        {userData ? (
          <button onClick={() => { onLogout(); closeMenu(); }} className="navbar__btn-logout">
            Cerrar Sesión
          </button>
        ) : (
          <>
            <NavLink onClick={closeMenu} className="navbar__link" to="/login">Login</NavLink>
            <p className="navbar__link__separator">|</p>
            <NavLink onClick={closeMenu} className="navbar__link" to="/register">Registro</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
