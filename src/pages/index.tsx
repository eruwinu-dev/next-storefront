import { dehydrate, QueryClient } from "@tanstack/react-query"
import Header from "@/components/Layout/Header"
import { checkUser } from "@/utils/authenticator"
import { GetServerSideProps } from "next"
import Head from "next/head"
import React from "react"
import { getProducts } from "@/lib/product/getProducts"
import ProductsMasonry from "@/components/Landing/ProductsMasonry"

type Props = {}

const Landing = ({}: Props) => {
    return (
        <>
            <Head>
                <title>Storefront - Your Lowkey Marketplace</title>
            </Head>
            <Header />
            <div className="min-h-[30vh] grid grid-cols-1 grid-flow-row place-items-center px-4 py-8 bg-neutral text-base-100 my-4">
                <h1 className="text-4xl font-semibold font-serif">
                    Your one-stop shop for finding great finds.
                </h1>
                <p className="font-serif">
                    Storefront is an online marketplace dedicated to bringing
                    you products that your heart desires.
                </p>
            </div>
            <section className="py-16">
                <ProductsMasonry />
            </section>
            <div className="min-h-[60vh] grid lg:grid-cols-3 grid-cols-1 grid-flow-row gap-16 place-content-center bg-accent p-8 text-base-content">
                <div className="col-span-3 grid grid-cols-1 grid-flow-row place-items-center gap-2">
                    <h2 className="text-3xl font-bold font-serif">
                        What is Storefront?
                    </h2>
                </div>
                <div className="grid grid-col-1 grid-flow-row place-items-center place-content-start w-full gap-4">
                    <h3 className="text-xl font-semibold">
                        A marketplace and a community
                    </h3>
                    <p className="text-justify">
                        Storefront is an online marketplace suited to support a
                        growing community of sellers, buyers, and collectors. We
                        are a community that serves to improve the buy and sell
                        ecosystem for independent sellers by providing a
                        platform where users can transact with one another.
                    </p>
                </div>
                <div className="grid grid-col-1 grid-flow-row place-items-center place-content-start w-full gap-4">
                    <h3 className="text-xl font-semibold">
                        Locally made, international standard
                    </h3>
                    <p className="text-justify">
                        Storefront is an avenue for all business owners looking
                        to captivate a good crowd of customers. We are just the
                        bridge that connects these two groups to provide a
                        hollistic and enjoyable shopping and business
                        experience.
                    </p>
                </div>
                <div className="grid grid-col-1 grid-flow-row place-items-center place-content-start w-full gap-4">
                    <h3 className="text-xl font-semibold">
                        Accurate, but secure
                    </h3>
                    <p className="text-justify">
                        Your privacy is our top priority. We are dedicated to
                        bringing you to best service, whether you are a customer
                        of a business owner. Our support team is always
                        available 24/7.
                    </p>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const user = await checkUser(context)

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

    if (!user)
        return {
            props: {
                dehydratedState: dehydrate(queryClient),
            },
        }

    return {
        redirect: {
            destination: "/home",
            permanent: false,
        },
    }
}

export default Landing
