import { StoreSchema } from "@/types/store"
import { fetcher } from "@/utils/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useGetUser } from "../user/useGetUser"

export const addStore = async (
    data: StoreSchema,
    userId: string | undefined
) => {
    const { store } = await fetcher(
        "/api/store/add",
        "POST",
        JSON.stringify({ ...data, userId })
    )
    return store
}

export const useAddStore = () => {
    const queryClient = useQueryClient()

    const { data: user } = useGetUser()

    return useMutation({
        mutationKey: ["add-store"],
        mutationFn: (data: StoreSchema) => addStore(data, user?.id),
        onSuccess: () => queryClient.invalidateQueries(["seller", "stores"]),
        onError: () => {},
    })
}
