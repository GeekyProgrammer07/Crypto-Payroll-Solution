/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OrganisationService {
    /**
     * @returns any Organisation created successfully
     * @throws ApiError
     */
    public static postApiV1OrganisationsCreate({
        requestBody,
    }: {
        requestBody: {
            /**
             * Name of the organisation
             */
            name: string;
        },
    }): CancelablePromise<{
        message?: string;
        organisation?: {
            name?: string;
            owner?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/organisations/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation failed or missing wallet address`,
                401: `Unauthorized, no token provided`,
                403: `Forbidden (invalid/expired token or not an admin)`,
                409: `Organisation already exists`,
                500: `Internal server error`,
            },
        });
    }
}
