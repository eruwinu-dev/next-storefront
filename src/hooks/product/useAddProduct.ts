import { ProductSchema } from "@/types/store"
import { fetcher } from "@/utils/fetcher"
import uploader from "@/utils/uploader"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useGetStore } from "../store/useGetStore"
import { useGetUser } from "../user/useGetUser"

type Data = {
    info: ProductSchema
    files: File[]
}

export const addProduct = async (
    data: Data,
    userId: string | undefined,
    storeId: string | undefined
) => {
    const { info, files } = data
    let images: string[] = []
    images = await Promise.all(files.map((file) => uploader(file)))
    const { product } = await fetcher(
        "/api/product/add",
        "POST",
        JSON.stringify({ userId, images, info, storeId })
    )
    return product
}

export const useAddProduct = () => {
    const queryClient = useQueryClient()
    const { data: seller } = useGetUser()
    const { data: store } = useGetStore()

    return useMutation({
        mutationKey: ["add-product"],
        mutationFn: (data: Data) => addProduct(data, seller?.id, store?.id),
        onSuccess: () =>
            queryClient.invalidateQueries(["seller", "store", "products"]),
        onError: () => {},
    })
}
