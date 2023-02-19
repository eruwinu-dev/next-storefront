import { dehydrate, QueryClient } from "@tanstack/react-query"
import { GetServerSideProps } from "next"
import Head from "next/head"
import React from "react"
import UserGrid from "@/components/User/UserGrid"
import { getProducts } from "@/lib/product/getProducts"
import ProductsGrid from "@/components/User/ProductsGrid"
import { checkUser } from "@/utils/authenticator"
import Header from "@/components/Layout/Header"
import { getCart } from "@/lib/cart/getCart"

type Props = {}

const Home = ({}: Props) => {
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Header />
            <main className="flex flex-col items-center justify-start">
                <UserGrid />
                <ProductsGrid />
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const user = await checkUser(context)

    if (!user) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        }
    }

    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["user", "products"],
        queryFn: () =>
            getProducts({
                storeId: null,
                sellerId: null,
                id: null,
                role: "user",
            }),
    })
    await queryClient.prefetchQuery({
        queryKey: ["user"],
        queryFn: async () => user,
    })

    await queryClient.prefetchQuery({
        queryKey: ["cart"],
        queryFn: async () => getCart(user.id),
    })

    return {
        props: {
            user,
            dehydratedState: dehydrate(queryClient),
        },
    }
}

export default Home
