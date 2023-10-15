import { FC } from 'react';
import { PropertyPayload } from '../../types/common .types';
import { Card } from '../card/Card';


interface ListingProps {
    listing: PropertyPayload[];
}

export const Listing: FC<ListingProps> = ({ listing }) => {
    console.log(`====> DEBUG listing: `, listing);
    return (
        <div className='p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5'>
            {listing.map((item, index) => (
                <Card {...item} key={`${item.id}${index}`}/>
            ))}
        </div>
    );
};
