import { StoreSchema } from "@/types/store"
import { fetcher } from "@/utils/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/router"

export const editStore = async (data: StoreSchema, id: string | undefined) => {
    const { product } = await fetcher(
        "/api/store/edit",
        "POST",
        JSON.stringify({ ...data, id })
    )
    return product
}

export const useEditStore = () => {
    const queryClient = useQueryClient()
    const {
        query: { storeId },
    } = useRouter()

    return useMutation({
        mutationKey: ["edit-store"],
        mutationFn: (data: StoreSchema) => editStore(data, storeId as string),
        onSuccess: () => queryClient.invalidateQueries(["seller", "store"]),
        onError: () => {},
    })
}
