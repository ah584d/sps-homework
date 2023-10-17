import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/header/Header';
import { Listing } from '../components/listing/Listing';
import { SearchBar } from '../components/searchBar/SearchBar';
import { getPropertiesByUserId } from '../services/api.service';
import { getFilteredProperties } from '../services/businessLogic.service';
import { PropertyPayload } from '../types/common .types';
import styles from './pages.module.css';

const Home = (): ReactElement => {
    const [forceRefetchForDemo, setForceRefreshForDemo] = useState(false);
    const [properties, setProperties] = useState<PropertyPayload[]>([]);
    const [displayProperties, setDisplayProperties] = useState<PropertyPayload[]>([]);
    const [isFetchAllowed, setIsFetchAllowed] = useState(true);
    const [page, setPage] = useState(1);

    const navigate = useNavigate();

    const fetchProperties = async (userId: string): Promise<void> => {
        setIsFetchAllowed(false);
        const [, result] = await getPropertiesByUserId(userId, page);
        if (result) {
            setProperties((prevItems) => [...prevItems, ...result]);
            setDisplayProperties((prevItems) => [...prevItems, ...result]);
            setPage((prevPage) => prevPage + 1);
        }
        setIsFetchAllowed(true);
    };

    const { userId } = useParams() ?? {};

    useEffect(() => {
        if (userId) {
            console.log(`====> DEBUG fetchProperties: `, userId, forceRefetchForDemo);
            fetchProperties(userId);
        }
    }, [userId, forceRefetchForDemo]);

    const handleScroll = () => {
        if (
            Math.ceil(window.innerHeight + document.documentElement.scrollTop) !==
                document.documentElement.offsetHeight ||
            !isFetchAllowed
        ) {
            return;
        }
        console.log(`====> DEBUG handleScroll: `);
        userId && fetchProperties(userId);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isFetchAllowed]);

    const searchActionCB = (criteria: string): void => {
        setIsFetchAllowed(criteria.length === 0);

        const propertiesToDisplay = getFilteredProperties(properties, criteria);
        setDisplayProperties(propertiesToDisplay);
    };

    const onLogoutPressed = (): void => {
        navigate(`/logout`, { replace: true });
    };

    return (
        <div className={styles.homeContainer}>
            <Header />
            <div className={styles.listingContainer}>
                <div className={styles.searchContainer}>
                    <SearchBar searchAction={searchActionCB} />
                    <input
                        className="active:bg-blue-700 hover:bg-blue-600 cursor-pointer bg-green-500"
                        type="button"
                        onClick={onLogoutPressed}
                        value={'Log out'}
                    />
                </div>
                <Listing
                    userId={userId ?? ''}
                    listing={displayProperties}
                    refresh={() => setForceRefreshForDemo((previous) => !previous)}
                />
            </div>
        </div>
    );
};

export default Home;
