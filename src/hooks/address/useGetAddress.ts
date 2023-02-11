import { GetAddressProps } from "@/lib/addresses/getAddresses"
import { Address } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { useGetUser } from "../user/useGetUser"

export const useGetAddress = ({ id }: GetAddressProps) => {
    const { data: user } = useGetUser()
    return useQuery<Address | null, Error>({
        queryKey: ["user", "address"],
        queryFn: async () => {
            const result = await fetch("/api/address/get", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, userId: user?.id }),
            })
            const { address } = await result.json()
            return address
        },
        enabled: !!id,
        refetchOnWindowFocus: false,
    })
}
