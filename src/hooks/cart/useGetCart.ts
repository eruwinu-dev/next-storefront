import { CompleteCart } from "@/types/user"
import { useQuery } from "@tanstack/react-query"
import { useGetUser } from "../user/useGetUser"

export const useGetCart = () => {
    const { data: user } = useGetUser()
    return useQuery<CompleteCart[], Error>({
        queryKey: ["cart"],
        queryFn: async () => {
            const result = await fetch("/api/cart/get", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user?.id,
                }),
            })
            const { cart } = await result.json()
            return cart
        },
        enabled: !!user?.id,
        refetchOnMount: true,
    })
}
