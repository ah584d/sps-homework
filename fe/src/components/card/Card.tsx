import { FC } from 'react';
import { updatePropertyStatus } from '../../services/api.service';
import { PropertyPayload } from '../../types/common .types';

export interface CardProps extends PropertyPayload {
    refresh(): void;
}

export const Card: FC<CardProps> = ({ category, imageURL, propertyName, price, status, _id, refresh, userId }) => {
    const onButtonCLicked = async (): Promise<void> => {
        await updatePropertyStatus(_id, userId);
        refresh();
    };

    const isButtonEnabled = status === 'To Sold';
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 transform hover:scale-105 transition-transform duration-300">
            <img className="w-full" src="../../public/default.jpg" alt="house" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-start">{propertyName}</div>
                <p className="text-gray-700 text-base text-start">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et
                    perferendis eaque, exercitationem praesentium nihil.
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span
                    className={`${
                        isButtonEnabled
                            ? 'active:bg-blue-700 hover:bg-blue-600 cursor-pointer bg-green-500'
                            : 'bg-orange-500'
                    } inline-block shadow-lg   rounded-md px-3 py-1 text-sm font-semibold  text-white mr-2 mb-2`}
                    onClick={onButtonCLicked}
                >
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
