import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { requestService } from "@/services"
import { RequestCreateRequestModel, RequestUpdateRequestModel, RequestStatusEnum } from "@/abstract"

export const useRequests = (
    requestId?: string,
    customerId?: string,
    userId?: string,
    status?: RequestStatusEnum
) => {
    const queryClient = useQueryClient()

    const requestsQuery = useQuery({
        queryKey: ['requests'],
        queryFn: () => requestService.getAllRequests()
    })

    const requestByIdQuery = useQuery({
        queryKey: ['requests', requestId],
        queryFn: () => requestService.getRequestById(requestId!),
        enabled: !!requestId
    })

    const requestsByCustomerQuery = useQuery({
        queryKey: ['requests', 'customer', customerId],
        queryFn: () => requestService.getRequestsByCustomerId(customerId!),
        enabled: !!customerId
    })

    const requestsByUserQuery = useQuery({
        queryKey: ['requests', 'user', userId],
        queryFn: () => requestService.getRequestsByUserId(userId!),
        enabled: !!userId
    })

    const requestsByStatusQuery = useQuery({
        queryKey: ['requests', 'status', status],
        queryFn: () => requestService.getRequestsByStatus(status!),
        enabled: !!status
    })

    const createRequestMutation = useMutation({
        mutationFn: (request: RequestCreateRequestModel) => 
            requestService.createRequest(request),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['requests'] })
        }
    })

    const updateRequestMutation = useMutation({
        mutationFn: (request: RequestUpdateRequestModel) =>
            requestService.updateRequest(request),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['requests'] })
        }
    })

    const deleteRequestMutation = useMutation({
        mutationFn: (id: string) =>
            requestService.deleteRequest(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['requests'] })
        }
    })

    return {
        requests: requestsQuery.data,
        request: requestByIdQuery.data,
        customerRequests: requestsByCustomerQuery.data,
        userRequests: requestsByUserQuery.data,
        statusRequests: requestsByStatusQuery.data,
        isLoading: requestsQuery.isLoading,
        isLoadingById: requestByIdQuery.isLoading,
        isLoadingByCustomer: requestsByCustomerQuery.isLoading,
        isLoadingByUser: requestsByUserQuery.isLoading,
        isLoadingByStatus: requestsByStatusQuery.isLoading,
        createRequest: createRequestMutation.mutate,
        updateRequest: updateRequestMutation.mutate,
        deleteRequest: deleteRequestMutation.mutate
    }
}