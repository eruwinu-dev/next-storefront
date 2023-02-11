import { dehydrate, QueryClient } from "@tanstack/react-query"
import { GetServerSideProps } from "next"
import Head from "next/head"
import React from "react"
import { checkUser } from "@/utils/authenticator"
import Header from "@/components/Layout/Header"
import { getCart } from "@/lib/cart/getCart"
import CartGrid from "@/components/User/CartGrid"
import CartTotalBar from "@/components/User/CartTotalBar"

import nookies from "nookies"

type Props = {}

const Home = ({}: Props) => {
    return (
        <>
            <Head>
                <title>Cart | Storefront</title>
            </Head>
            <Header />

            <main className="flex flex-col items-center justify-start space-y-8">
                <CartGrid />
            </main>
            <CartTotalBar />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const user = await checkUser(context)

    nookies.destroy(context, "checkout-cart")

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
        queryKey: ["user"],
        queryFn: async () => user,
    })
    await queryClient.prefetchQuery({
        queryKey: ["cart"],
        queryFn: async () => await getCart(user.id),
    })

    return {
        props: {
            user,
            dehydratedState: dehydrate(queryClient),
        },
    }
}

export default Home
