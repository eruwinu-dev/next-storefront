import { fetcher } from "@/utils/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const deleteAddress = async (id: string) => {
    const { address } = await fetcher(
        "/api/address/delete",
        "POST",
        JSON.stringify({ id })
    )
    return address
}

export const useDeleteAddress = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["delete-address"],
        mutationFn: (id: string) => deleteAddress(id),
        onSuccess: () => queryClient.invalidateQueries(["user", "addresses"]),
        onError: () => {},
    })
}
