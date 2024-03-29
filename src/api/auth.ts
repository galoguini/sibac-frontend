import axios from "axios";

const apiURL = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/usuarios/"
});

export const login = async (username: string, password: string) => {
    try {
        const response = await apiURL.post("login/", { username, password });
        localStorage.setItem('authToken', response.data.token); 
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const registro = async (username: string, first_name: string, last_name:string, email: string, celular: number, empresa_entidad: string, password: string) => {
    try {
        const response = await apiURL.post("registro/", { username, first_name, last_name, email, celular, empresa_entidad, password});
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        const token = localStorage.getItem('authToken'); // Obtiene el token del almacenamiento local
        console.log('Token:', token); // Imprime el token en la consola
        const response = await apiURL.post("logout/", {}, {
            headers: {
                Authorization: `Token ${token}` // Envia el token en el encabezado de la solicitud
            }
        });
        localStorage.removeItem('authToken'); // Elimina el token del almacenamiento local
        return response.data;
    } catch (error) {
        throw error;
    }
};