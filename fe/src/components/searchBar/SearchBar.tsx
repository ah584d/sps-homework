import { FC, useEffect, useState } from 'react';
import { useDebounce } from '../../common/hooks/debounce.hook';
import styles from './search.module.css';

interface SearchBarProps {
    searchAction: (criteria: string) => void;
}

export const SearchBar: FC<SearchBarProps> = ({ searchAction }) => {
    const [value, setValue] = useState<string>('');
    const debouncedValue = useDebounce<string>(value, 500);

    useEffect(() => {
        if (debouncedValue?.length > 0) {
            searchAction?.(debouncedValue);
        }
    }, [debouncedValue, searchAction]);

    return (
        <div className={styles.searchContainer}>
            <div className="relative">
                <input
                    type="text"
                    className="w-full h-10 pl-10 pr-4 rounded-full border-2 border-gray-300 focus:border-blue-500 outline-none"
                    placeholder="Property type, price..."
                    onChange={(event) => setValue(event.target.value)}
                />
                <div className="absolute inset-y-0 left-0 m-1 flex items-center pointer-events-none">
                    <i className="fa fa-search text-white bg-slate-400 p-2 rounded-full"></i>
                </div>
            </div>
        </div>
    );
};
