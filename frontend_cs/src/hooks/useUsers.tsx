import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { userService } from "@/services"
import { UserCreateRequestModel, UserUpdateRequestModel } from "@/abstract"

export const useUsers = (userId?: string) => {
    const queryClient = useQueryClient()

    const usersQuery = useQuery({
        queryKey: ['users'],
        queryFn: () => userService.getAllUsers()
    })

    const userQuery = useQuery({
        queryKey: ['users', userId],
        queryFn: () => userService.getUserById(userId!),
        enabled: !!userId
    })

    const createUserMutation = useMutation({
        mutationFn: (user: UserCreateRequestModel) =>
            userService.createUser(user),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
        }
    })

    const updateUserMutation = useMutation({
        mutationFn: (user: UserUpdateRequestModel) =>
            userService.updateUser(user),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
        }
    })

    return {
        users: usersQuery.data,
        user: userQuery.data,
        isUsersLoading: usersQuery.isLoading,
        isUserLoading: userQuery.isLoading,
        createUser: createUserMutation.mutate,
        updateUser: updateUserMutation.mutate
    }
}