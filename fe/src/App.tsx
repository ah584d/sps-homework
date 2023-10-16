import 'font-awesome/css/font-awesome.min.css';
import { useEffect } from 'react';
import './App.css';
import { AuthProvider } from './providers/authProvider';
import Routes from './routes/Routes';
import { initAxios } from './services/network.service';

function App() {
    useEffect(() => {
        initAxios();
    }, []);
    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    );
}

export default App;
