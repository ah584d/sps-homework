import axios from 'axios';
import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../common/hooks/auth.hook';
import styles from './Login.module.css';

const Login = (): ReactElement => {
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleLogin = async () => {
        const response = await axios.post('http://localhost:3001/auth/login', {
            email: 'ahamu@free.fr3', //email,
            password: 'my_pass', //password,
        });
        console.log(`====> DEBUG response: `, response);
        setToken('');
        navigate('/', { replace: true });
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
        <div className={styles.mainContainer}>
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
                <input className={styles.inputButton} type="button" onClick={onButtonClick} value={'Log in'} />
            </div>
        </div>
    );
};

export default Login;
