import { FC } from 'react';
import { PropertyPayload } from '../../types/common .types';

export interface CardProps extends PropertyPayload {}

export const Card: FC<CardProps> = ({ category, imageURL, propertyName, price, status }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
            <img className="w-full" src="../../public/default.jpg" alt="house" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{propertyName}</div>
                <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et
                    perferendis eaque, exercitationem praesentium nihil.
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {status}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {category}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                $ {price}
                </span>
            </div>
        </div>
    );
};
