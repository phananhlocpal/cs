import { useUsers } from "@/hooks"

export const getUserNameByIdHelper = (id: string) => {
    const { user } = useUsers(id);
    return user?.name;
}