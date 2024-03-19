import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faRightToBracket, faRightFromBracket, faAddressCard } from '@fortawesome/free-solid-svg-icons';

const Navbar: React.FC<{ isLoggedIn: boolean, handleLogout: () => void }> = ({ isLoggedIn, handleLogout }) => {
    return (
        <nav>
            <Link to="/"><FontAwesomeIcon icon={faHome}/>Sistema Básico de Administración Contable</Link>
            {isLoggedIn ? (
                <>
                    <button onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} /> Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login"><FontAwesomeIcon icon={faRightToBracket} />Login</Link>
                    <Link to="/registro"><FontAwesomeIcon icon={faAddressCard} />Registro</Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;