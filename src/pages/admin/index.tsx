import UsersTable from "@/components/Admin/UsersTable"
import useAdminContext from "@/context/AdminState"
import { getAdminUsers } from "@/lib/admin/getAdminUsers"
import { getUser } from "@/lib/getUser"
import { User } from "@prisma/client"
import { GetServerSideProps } from "next"
import Head from "next/head"
import React, { useEffect, useRef } from "react"

type Props = {
    admin: User
    users: User[]
}

const Admin = ({ admin, users }: Props) => {
    const { getAdmin, getUsers } = useAdminContext()
    const calledOnce = useRef(false)

    useEffect(() => {
        if (calledOnce.current) return
        else {
            getAdmin(admin)
            getUsers(users)
            calledOnce.current = true
        }
    }, [])

    return (
        <>
            <Head>
                <title>Admin | Storefront</title>
            </Head>
            <main>
                <section>
                    <UsersTable />
                </section>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const admin = await getUser(context)

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

    const users = await getAdminUsers(admin.id)

    return {
        props: {
            admin,
            users,
        },
    }
}

export default Admin
