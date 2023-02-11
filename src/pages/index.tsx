import Header from "@/components/Layout/Header"
import { checkUser } from "@/utils/authenticator"
import { GetServerSideProps } from "next"
import Head from "next/head"
import React from "react"

type Props = {}

const Landing = ({}: Props) => {
    return (
        <>
            <Head>
                <title>Storefront - Your Lowkey Marketplace</title>
            </Head>
            <Header />
            <section className=""></section>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const user = await checkUser(context)

    if (!user)
        return {
            props: {},
        }

    return {
        redirect: {
            destination: "/home",
            permanent: false,
        },
    }
}

export default Landing
