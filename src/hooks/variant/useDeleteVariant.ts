import { fetcher } from "@/utils/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const deleteVariant = async (id: string) => {
    const { variant } = await fetcher(
        "/api/variant/delete",
        "POST",
        JSON.stringify({ id })
    )
    return variant
}

export const useDeleteVariant = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["delete-variant"],
        mutationFn: (id: string) => deleteVariant(id),
        onSuccess: () =>
            queryClient.invalidateQueries(["seller", "store", "product"]),
        onError: () => {},
    })
}
