import { Address } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { useGetUser } from "../user/useGetUser"

export const useGetAddresses = () => {
    const { data: user } = useGetUser()
    return useQuery<Address[], Error>({
        queryKey: ["user", "addresses"],
        queryFn: async () => {
            const result = await fetch("/api/address/get", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user?.id,
                }),
            })
            const { addresses } = await result.json()
            return addresses
        },
        enabled: !!user?.id,
        refetchOnWindowFocus: false,
    })
}
