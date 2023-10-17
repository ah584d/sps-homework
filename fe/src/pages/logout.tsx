import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../common/hooks/auth.hook';
import styles from './pages.module.css';

const Logout = (): ReactElement => {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const handleLogout = (): void => {
        setToken('');
        navigate('/', { replace: true });
    };

    setTimeout(() => {
        handleLogout();
    }, 3 * 1000);

    return (
        <div className={styles.loginContainer}>
            <div className={styles.logoutContent}>
                <div className={styles.titleContainer}>
                    <div>You have been logout, see you soon...</div>
                </div>
            </div>
        </div>
    );
};

export default Logout;
