import { fetcher } from "@/utils/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/router"

export const deleteCartOrders = async (ids: string[]) => {
    const { orders } = await fetcher(
        "/api/cart/delete",
        "POST",
        JSON.stringify({ ids })
    )
    return orders
}

export const useDeleteCartOrders = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["delete-order"],
        mutationFn: (ids: string[]) => deleteCartOrders(ids),
        onSuccess: () => queryClient.invalidateQueries(["cart"]),
        onError: () => {},
    })
}
