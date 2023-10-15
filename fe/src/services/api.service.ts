import { ROUTES } from '../common/const/apiRoutes';
import { PropertyPayload } from '../types/common .types';
import { ApiResponse } from '../types/http.types';
import { networkManager } from './network.service';


export const getJWTToken = async (email: string, password: string): Promise<ApiResponse<{access_token:string}>> => {
    try {
        const { data } = await networkManager.post<{access_token:string}>(ROUTES.AUTH.LOGIN, {email, password});
        return [null, data];
    } catch (error) {
        const errorSentence = `Error occurred while trying to get JWT token: ${error}`;
        console.warn(errorSentence);
        return [new Error(errorSentence), null];
    }
};

export const getPropertiesByUserId = async (userId: string): Promise<ApiResponse<PropertyPayload[]>> => {
    try {
        const { data } = await networkManager.get<PropertyPayload[]>(`${ROUTES.PROPERTIES.BY_USER}${userId}`);
        return [null, data];
    } catch (error) {
        const errorSentence = `Error occurred while trying to get properties: ${error}`;
        console.warn(errorSentence);
        return [new Error(errorSentence), null];
    }
};
