import React, { useState, useContext } from 'react';
/* import { Link } from 'react-router-dom';
 */
import './Auth.css';
import loginImage from '../../assets/images/Login.svg'; 
import { AuthContext } from '../../context/AuthContext.jsx';

function Register() {
    const [userData, setUserData] = useState({
        user_name: '',
        user_email: '',
        user_pwd: ''
    });
    const { onRegister } = useContext(AuthContext); //para acceder a la función y comprobaciones
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value }); //para actualizar dinámicamente el campo correcto en userData, usa name como key y el valor ingresado como valor del par
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await onRegister(userData.user_name, userData.user_email, userData.user_pwd);
        setError(result.error || null); //si todo sale bien el error sera undefined, por eso hay que resetear el error a null
        if (result.token) {
            setUserData({ user_name: '', user_email: '', user_pwd: '' }); //limpio el form
            alert('Registro exitoso');
        }
    };

    return (

        <div className='auth__container'>

            <section className='auth__image'>
                <img src={loginImage} alt="img" />
            </section>

            <section className="auth__wrapper">
                <section className="auth__header">
                    <h1>Registro</h1>
                </section>

                <form className="auth__form" onSubmit={handleSubmit}>

                    <label className='auth_label' htmlFor="user_name">Nombre de usuario</label>
                    <input className='auth_input'
                    type="text"
                    name="user_name"
                    id="user_name"
                    value={userData.user_name}
                    onChange={handleInputChange}
                    placeholder="Nombre"
                    required
                    />

                    <label className='auth_label' htmlFor="user_email">Correo electrónico</label>
                    <input
                    type="email"
                    name="user_email"
                    id="user_email"
                    value={userData.user_email}
                    onChange={handleInputChange}
                    placeholder="Correo"
                    required
                    />

                    <label className='auth_label' htmlFor="user_pwd">Contraseña</label>
                    <input className='auth_input'
                    type="password"
                    name="user_pwd"
                    id="user_pwd"
                    value={userData.user_pwd}
                    onChange={handleInputChange}
                    placeholder="Contraseña"
                    required
                    />

                    <button className="auth__button" type="submit">Regístrate</button>

                    {error && <p className="error">{error}</p>}
                    
                    {/* <section className="auth__redirect">
                    <p>¿Ya tienes cuenta? </p>
                    <Link to="/login">Inicia sesión</Link>
                    </section> */}
                </form>

            </section>
        </div>

    );
}

export default Register;