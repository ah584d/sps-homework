import { FC } from 'react';
import { PropertyPayload } from '../../types/common .types';

export interface CardProps extends PropertyPayload{}

export const Card: FC<CardProps> = ({ id, category, imageURL, propertyName, price }) => {
    return (
        <div className={columnClasses} style={{ margin: '1rem 0' }}>
            <div className={cardClasses}>
                <div className="card-image">
                    <img className="img-responsive" src={imageURL} alt={imageURL} />
                </div>
                <div className="card-header">
                    <div className="card-title h5">{propertyName}</div>
                    <div className="card-title h6">&pound; {price}</div>
                </div>
                <div className="card-body">{category}</div>
                <div className="card-footer">
                    {/* <Link className="btn btn-primary" to={`/details/${id}`}>
                        Go to property
                    </Link> */}
                </div>
            </div>
        </div>
    );
};
