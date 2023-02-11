import { Store } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useGetUser } from "../user/useGetUser"

export const useGetStore = () => {
    const { data: user } = useGetUser()
    const {
        query: { storeId },
    } = useRouter()
    let sellerId = user?.id
    return useQuery<Store | null, Error>({
        queryKey: [sellerId ? "seller" : "user", "store"],
        queryFn: async () => {
            const result = await fetch("/api/store/get", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: storeId as string | undefined,
                    sellerId,
                }),
            })
            const { store } = await result.json()
            return store
        },
        enabled: !!user,
        refetchOnWindowFocus: false,
    })
}
