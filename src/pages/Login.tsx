import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { Dispatch, SetStateAction } from 'react';
import './Login.css';

interface LoginProps {
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        const { username, password } = data;
        try {
            const response = await login(username, password);
            toast.success('Inicio de sesión exitoso');
            setIsLoggedIn(true); // Aquí actualizamos el estado cuando el inicio de sesión es exitoso
            console.log(response);
            navigate('/'); // Aquí redirigimos al usuario a la página de inicio
        } catch (error: any) {
            if (error && error.message && error.message.includes('Network Error')) {
                toast.error('No se está pudiendo establecer conexión');
            } else if (error && error.response && error.response.status === 400) {
                toast.error('Usuario o contraseña inválido');
            } else {
                toast.error('Error en el inicio de sesión inesperado');
            }
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <label>
                Nombre de usuario:
                <input type="text" {...register('username', { required: true })} />
                {errors.username && <p>El nombre de usuario es requerido</p>}
            </label>
            <label>
                Contraseña:
                <input type="password" {...register('password', { required: true })} />
                {errors.password && <p>La contraseña es requerida</p>}
            </label>
            <input type="submit" value="Submit" />
            <Link to="/">Volver al inicio</Link>
        </form>
    );
};

export default Login;