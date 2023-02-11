import { GetServerSideProps } from "next"
import Head from "next/head"
import React from "react"
import { ParsedUrlQuery } from "querystring"
import { checkUser } from "@/utils/authenticator"
import { getProduct } from "@/lib/product/getProducts"
import { dehydrate, QueryClient } from "@tanstack/react-query"
import ProductDashboard from "@/components/Seller/ProductDashboard"
import { Product, Variant } from "@prisma/client"
import { getCart } from "@/lib/cart/getCart"
import Header from "@/components/Layout/Header"

type Props = {
    product: Product & {
        variant: Variant[]
    }
}

interface StaticParams extends ParsedUrlQuery {
    id: string
    productId: string
}

const StoreProduct = ({ product }: Props) => {
    return (
        <>
            <Head>
                <title>{`${product.name} | Storefront`}</title>
            </Head>
            <Header />
            <main>
                <ProductDashboard />
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

    const { storeId, productId } = context.params as StaticParams

    const product = await getProduct({
        storeId: storeId as string,
        id: productId,
        sellerId: seller.id,
        role: "seller",
    })

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ["seller", "store", "product"],
        queryFn: async () => product,
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
            product,
            dehydratedState: dehydrate(queryClient),
        },
    }
}

export default StoreProduct
