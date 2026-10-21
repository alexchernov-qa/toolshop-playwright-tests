import { APIRequestContext } from "@playwright/test";

export class AuthApi {
constructor(readonly request: APIRequestContext) {}

async login(email: string, password: string) {
    const response = await this.request.post('/users/login', {data: {email: email, password: password}});
    return response;
}} 