import { fetcher } from "@/utils/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/router"

export const deleteStore = async (id: string) => {
    const { product } = await fetcher(
        "/api/store/delete",
        "POST",
        JSON.stringify({ id })
    )
    return product
}

export const useDeleteStore = () => {
    const queryClient = useQueryClient()
    const {
        query: { storeId },
    } = useRouter()

    return useMutation({
        mutationKey: ["delete-store"],
        mutationFn: () => deleteStore(storeId as string),
        onSuccess: () => queryClient.invalidateQueries(["seller", "stores"]),
        onError: () => {},
    })
}
