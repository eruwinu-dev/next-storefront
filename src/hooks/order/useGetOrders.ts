import { GetOrderProps } from "@/lib/order/getOrders"
import { CompleteCart } from "@/types/user"
import { useQuery } from "@tanstack/react-query"
import { useGetStore } from "../store/useGetStore"
import { useGetUser } from "../user/useGetUser"

export const useGetOrders = ({ role, status }: GetOrderProps) => {
    const { data: user } = useGetUser()
    const { data: store } = useGetStore()
    return useQuery<CompleteCart[], Error>({
        queryKey: [role, "orders", status],
        queryFn: async () => {
            const result = await fetch("/api/order/get", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    storeId: store?.id,
                    userId: user?.id,
                    status,
                    role,
                }),
            })
            const { orders } = await result.json()
            return orders
        },
        refetchOnWindowFocus: false,
    })
}
