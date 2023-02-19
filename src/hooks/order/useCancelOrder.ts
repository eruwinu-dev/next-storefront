import { fetcher } from "@/utils/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const cancelOrder = async (groupId: string | undefined) => {
    const { isCancelled } = await fetcher(
        "/api/order/cancel",
        "DELETE",
        JSON.stringify({ groupId })
    )
    return isCancelled
}

export const useCancelOrder = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["cancel-order"],
        mutationFn: (groupId: string | undefined) => cancelOrder(groupId),
        onSuccess: () => {
            queryClient.invalidateQueries(["seller", "orders", "CANCELLATION"])
            queryClient.invalidateQueries(["seller", "order"])
        },
        onError: () => {},
    })
}
