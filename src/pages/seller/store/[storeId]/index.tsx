import useSellerContext from "@/context/SellerState"
import { User } from "@prisma/client"
import { dehydrate, QueryClient } from "@tanstack/react-query"
import { GetServerSideProps } from "next"
import Head from "next/head"
import React, { useEffect, useRef } from "react"
import { ParsedUrlQuery } from "querystring"
import StoreDashboard from "@/components/Seller/StoreDashboard"
import AddProductDialog from "@/components/Seller/StoreDashboard/ProductsDashboard/AddProductDialog"
import { getProducts } from "@/lib/product/getProducts"
import ProductsDashboard from "@/components/Seller/StoreDashboard/ProductsDashboard"
import { checkUser } from "@/utils/authenticator"
import { getStore } from "@/lib/store/getStores"
import Header from "@/components/Layout/Header"
import { getCart } from "@/lib/cart/getCart"

type Props = {
    seller: User
}

interface ServerParams extends ParsedUrlQuery {
    storeId: string
}

const Store = ({ seller }: Props) => {
    const { getSeller } = useSellerContext()
    const calledOnce = useRef(false)

    useEffect(() => {
        if (calledOnce.current) return
        else {
            getSeller(seller)
            calledOnce.current = true
        }
    }, [])

    return (
        <>
            <Head>
                <title>Seller Dashboard | Storefront</title>
            </Head>
            <Header />

            <main className="grid grid-cols-1 grid-flow-row gap-8 place-content-start">
                <StoreDashboard />
                <ProductsDashboard />
                <AddProductDialog />
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const seller = await checkUser(context)

    if (!seller) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        }
    }

    if (seller.role === "USER") {
        return {
            redirect: {
                destination: "/profile",
                permanent: false,
            },
        }
    }

    const { storeId } = context.params as ServerParams

    const store = await getStore({ id: storeId, sellerId: seller.id })

    if (!store) {
        return {
            redirect: {
                destination: "/seller",
                permanent: false,
            },
        }
    }

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ["seller", "store"],
        queryFn: async () => store,
    })

    await queryClient.prefetchQuery({
        queryKey: ["seller", "store", "products"],
        queryFn: async () =>
            await getProducts({
                storeId,
                sellerId: seller.id,
                role: "seller",
            }),
    })

    await queryClient.prefetchQuery({
        queryKey: ["user"],
        queryFn: async () => seller,
    })

    await queryClient.prefetchQuery({
        queryKey: ["cart"],
        queryFn: async () => await getCart(seller.id),
    })

    return {
        props: {
            seller,
            dehydratedState: dehydrate(queryClient),
        },
    }
}

export default Store
