/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Sign up a new user
     * Registers a new user with email, password, role, and wallet address
     * @returns any User created successfully
     * @throws ApiError
     */
    public static postApiV1AuthSignup({
        requestBody,
    }: {
        requestBody: {
            /**
             * User's email address
             */
            email: string;
            /**
             * User's password
             */
            password: string;
            /**
             * Role of the user in the system
             */
            role: string;
            /**
             * Blockchain wallet address of the user
             */
            walletAddress?: string;
        },
    }): CancelablePromise<{
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/signup',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation failed`,
                409: `Email already exists`,
                500: `Internal server or database error`,
            },
        });
    }
    /**
     * Sign in a user
     * Authenticates a user using email and password, returning an access token and a refresh token in an HTTP-only cookie
     * @returns any Logged in successfully
     * @throws ApiError
     */
    public static postApiV1AuthSignin({
        requestBody,
    }: {
        requestBody: {
            /**
             * User email address
             */
            email: string;
            /**
             * User password
             */
            password: string;
        },
    }): CancelablePromise<{
        message?: string;
        /**
         * JWT access token
         */
        accessToken?: string;
        tokenType?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/signin',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation failed`,
                401: `Invalid credentials`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * @returns any Successfully fetched current user info
     * @throws ApiError
     */
    public static getApiV1AuthMe(): CancelablePromise<{
        user?: {
            id?: string;
            email?: string;
            createdAt?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/auth/me',
            errors: {
                401: `Unauthorized, no token provided`,
                403: `Forbidden, invalid or expired token`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * @returns any Logged out successfully
     * @throws ApiError
     */
    public static postApiV1AuthSignout(): CancelablePromise<{
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/signout',
            errors: {
                401: `Unauthorized, no token provided`,
                403: `Forbidden, invalid or expired token`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * @returns any New access token issued
     * @throws ApiError
     */
    public static postApiV1AuthRefresh(): CancelablePromise<{
        accessToken?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/refresh',
            errors: {
                401: `Unauthorized, no refresh token cookie`,
                403: `Invalid, mismatched, or expired refresh token`,
                500: `Internal server error`,
            },
        });
    }
}
