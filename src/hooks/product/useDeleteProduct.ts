import { fetcher } from "@/utils/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/router"

export const deleteProduct = async (id: string) => {
    const { product } = await fetcher(
        "/api/product/delete",
        "POST",
        JSON.stringify({ id })
    )
    return product
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient()
    const {
        query: { productId },
    } = useRouter()

    return useMutation({
        mutationKey: ["delete-store"],
        mutationFn: () => deleteProduct(productId as string),
        onSuccess: () =>
            queryClient.invalidateQueries(["seller", "store", "product"]),
        onError: () => {},
    })
}
