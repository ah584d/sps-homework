import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../common/hooks/auth.hook';
import { Header } from '../components/header/Header';
import { Listing } from '../components/listing/Listing';
import { SearchBar } from '../components/searchBar/SearchBar';
import { getPropertiesByUserId } from '../services/api.service';
import { getFilteredProperties, isUnauthorized } from '../services/businessLogic.service';
import { useSpsStore } from '../state/store';
import styles from './pages.module.css';

const Home = (): ReactElement => {
    const { userId } = useParams() ?? {};
    const {
        properties,
        setProperties,
        setFilteredProperties,
        addPaginationBulk,
        updatePropertyStatus,
        filteredProperties,
    } = useSpsStore((state) => state) ?? {};

    const [isFilteredEnabled, setIsFilteredEnabled] = useState(false);
    const [isFetchAllowed, setIsFetchAllowed] = useState(true);
    const [page, setPage] = useState(1);

    const navigate = useNavigate();
    const { isExpired } = useAuth();

    useEffect(() => {
        if (userId) {
            fetchProperties(userId);
        }
    }, [userId]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isFetchAllowed]);

    useEffect(() => {
        if (isExpired) {
            navigate(`/logout`, { replace: true });
        }
    }, [isExpired]);

    const fetchProperties = async (userId: string, pagination?: boolean): Promise<void> => {
        setIsFetchAllowed(false);
        const [error, result] = await getPropertiesByUserId(userId, page);
        if (result) {
            if (pagination) {
                addPaginationBulk(result);
                setPage((prevPage) => prevPage + 1);
            } else {
                setProperties(result);
            }
        }
        if (isUnauthorized(error)) {
            onLogoutPressed();
        }
        setIsFetchAllowed(true);
    };

    const handleScroll = () => {
        if (
            Math.ceil(window.innerHeight + document.documentElement.scrollTop) !==
                document.documentElement.offsetHeight ||
            !isFetchAllowed
        ) {
            return;
        }
        userId && fetchProperties(userId, true);
    };

    const searchActionCB = (criteria: string): void => {
        setIsFilteredEnabled(criteria.length > 0);
        const propertiesToDisplay = getFilteredProperties(properties, criteria);
        setFilteredProperties(propertiesToDisplay);
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
                    listing={isFilteredEnabled ? filteredProperties : properties}
                    updateStatus={updatePropertyStatus}
                />
            </div>
        </div>
    );
};

export default Home;
