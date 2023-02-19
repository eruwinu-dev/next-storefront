import { GetProductProps } from "@/lib/product/getProducts"
import { CompleteCart } from "@/types/user"
import { useQuery } from "@tanstack/react-query"
import { useGetStore } from "../store/useGetStore"
import { useGetUser } from "../user/useGetUser"

export const useGetOrder = ({ role, id }: GetProductProps) => {
    const { data: user } = useGetUser()
    const { data: store } = useGetStore()
    return useQuery<CompleteCart | null, Error>({
        queryKey: [role, "order"],
        queryFn: async () => {
            const result = await fetch("/api/order/get", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id,
                    storeId: store?.id,
                    userId: user?.id,
                    role,
                    status: "ALL",
                }),
            })
            const { order } = await result.json()
            return order
        },
        enabled: !!id,
        refetchOnWindowFocus: false,
    })
}
