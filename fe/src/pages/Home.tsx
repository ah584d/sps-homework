import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Header } from '../components/header/Header';
import { Listing } from '../components/listing/Listing';
import { SearchBar } from '../components/searchBar/SearchBar';
import { getPropertiesByUserId } from '../services/api.service';
import { PropertyPayload } from '../types/common .types';
import styles from './pages.module.css';

const Home = (): ReactElement => {
    const [forceRefetchForDemo, setForceRefreshForDemo] = useState(false);
    const fetchProperties = async (userId: string): Promise<void> => {
        const [, result] = await getPropertiesByUserId(userId);
        if (result) {
            setProperties(result);
            setDisplayProperties(result);
        }
    };

    const { userId } = useParams() ?? {};

    const [properties, setProperties] = useState<PropertyPayload[]>([]);
    const [displayProperties, setDisplayProperties] = useState<PropertyPayload[]>([]);

    useEffect(() => {
        if (userId) {
            fetchProperties(userId);
        }
    }, [userId, forceRefetchForDemo]);

    const searchActionCB = (criteria: string): void => {
        console.log(`====> DEBUG criteria: `, criteria);
        if (!criteria || criteria.length === 0) {
            setDisplayProperties(properties);
        }
        const searchWord = criteria.toLowerCase();
        const filteredData = properties.filter((property: PropertyPayload) => {
            if (criteria === '') {
                return property;
            } else {
                return (
                    property.category.toLowerCase().includes(searchWord) ||
                    property.price == +searchWord ||
                    property.propertyName.toLowerCase().includes(searchWord)
                );
            }
        });
        if (filteredData.length !== properties.length) {
            setDisplayProperties(filteredData);
        }
    };

    return (
        <div className={styles.homeContainer}>
            <Header />
            <div className={styles.listingContainer}>
                <SearchBar searchAction={searchActionCB} />
                <Listing listing={displayProperties} refresh={() => setForceRefreshForDemo((previous) => !previous)} />
            </div>
        </div>
    );
};

export default Home;
