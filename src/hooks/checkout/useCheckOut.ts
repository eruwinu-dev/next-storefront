import { ReducedOrder } from "@/types/user"
import { fetcher } from "@/utils/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useGetUser } from "../user/useGetUser"

type Data = {
    groupedOrders: Record<string, ReducedOrder[]>
    addressId: string
}

export const checkOut = async (data: Data, userId: string) => {
    const { groupedOrders, addressId } = data
    const { isCheckedOut } = await fetcher(
        "/api/checkout/checkout",
        "POST",
        JSON.stringify({ groupedOrders, addressId, userId })
    )
    return isCheckedOut
}

export const useCheckOut = () => {
    const queryClient = useQueryClient()
    const { data: user } = useGetUser()

    return useMutation({
        mutationKey: ["checkout-order"],
        mutationFn: (data: Data) => checkOut(data, user?.id as string),
        onSuccess: () => queryClient.invalidateQueries(["cart"]),
        onError: () => {},
    })
}
