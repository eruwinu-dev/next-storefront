import { useGetUser } from "@/hooks/user/useGetUser"
import React from "react"

type Props = {}

const UserGrid = (props: Props) => {
    const { data: user } = useGetUser()

    if (!user) return <></>

    return (
        <section className="grid grid-cols-1 grid-flow-row gap-4 place-items-center p-4 rounded-lg shadow-lg">
            <h1 className="text-3xl">
                Welcome back, <span className="font-bold">{user.name}</span>!
            </h1>
        </section>
    )
}

export default UserGrid
