import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../common/hooks/auth.hook';
import styles from './login.module.css';

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
        <div className={styles.mainContainer}>
            <div className={styles.titleContainer}>
                <div>Logout</div>
            </div>

            <br />
        </div>
    );
};

export default Logout;
