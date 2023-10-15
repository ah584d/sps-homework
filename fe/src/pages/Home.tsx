import { ReactElement, useEffect, useState } from 'react';
import { Header } from '../components/header/Header';
import { Listing } from '../components/listing/Listing';
import { getPropertiesByUserId } from '../services/api.service';
import { PropertyPayload } from '../types/common .types';
import styles from './login.module.css';

const Home = (): ReactElement => {
    const fetchProperties = async (userId: string): Promise<void> => {
        const [, result] = await getPropertiesByUserId(userId);
        if (result) {
            setProperties(result);
        }
    };

    const [properties, setProperties] = useState<PropertyPayload[]>([]);
    useEffect(() => {
        fetchProperties('652af03f2f0aabcd556b017f');
    });

    return (
        <div className={styles.mainContainer}>
            <Header />
            <div className={styles.titleContainer}>
                <div>Welcome!</div>
            </div>

            <Listing listing={properties} />
        </div>
    );
};

export default Home;
