import { getUser } from "@/lib/getUser"
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
            <main></main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const user = await getUser(context)

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
