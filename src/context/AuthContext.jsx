import { createContext, useState } from 'react';
import fetchData from '../utils/fetchData';

const AuthContext = createContext({
    userData: null,
    onLogin: async () => {},
    onLogout: () => {},
    onRegister: async () => {}

});

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    const onLogin = async (user_email, user_pwd) => {
        if (!user_email || user_email.trim() === "" || !user_pwd){
          return { error: 'Debes introducir tu correo y contraseña' };
        }

        try {
            const response = await fetchData('/login', 'POST', { user_email, user_pwd });

            if (response.error) {
                return { error: response.error || 'Credenciales inválidas' };
            }

            if (response.token) {
                localStorage.setItem('authToken', response.token);
                setUserData({ user_email, token: response.token });
                /* alert("¡Login exitoso!"); */
                return { token: response.token };
            }

            return { error: 'Credenciales inválidas' };

        } catch (error) {
          /* console.error('Error en onLogin:', error); */
            return { error: 'Error en la solicitud. Intenta de nuevo.' };
        }
    };

    const onLogout = () => {
        //con remover el token y limpiar el userData ya no hay acceso
        localStorage.removeItem('authToken');
        setUserData(null);
    };

    const onRegister = async (user_name, user_email, user_pwd) => {

        if (!user_name || user_name.trim() === "") { //si al trimear devuelve un string vacío es q no tiene contenido
            return { error: 'Debes introducir un nombre de usuario' };
        }

        if (!user_email || user_email.trim() === "") { //por si hay espacios innecesarios
            return { error: 'Debes introducir un email' };
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(user_email)) {
            return { error: 'El formato de email no es válido' };            
        }
    
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;
        if (!passwordRegex.test(user_pwd)) {
            return { error: 'La contraseña debe tener al menos 8 caracteres, con letras y números' };            
        }
    
        try {

            const response = await fetchData('/register', 'POST', { user_name, user_email, user_pwd });
            if (response.token) {
                localStorage.setItem('authToken', response.token);
                setUserData({ user_name, user_email, token: response.token });
                return { token: response.token };
            }
            

            return { error: response.error || 'Credenciales inválidas' }; //Feedback para el user: para q me de uno de los errores previos o uno genérico
       
        } catch (error) { //solo para errores de servidor, retchData, red caída, etc....
            /* console.error('Error en onRegister:', error); */
            return { error: 'Error en la solicitud. Intenta de nuevo.' };
        }
    }



    return (
        <AuthContext.Provider value={{ userData, onLogin, onLogout, onRegister }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };