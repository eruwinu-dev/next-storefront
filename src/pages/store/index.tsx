import Header from "@/components/Layout/Header"
import { checkUser } from "@/utils/authenticator"
import { User } from "@prisma/client"
import { GetServerSideProps } from "next"
import Head from "next/head"
import React from "react"

type Props = {
    user: User
}

const Admin = ({ user }: Props) => {
    return (
        <>
            <Head>
                <title>Admin | Storefront</title>
            </Head>
            <Header />

            <main></main>
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

    if (user.role !== "ADMIN") {
        return {
            redirect: {
                destination: "/profile",
                permanent: false,
            },
        }
    }

    return {
        props: {
            user,
        },
    }
}

export default Admin
