import { useCustomers } from '@/hooks';

export const getCustomerNameByIdHelper = (id: string) => {
    const { customer } = useCustomers(id);
    return customer?.name;
}