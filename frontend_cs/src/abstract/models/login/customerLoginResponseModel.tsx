export interface CustomerLoginResponseModel {
    customer: {
        id: string;
        name: string;
        email: string;
        address: string;
        phone: string;
    };
    token: string;
}