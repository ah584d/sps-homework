import { ReactElement } from 'react';
import styles from './Login.module.css';

const Home = (): ReactElement => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.titleContainer}>
                <div>Welcome!</div>
            </div>

            <div>This is the home page.</div>
        </div>
    );
};

export default Home;
