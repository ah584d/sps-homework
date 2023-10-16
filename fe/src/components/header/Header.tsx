import styles from './header.module.css';


export const Header = () => {
    return (
        <div>
            <div className={styles.container}>
                <h1 className='text-3xl font-bold white'>React & NestJS Property Finder</h1>
                <p className="text-sm">just a demo...</p>
            </div>
        </div>
    );
};
