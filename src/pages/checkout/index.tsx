import { dehydrate, QueryClient } from "@tanstack/react-query"
import { GetServerSideProps } from "next"
import Head from "next/head"
import React from "react"
import { checkUser } from "@/utils/authenticator"
import Header from "@/components/Layout/Header"
import { getCart } from "@/lib/cart/getCart"

import nookies from "nookies"
import { getCheckOut } from "@/lib/checkout/getCheckOut"
import CheckoutGrid from "@/components/User/CheckoutGrid"
import { getAddresses } from "@/lib/addresses/getAddresses"

type Props = {}

const Checkout = ({}: Props) => {
    return (
        <>
            <Head>
                <title>Checkout | Storefront</title>
            </Head>
            <Header />
            <main className="flex flex-col items-center justify-start space-y-8">
                <CheckoutGrid />
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

    const cookies = nookies.get(context)

    const orderIds = cookies["checkout-cart"].split(" ")

    if (!orderIds || !orderIds.length) {
        return {
            redirect: {
                destination: "/cart",
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
    await queryClient.prefetchQuery({
        queryKey: ["checkout"],
        queryFn: async () => await getCheckOut(user.id, orderIds),
    })
    await queryClient.prefetchQuery({
        queryKey: ["user", "addresses"],
        queryFn: async () => await getAddresses({ userId: user.id, id: null }),
    })

    return {
        props: {
            user,
            dehydratedState: dehydrate(queryClient),
        },
    }
}

export default Checkout
