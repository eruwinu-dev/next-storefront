import { GetProductProps } from "@/lib/product/getProducts"
import { CompleteProduct } from "@/types/store"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useGetStore } from "../store/useGetStore"
import { useGetUser } from "../user/useGetUser"

export const useGetProducts = ({ role }: GetProductProps) => {
    const { data: user } = useGetUser()
    const { data: store } = useGetStore()
    const { pathname } = useRouter()
    return useQuery<CompleteProduct[], Error>({
        queryKey: [role, pathname === "/" ? "" : "store", "products"],
        queryFn: async () => {
            const result = await fetch("/api/product/get", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    storeId: store?.id,
                    sellerId: user?.id,
                    role,
                }),
            })
            const { products } = await result.json()
            return products
        },
        refetchOnWindowFocus: false,
    })
}
