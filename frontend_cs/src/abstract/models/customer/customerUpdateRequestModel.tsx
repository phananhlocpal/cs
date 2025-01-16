export interface CustomerUpdateRequestModel {
    id: string,
    name: string | undefined,
    address: string | undefined,
    phone: string | undefined,
    password: string | undefined
}