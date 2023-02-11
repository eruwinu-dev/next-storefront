import { AddressSchema } from "@/types/user"
import { fetcher } from "@/utils/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useGetUser } from "../user/useGetUser"

export const addAddress = async (
    info: AddressSchema,
    userId: string | undefined
) => {
    const { store } = await fetcher(
        "/api/address/add",
        "POST",
        JSON.stringify({ info, userId })
    )
    return store
}

export const useAddAddress = () => {
    const queryClient = useQueryClient()

    const { data: user } = useGetUser()

    return useMutation({
        mutationKey: ["add-address"],
        mutationFn: (info: AddressSchema) => addAddress(info, user?.id),
        onSuccess: () => queryClient.invalidateQueries(["user", "addresses"]),
        onError: () => {},
    })
}
