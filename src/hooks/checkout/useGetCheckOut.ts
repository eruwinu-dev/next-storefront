import { CompleteCart } from "@/types/user"
import { useQuery } from "@tanstack/react-query"
import { useGetUser } from "../user/useGetUser"

export const useGetCheckOut = () => {
    const { data: user } = useGetUser()

    return useQuery<CompleteCart[], Error>({
        queryKey: ["checkout"],
        queryFn: async () => {
            const result = await fetch("/api/checkout/get", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user?.id,
                }),
            })
            const { orders } = await result.json()
            return orders
        },
        enabled: !!user?.id,
    })
}
