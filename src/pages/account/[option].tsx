import { dehydrate, QueryClient } from "@tanstack/react-query"
import { GetServerSideProps } from "next"
import Head from "next/head"
import React from "react"
import { checkUser } from "@/utils/authenticator"
import Header from "@/components/Layout/Header"
import { getCart } from "@/lib/cart/getCart"
import { getAddresses } from "@/lib/addresses/getAddresses"
import SettingsSideBar from "@/components/User/SettingsSideBar"
import AddressGrid from "@/components/User/AddressGrid"
import ProfileGrid from "@/components/User/ProfileGrid"
import OrdersGrid from "@/components/User/OrdersGrid"
import { ParsedUrlQuery } from "querystring"
import { options } from "@/utils/options"
import { getOrders } from "@/lib/order/getOrders"

export interface StaticParams extends ParsedUrlQuery {
    option: string
}

type Props = {
    option: string
}

const Account = ({ option }: Props) => {
    return (
        <>
            <Head>
                <title>Settings | Storefront</title>
            </Head>
            <Header />
            <main>
                <section className="grid grid-cols-5 grid-flow-row gap-4 place-items-start">
                    <SettingsSideBar />
                    <div className="w-full col-span-4 grid grid-cols-1 grid-flow-row gap-4">
                        {option === "profile" ? <ProfileGrid /> : null}
                        {option === "addresses" ? <AddressGrid /> : null}
                        {option === "orders" ? <OrdersGrid /> : null}
                    </div>
                </section>
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

    const { option } = context.params as StaticParams

    if (!options.includes(option)) {
        return {
            redirect: {
                destination: "/account/profile",
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
        queryFn: async () => getCart(user.id),
    })

    await queryClient.prefetchQuery({
        queryKey: ["cart"],
        queryFn: async () => getCart(user.id),
    })

    await queryClient.prefetchQuery({
        queryKey: ["user", "addresses"],
        queryFn: async () => getAddresses({ userId: user.id, id: null }),
    })

    await queryClient.prefetchQuery({
        queryKey: ["user", "orders", "ALL"],
        queryFn: async () =>
            getOrders({ userId: user.id, role: "user", status: "ALL" }),
    })

    return {
        props: {
            user,
            option,
            dehydratedState: dehydrate(queryClient),
        },
    }
}

export default Account
