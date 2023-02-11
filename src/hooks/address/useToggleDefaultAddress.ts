import { fetcher } from "@/utils/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useGetUser } from "../user/useGetUser"

export const toggleDefaultAddress = async (
    id: string,
    userId: string | undefined
) => {
    const { product } = await fetcher(
        "/api/address/toggle",
        "POST",
        JSON.stringify({ id, userId })
    )
    return product
}

export const useToggleDefaultAddress = () => {
    const queryClient = useQueryClient()

    const { data: user } = useGetUser()

    return useMutation({
        mutationKey: ["toggle-address"],
        mutationFn: (id: string) => toggleDefaultAddress(id, user?.id),
        onSuccess: () => queryClient.invalidateQueries(["user", "addresses"]),
        onError: () => {},
    })
}
