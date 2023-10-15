import { FC } from 'react';
import { PropertyPayload } from '../../types/common .types';
import { Card } from '../card/Card';

interface ListingProps {
    listing: PropertyPayload[];
}

export const Listing: FC<ListingProps> = ({ listing }) => {
    return (
        <div className="columns">
            {listing.map((item) => (
                <Card {...item} />
            ))}
        </div>
    );
};
