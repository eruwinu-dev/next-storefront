import { VariantSchema } from "@/types/store"
import { fetcher } from "@/utils/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useGetProduct } from "../product/useGetProduct"

type Data = {
    info: VariantSchema
}

export const addVariant = async (data: Data, productId: string) => {
    const { info } = data
    const { variant } = await fetcher(
        "/api/variant/add",
        "POST",
        JSON.stringify({ info, productId })
    )
    return variant
}

export const useAddVariant = () => {
    const queryClient = useQueryClient()
    const { data: product } = useGetProduct({ role: "seller" })

    return useMutation({
        mutationKey: ["add-variant"],
        mutationFn: (data: Data) => addVariant(data, product?.id as string),
        onSuccess: () =>
            queryClient.invalidateQueries(["seller", "store", "product"]),
        onError: () => {},
    })
}
