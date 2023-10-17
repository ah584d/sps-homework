import { PropertyPayload } from '../types/common .types';

export const getFilteredProperties = (properties: PropertyPayload[], criteria: string): PropertyPayload[] => {
    if (!criteria || criteria.length === 0) {
        return properties;
    }
    const searchWord = criteria.toLowerCase();
    const filteredData = properties.filter((property: PropertyPayload) => {
        if (criteria === '') {
            return property;
        } else {
            return (
                property.category.toLowerCase().includes(searchWord) ||
                property.price == +searchWord ||
                property.propertyName.toLowerCase().includes(searchWord)
            );
        }
    });
    if (filteredData.length !== properties.length) {
        return filteredData;
    }

    return properties;
};

export const isUnauthorized = (error: Error | null): boolean => error?.message?.includes('401') ?? false;
