import React from 'react';

interface HomeProps {
    isLoggedIn: boolean;
}

const Home: React.FC<HomeProps> = ({ isLoggedIn }) => {
    return (
        <div>
            {isLoggedIn ? (
                <div>
                    {/* Contenido para usuarios que han iniciado sesión */}
                    <h1>HOME LOGUEADO</h1>
                </div>
            ) : (
                <div>
                    {/* Contenido para usuarios que no han iniciado sesión */}
                    <h1>HOME VISITANTE</h1>
                </div>
            )}
        </div>
    );
};

export default Home;