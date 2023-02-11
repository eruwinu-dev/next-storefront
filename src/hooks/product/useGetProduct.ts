import { GetProductProps } from "@/lib/product/getProducts"
import { CompleteProduct } from "@/types/store"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useGetStore } from "../store/useGetStore"
import { useGetUser } from "../user/useGetUser"

export const useGetProduct = ({ role }: GetProductProps) => {
    const {
        pathname,
        query: { productId },
    } = useRouter()
    const { data: user } = useGetUser()
    const { data: store } = useGetStore()
    return useQuery<CompleteProduct | null, Error>({
        queryKey: [
            role,
            ["/", "/home", "/product/[productId]"].includes(pathname)
                ? ""
                : "store",
            "product",
        ],
        queryFn: async () => {
            const result = await fetch("/api/product/get", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: productId,
                    storeId: store?.id,
                    sellerId: user?.id,
                    role,
                }),
            })
            const { product } = await result.json()
            return product
        },
        enabled: !!productId,
        refetchOnWindowFocus: false,
    })
}
