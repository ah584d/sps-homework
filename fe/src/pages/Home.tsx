import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router';
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

    const { userId } = useParams() ?? {};

    const [properties, setProperties] = useState<PropertyPayload[]>([]);
    useEffect(() => {
        if (userId) {
            fetchProperties(userId);
        }
    }, [userId]);

    return (
        <div className={styles.homeContainer}>
            <Header />
            <Listing listing={properties} />
        </div>
    );
};

export default Home;
