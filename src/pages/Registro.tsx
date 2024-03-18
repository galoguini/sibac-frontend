import React, { useState } from 'react';
import { registro } from '../api/auth';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Registro: React.FC = () => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');
    const [empresaEntidad, setEmpresaEntidad] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await registro(username, firstName, lastName, email, Number(celular), empresaEntidad, password);
            console.log(response);
            toast.success('Registro exitoso');
            toast('Por favor inicie sesión');
            navigate('/login');
        } catch (error: any) {
            if (error && error.message && error.message.includes('Network Error')) {
                toast.error('No se está pudiendo establecer conexión');
            } else if (error && error.response && error.response.status === 400) {
                toast.error('Uno o mas campos son incorrectos');
            } else {
                toast.error('Error en el inicio de sesión inesperado');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nombre de usuario" required />
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Nombre/s" required />
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Apellido/s" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="text" value={celular} onChange={(e) => setCelular(e.target.value)} placeholder="Celular" required />
            <input type="text" value={empresaEntidad} onChange={(e) => setEmpresaEntidad(e.target.value)} placeholder="Empresa o Entidad" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
            <button type="submit">Registrarse</button>
        </form>
    );
};

export default Registro;