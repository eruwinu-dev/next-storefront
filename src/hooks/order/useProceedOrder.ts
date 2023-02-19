import { fetcher } from "@/utils/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type Data = {
    groupId?: string
    status?: string
    current?: string
    destination?: string
}

export const proceedOrder = async (data: Data) => {
    const { isProceeded } = await fetcher(
        "/api/order/proceed",
        "POST",
        JSON.stringify(data)
    )
    return isProceeded
}

export const useProceedOrder = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["proceed-order"],
        mutationFn: (data: Data) => proceedOrder(data),
        onMutate: (data) => {
            queryClient.invalidateQueries(["seller", "order"])
            queryClient.invalidateQueries(["seller", "orders", data.status])
        },
        onSuccess: () => queryClient.invalidateQueries(["seller", "order"]),
        onError: () => {},
    })
}
