import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../common/hooks/auth.hook';
import styles from './Login.module.css';

const Login = (): ReactElement => {
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleLogin = () => {
        setToken('this is a test token');
        navigate('/', { replace: true });
    };

    const onButtonClick = () => {
        setUserNameError('');
        setPasswordError('');

        if ('' === userName) {
            setUserNameError('Please enter your username');
            return;
        }

        if ('' === password) {
            setPasswordError('Please enter a password');
            return;
        }

        if (password.length < 7) {
            setPasswordError('The password must be 8 characters or longer');
            return;
        }
        handleLogin();
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.titleContainer}>
                <div>Login</div>
            </div>

            <br />

            <div className={styles.inputContainer}>
                <input
                    value={userName}
                    placeholder="Enter your username here"
                    onChange={(ev) => setUserName(ev.target.value)}
                    className={styles.inputBox}
                />

                <label className={styles.errorLabel}>{userNameError}</label>
            </div>

            <br />

            <div className={styles.inputContainer}>
                <input
                    value={password}
                    placeholder="Enter your password here"
                    onChange={(ev) => setPassword(ev.target.value)}
                    className={styles.inputBox}
                />

                <label className={styles.errorLabel}>{passwordError}</label>
            </div>

            <br />

            <div className={styles.inputContainer}>
                <input className={styles.inputButton} type="button" onClick={onButtonClick} value={'Log in'} />
            </div>
        </div>
    );
};

export default Login;
