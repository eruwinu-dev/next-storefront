import { fetcher } from "@/utils/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useGetProduct } from "../product/useGetProduct"
import { useGetUser } from "../user/useGetUser"

type Data = {
    quantity: number
    variantId: string
}

export const addToCart = async (
    productId: string | undefined,
    userId: string | undefined,
    quantity: number,
    variantId: string
) => {
    const { order } = await fetcher(
        "/api/cart/add",
        "POST",
        JSON.stringify({ productId, userId, quantity, variantId })
    )
    return order
}

export const useAddToCart = () => {
    const queryClient = useQueryClient()

    const { data: user } = useGetUser()
    const { data: product } = useGetProduct({ role: "user" })

    return useMutation({
        mutationKey: ["add-to-cart"],
        mutationFn: (data: Data) =>
            addToCart(product?.id, user?.id, data.quantity, data.variantId),
        onSuccess: () => queryClient.invalidateQueries(["user", "cart"]),
        onError: () => {},
    })
}
