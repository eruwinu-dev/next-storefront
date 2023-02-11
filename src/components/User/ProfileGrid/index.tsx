import { useGetUser } from "@/hooks/user/useGetUser"
import React from "react"

type Props = {}

const ProfileGrid = (props: Props) => {
    const { data: user } = useGetUser()

    if (!user) return <></>

    return (
        <section
            className="grid grid-cols-1 grid-flow-row gap-4 p-4"
            id="profile"
        >
            <div>
                <h1 className="text-xl font-bold">Profile</h1>
            </div>
            <div className="grid grid-cols-1 grid-flow-row gap-2">
                <div>
                    <span className="text-3xl font-bold">{user.name}</span>
                </div>
                <div>
                    <span className="text-xl font-semibold">{user.email}</span>
                </div>
            </div>
        </section>
    )
}

export default ProfileGrid
