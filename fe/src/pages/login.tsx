import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../common/hooks/auth.hook';
import { getJWTToken } from '../services/api.service';
import styles from './pages.module.css';

const Login = (): ReactElement => {
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleLogin = async () => {
        const [, result] = await getJWTToken(email, password);
        if (result) {
            setToken(result?.accessToken);
            navigate(`/profile/${result?.userId}`, { replace: true });
        } else {
            setEmailError(' One of your authentication detail is invalid');
        }
    };

    const onButtonClick = () => {
        setEmailError('');
        setPasswordError('');

        if ('' === email) {
            setEmailError('Please enter your username');
            return;
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError('Please enter a valid username');
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
        <div className={styles.loginContainer}>
            <div className={styles.loginContent}>
                <div className={styles.titleContainer}>
                    <div>Login</div>
                </div>

                <br />

                <div className={styles.inputContainer}>
                    <input
                        value={email}
                        placeholder="Enter your email here"
                        onChange={(ev) => setEmail(ev.target.value)}
                        className={styles.inputBox}
                    />

                    <label className={styles.errorLabel}>{emailError}</label>
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
                    <input
                        className="active:bg-blue-700 hover:bg-blue-600 cursor-pointer bg-green-500"
                        type="button"
                        onClick={onButtonClick}
                        value={'Log in'}
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
