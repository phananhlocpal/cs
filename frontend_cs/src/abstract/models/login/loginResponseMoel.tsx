export interface LoginResponseModel {
    user: {
        id: string,
        name: string,
        email: string,
        phoneNumber: string,
        status: number,
        role: number
    },
    token: string;
}