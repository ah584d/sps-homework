import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../common/hooks/auth.hook';

const Login = (): ReactElement => {
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const handleLogin = () => {
        setToken('this is a test token');
        navigate('/', { replace: true });
    };

    setTimeout(() => {
        handleLogin();
    }, 3 * 1000);

    const onButtonClick = () => {
        // You'll update this function later...
    };

    return (
        <div className={'mainContainer'}>
            <div className={'titleContainer'}>
                <div>Login</div>
            </div>

            <br />

            <div className={'inputContainer'}>
                <input
                    value={email}
                    placeholder="Enter your email here"
                    onChange={(ev) => setEmail(ev.target.value)}
                    className={'inputBox'}
                />

                <label className="errorLabel">{emailError}</label>
            </div>

            <br />

            <div className={'inputContainer'}>
                <input
                    value={password}
                    placeholder="Enter your password here"
                    onChange={(ev) => setPassword(ev.target.value)}
                    className={'inputBox'}
                />

                <label className="errorLabel">{passwordError}</label>
            </div>

            <br />

            <div className={'inputContainer'}>
                <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
            </div>
        </div>
    );
};

export default Login;
