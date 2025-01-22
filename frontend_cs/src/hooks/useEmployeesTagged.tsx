import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { employeeTaggedService } from "@/services";
import { 
    EmployeeTaggedCreateRequestModel, 
    EmployeeTaggedUpdateRequestModel 
} from "@/abstract";

export const useEmployeesTagged = (employeeTaggedId?: string, conversationId?: string) => {
    const queryClient = useQueryClient();

    const employeesTaggedQuery = useQuery({
        queryKey: ['employeesTagged'],
        queryFn: () => employeeTaggedService.getAll()
    });

    const employeeTaggedByIdQuery = useQuery({
        queryKey: ['employeesTagged', employeeTaggedId],
        queryFn: () => employeeTaggedService.getById(employeeTaggedId!),
        enabled: !!employeeTaggedId
    });

    const employeesTaggedByConversationQuery = useQuery({
        queryKey: ['employeesTagged', 'conversation', conversationId],
        queryFn: () => employeeTaggedService.getByConversationId(conversationId!),
        enabled: !!conversationId
    });

    const createEmployeeTaggedMutation = useMutation({
        mutationFn: (data: EmployeeTaggedCreateRequestModel) => 
            employeeTaggedService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employeesTagged'] });
        }
    });

    const updateEmployeeTaggedMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: EmployeeTaggedUpdateRequestModel }) =>
            employeeTaggedService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employeesTagged'] });
        }
    });

    const deleteEmployeeTaggedMutation = useMutation({
        mutationFn: (id: string) => employeeTaggedService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employeesTagged'] });
        }
    });

    return {
        employeesTagged: employeesTaggedQuery.data,
        employeeTagged: employeeTaggedByIdQuery.data,
        conversationEmployeesTagged: employeesTaggedByConversationQuery.data,
        isLoading: employeesTaggedQuery.isLoading,
        isLoadingById: employeeTaggedByIdQuery.isLoading,
        isLoadingByConversation: employeesTaggedByConversationQuery.isLoading,
        createEmployeeTagged: createEmployeeTaggedMutation.mutate,
        updateEmployeeTagged: updateEmployeeTaggedMutation.mutate,
        deleteEmployeeTagged: deleteEmployeeTaggedMutation.mutate
    };
};