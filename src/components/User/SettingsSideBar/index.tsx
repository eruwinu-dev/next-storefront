import { useGetUser } from "@/hooks/user/useGetUser"
import { options } from "@/utils/options"
import Link from "next/link"
import React from "react"

type Props = {}

const SettingsSideBar = (props: Props) => {
    const { data: user } = useGetUser()

    if (!user) return <></>

    return (
        <div className="w-full sticky top-20 left-0 grid grid-cols-1 grid-flow-row">
            <div className="p-4">
                <span className="font-semibold">{user.name}</span>
            </div>
            <div className="menu p-2">
                {options.map((option) => (
                    <li key={option}>
                        <Link
                            href={`/account/${option}`}
                            className="capitalize text-sm"
                        >
                            {option}
                        </Link>
                    </li>
                ))}
            </div>
        </div>
    )
}

export default SettingsSideBar
