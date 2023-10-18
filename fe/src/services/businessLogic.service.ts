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

export const mergeArraysAndRemoveDuplicates = (
    array1: PropertyPayload[],
    array2: PropertyPayload[],
): PropertyPayload[] => {
    const uniqueObjects = new Map<string, PropertyPayload>();

    array1.forEach((obj) => uniqueObjects.set(obj._id, obj));

    array2.forEach((obj) => uniqueObjects.set(obj._id, obj));

    const mergedArray: PropertyPayload[] = Array.from(uniqueObjects.values());

    return mergedArray;
};
