import { AxiosError, AxiosResponse } from 'axios';

export type HttpError<T = any> = AxiosError<T>;

// hide axios implementation from http consumer
export type HttpResponse<T> = AxiosResponse<T>;

export interface HttpResponseWithHeaders<T> {
    headers: Headers;
    payload: T | null;
}

export type ApiResponse<T, E = Error> = Readonly<[E | null, T | null]>;
