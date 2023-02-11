import StoresTable from "@/components/Admin/StoresTable"
import UsersTable from "@/components/Admin/UsersTable"
import useAdminContext from "@/context/AdminState"
import { Store, User } from "@prisma/client"
import { GetServerSideProps } from "next"
import Head from "next/head"
import React, { useEffect, useRef } from "react"
import { getUsers } from "@/lib/user/getUsers"
import { getStores } from "@/lib/store/getStores"
import { checkUser } from "@/utils/authenticator"
import Header from "@/components/Layout/Header"

type Props = {
    admin: User
    users: User[]
    stores: Store[]
}

const Admin = ({ admin, users, stores }: Props) => {
    const { getAdmin, getUsers, getStores } = useAdminContext()
    const calledOnce = useRef(false)

    useEffect(() => {
        if (calledOnce.current) return
        else {
            getAdmin(admin)
            getUsers(users)
            getStores(stores)
            calledOnce.current = true
        }
    }, [])

    return (
        <>
            <Head>
                <title>Admin Dashboard | Storefront</title>
            </Head>
            <Header />
            <main className="grid grid-cols-1 grid-flow-row gap-8 place-content-start">
                <UsersTable />
                <StoresTable />
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const admin = await checkUser(context)

    if (!admin) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        }
    }

    if (admin.role !== "ADMIN") {
        return {
            redirect: {
                destination: "/profile",
                permanent: false,
            },
        }
    }

    const users = await getUsers()
    const stores = await getStores(null)

    return {
        props: {
            admin,
            users,
            stores,
        },
    }
}

export default Admin
