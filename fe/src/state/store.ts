import { create } from 'zustand';
import { mergeArraysAndRemoveDuplicates } from '../services/businessLogic.service';
import { PropertyPayload } from '../types/common .types';

export interface SpsStoreType {
    properties: PropertyPayload[];
    filteredProperties: PropertyPayload[];
    setProperties: (properties: PropertyPayload[]) => void;
    setFilteredProperties: (properties: PropertyPayload[]) => void;
    addPaginationBulk: (bulk: PropertyPayload[]) => void;
    updatePropertyStatus: (propertyId: string, newStatus: string) => void;
}

export const useSpsStore = create<SpsStoreType>((set) => ({
    properties: [],
    filteredProperties: [],
    setProperties: (properties: PropertyPayload[]) =>
        set(() => {
            return {
                properties: properties,
            };
        }),
    setFilteredProperties: (properties: PropertyPayload[]) =>
        set(() => {
            return {
                filteredProperties: properties,
            };
        }),
    addPaginationBulk: (bulk: PropertyPayload[]) =>
        set((state: SpsStoreType) => {
            const updatedProperties = mergeArraysAndRemoveDuplicates(state.properties, bulk);
            return {
                properties: updatedProperties,
            };
        }),
    updatePropertyStatus: (propertyId: string, newStatus: string) =>
        set((state: SpsStoreType) => {
            const updatedProperties = state.properties.map((item: PropertyPayload) => {
                return item._id === propertyId ? { ...item, status: newStatus } : item;
            });
            const updatedFilteredProperties = state.filteredProperties.map((item: PropertyPayload) => {
                return item._id === propertyId ? { ...item, status: newStatus } : item;
            });
            return {
                properties: updatedProperties,
                filteredProperties: updatedFilteredProperties,
            };
        }),
}));
