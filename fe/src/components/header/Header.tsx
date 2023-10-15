import styles from './header.module.css';


export const Header = () => {
    return (
        <div>
            <div className={styles.container}>
                <h1 className='hero text-3xl font-bold white'>Premium Property Finder</h1>
                <p className="">Bringing premium property right to your fingertips</p>
            </div>
        </div>
    );
};
