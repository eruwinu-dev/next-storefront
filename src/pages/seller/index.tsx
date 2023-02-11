import StoresDashboard from "@/components/Seller/StoresDashboard"
import useSellerContext from "@/context/SellerState"
import { getStores } from "@/lib/store/getStores"
import { Store, User } from "@prisma/client"
import { GetServerSideProps } from "next"
import Head from "next/head"
import React, { useEffect, useRef } from "react"
import { checkUser } from "@/utils/authenticator"
import { dehydrate, QueryClient } from "@tanstack/react-query"
import { getCart } from "@/lib/cart/getCart"
import Header from "@/components/Layout/Header"

type Props = {
    seller: User
    stores: Store[]
}

const Seller = ({ seller }: Props) => {
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
            <main>
                <StoresDashboard />
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

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ["seller", "stores"],
        queryFn: async () => await getStores(seller.id),
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

export default Seller
