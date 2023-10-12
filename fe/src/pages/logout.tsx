import { useNavigate } from 'react-router-dom';
import { useAuth } from '../common/hooks/auth.hook';
import styles from './Login.module.css';

const Logout = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setToken('');
        navigate('/', { replace: true });
    };

    setTimeout(() => {
        handleLogout();
    }, 3 * 1000);

    return (
        <div className={styles.mainContainer}>
            <div className={styles.titleContainer}>
                <div>Logout</div>
            </div>

            <br />
        </div>
    );
};

export default Logout;
