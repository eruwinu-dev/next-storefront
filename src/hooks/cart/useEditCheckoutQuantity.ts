import { CompleteCart } from "@/types/user"
import { fetcher } from "@/utils/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type Data = {
    id: string
    quantity: number
}

export const editCheckoutQuantity = async (data: Data) => {
    const { order } = await fetcher(
        "/api/cart/count",
        "POST",
        JSON.stringify({ ...data })
    )
    return order
}

export const useEditCheckoutQuantity = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["edit-checkout-quantity"],
        mutationFn: (data: Data) => editCheckoutQuantity(data),
        onSuccess: async (data) => {
            const { id, quantity } = data
            const cart = (await queryClient.getQueryData([
                "cart",
            ])) as CompleteCart[]
            const newCart = cart.map((order) =>
                order.id === id ? { ...order, quantity } : order
            )
            queryClient.setQueryData(["cart"], newCart)
        },
        onError: () => {},
    })
}
