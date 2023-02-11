import { GetServerSideProps } from "next"
import Head from "next/head"
import React from "react"
import { ParsedUrlQuery } from "querystring"
import { checkUser } from "@/utils/authenticator"
import { getProduct } from "@/lib/product/getProducts"
import { dehydrate, QueryClient } from "@tanstack/react-query"
import { Product, Variant } from "@prisma/client"
import ProductOrderBoard from "@/components/User/ProductOrderBoard"
import PromptSignInDialog from "@/components/Seller/StoresDashboard/PromptSignInDialog"
import AddToCartDialog from "@/components/User/ProductOrderBoard/AddToCartDialog"
import Header from "@/components/Layout/Header"
import { getCart } from "@/lib/cart/getCart"

type Props = {
    product: Product & {
        variant: Variant[]
    }
}

interface StaticParams extends ParsedUrlQuery {
    id: string
    productId: string
}

const StoreProductFacade = ({ product }: Props) => {
    return (
        <>
            <Head>
                <title>{`${product.name} | Storefront`}</title>
            </Head>
            <Header />

            <main>
                <ProductOrderBoard />
                <AddToCartDialog />
                <PromptSignInDialog />
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const user = await checkUser(context)

    const { productId } = context.params as StaticParams

    const product = await getProduct({
        id: productId,
        role: "user",
    })

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ["user", "store", "product"],
        queryFn: () => product,
    })

    await queryClient.prefetchQuery({
        queryKey: ["user"],
        queryFn: async () => user,
    })
    await queryClient.prefetchQuery({
        queryKey: ["cart"],
        queryFn: async () => await getCart(user?.id as string),
    })

    return {
        props: {
            product,
            dehydratedState: dehydrate(queryClient),
        },
    }
}

export default StoreProductFacade
