import { Store } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"

export const useGetStores = (
    sellerId: string | undefined,
    role: "seller" | "user"
) => {
    return useQuery<Store[], Error>({
        queryKey: [role, "stores"],
        queryFn: async () => {
            const result = await fetch("/api/store/get", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sellerId: role === "seller" ? (sellerId as string) : null,
                }),
            })
            const { stores } = await result.json()
            return stores
        },
        enabled: !!sellerId,
        refetchOnWindowFocus: false,
    })
}
