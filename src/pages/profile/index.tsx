import { getUser } from "@/lib/getUser"
import { User } from "@prisma/client"
import { GetServerSideProps } from "next"
import Head from "next/head"
import React from "react"

type Props = {
    user: User
}

const Profile = ({ user }: Props) => {
    return (
        <>
            <Head>
                <title>Profile | Storefront</title>
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

    return {
        props: {
            user,
        },
    }
}

export default Profile
