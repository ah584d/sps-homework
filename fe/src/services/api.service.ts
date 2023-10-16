import { ROUTES } from '../common/const/apiRoutes';
import { PropertyPayload, SignInResponse } from '../types/common .types';
import { ApiResponse } from '../types/http.types';
import { networkManager } from './network.service';

export const getJWTToken = async (email: string, password: string): Promise<ApiResponse<SignInResponse>> => {
    try {
        const { data } = await networkManager.post<SignInResponse>(ROUTES.AUTH.LOGIN, { email, password });
        return [null, data];
    } catch (error) {
        const errorSentence = `Error occurred while trying to get JWT token: ${error}`;
        console.warn(errorSentence);
        return [new Error(errorSentence), null];
    }
};

export const getPropertiesByUserId = async (userId: string): Promise<ApiResponse<PropertyPayload[]>> => {
    try {
        const { data } = await networkManager.get<PropertyPayload[]>(`${ROUTES.PROPERTIES.BY_USER_ID}${userId}`);
        return [null, data];
    } catch (error) {
        const errorSentence = `Error occurred while trying to get properties by user Id ${userId}: ${error}`;
        console.warn(errorSentence);
        return [new Error(errorSentence), null];
    }
};

export const updatePropertyStatus = async (propertyId: string, userId: string): Promise<ApiResponse<PropertyPayload[]>> => {
    try {
        console.log(`====> DEBUG userId: `, userId);

        const { data } = await networkManager.put<PropertyPayload[]>(`${ROUTES.PROPERTIES.PROPERTY}${propertyId}`, {
            propertyId,
            userId,
            status: 'SOLD',
        });
        return [null, data];
    } catch (error) {
        const errorSentence = `Error occurred while trying to update property status ${propertyId}: ${error}`;
        console.warn(errorSentence);
        return [new Error(errorSentence), null];
    }
};
