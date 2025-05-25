const BASE_URL = import.meta.env.VITE_BACKEND_URL;

async function fetchData(route, method = 'GET', data = null) {

    const url = BASE_URL + route;

    const token = localStorage.getItem('authToken'); 

    const headers = {
        'Accept': 'application/json', //tipo de dato a recibir en front
        'Content-Type': 'application/json', //tipo de dato a enviar desde front
        ...(token && { Authorization: `Bearer ${token}` }),  //si hay token, lo envío directamente, si no nada
    };//el token o lo añado siempre con Authorization: `Bearer ${token} o uso un if, ternario o truthy como este

    //De usar el if, va aquí y el ternario (dnd el truthy) puede dar errores con algunos navegadores, mejor usar siempre el truthy cn operador de propagación
    
    const options = {
        method,
        headers,
        ...(data && { body: JSON.stringify(data) }),
    }; 

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (!response.ok) {
            return { error: result.error || `Error ${response.status}: ${response.statusText}` };
        } 

        return result;
    } catch (error) {
        throw error;
    }
}

export default fetchData;
