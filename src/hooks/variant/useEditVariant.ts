import { VariantSchema } from "@/types/store"
import { fetcher } from "@/utils/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type Data = {
    info: VariantSchema
    id: string
}

export const editVariant = async (data: Data) => {
    const { info, id } = data
    const { product } = await fetcher(
        "/api/variant/edit",
        "POST",
        JSON.stringify({ info, id })
    )
    return product
}

export const useEditVariant = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["edit-store"],
        mutationFn: (data: Data) => editVariant(data),
        onSuccess: () =>
            queryClient.invalidateQueries(["seller", "store", "product"]),
        onError: () => {},
    })
}
