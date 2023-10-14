import { ReactElement } from 'react';
import styles from './Login.module.css';
import { Header } from '../components/header/Header';

const Home = (): ReactElement => {
    return (
        <div className={styles.mainContainer}>
            <Header/>
            <div className={styles.titleContainer}>
                <div>Welcome!</div>
            </div>

            <div>This is the home page.</div>
        </div>
    );
};

export default Home;
