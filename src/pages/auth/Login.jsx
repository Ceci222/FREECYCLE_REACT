import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';
import loginImage from '../../assets/images/Login.svg'; 
import { AuthContext } from '../../context/AuthContext.jsx';

function Login() {
    const [userData, setUserData] = useState({ user_email: '', user_pwd: '' });
    const { onLogin } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        try {
            setUserData({ ...userData, [e.target.name]: e.target.value });
        } catch (error) {
            setError(error.message);
        }
        
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const result = await onLogin(userData.user_email, userData.user_pwd);
            setError(result.error || null);
            /* if (result.token) alert('Inicio de sesión exitoso'); */
            navigate('/')
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className='auth__container'>
            <section className='auth__image'>
                <img src='src/assets/images/Login.svg' alt="" />
            </section>

            <section className="auth__wrapper">

                <section className="auth__header">
                    <h1>Inicia sesión</h1>
                </section>
                <form className="auth__form" onSubmit={handleSubmit}>
                    <label className='auth_label' htmlFor="user_email">Email</label>
                    <input className='auth_input'
                        type="email"
                        name="user_email"
                        value={userData.user_email}
                        onChange={handleInputChange}
                        placeholder="Correo"
                        required
                    />
                    <label className="auth_label" htmlFor="user_pwd">Contraseña</label>
                    <input  className='auth_input'
                        type="password"
                        name="user_pwd"
                        value={userData.user_pwd}
                        onChange={handleInputChange}
                        placeholder="Contraseña"
                        required
                    />
                    <button className="auth__button" type="submit">Acceder</button>
                    {error && <p className="error">{error}</p>}
                    <section className="auth__redirect">
                        <p className='auth__redirect__text'>¿No tienes una cuenta? </p>
                       <Link className='auth__redirect__link' to="/register">Regístrate</Link>
                    </section>
                </form>

            </section>


        </div>

    );
}

export default Login;