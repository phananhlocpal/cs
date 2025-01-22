import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { customerService } from '@/services'
import { CustomerCreateRequestModel, CustomerUpdateRequestModel } from '@/abstract'

export const useCustomers = (customerId?: string) => {
    const queryClient = useQueryClient()

    const customersQuery = useQuery({
        queryKey: ['customers'],
        queryFn: () => customerService.getAllCustomers()
    })

    const customerByIdQuery = useQuery({
        queryKey: ['customers', customerId],
        queryFn: () => customerService.getCustomerById(customerId!),
        enabled: !!customerId
    })

    const createCustomerMutation = useMutation({
        mutationFn: (customer: CustomerCreateRequestModel) =>
            customerService.createCustomer(customer),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] })
        }
    })

    const updateCustomerMutation = useMutation({
        mutationFn: (customer: CustomerUpdateRequestModel) =>
            customerService.updateCustomer(customer),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] })
        }
    })

    return {
        customers: customersQuery.data,
        customer: customerByIdQuery.data,
        isLoading: customersQuery.isLoading,
        isLoadingCustomer: customerByIdQuery.isLoading,
        createCustomer: createCustomerMutation.mutate,
        updateCustomer: updateCustomerMutation.mutate
    }
}