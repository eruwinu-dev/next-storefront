import useAdminContext from "@/context/AdminState"
import useDebounce from "@/hooks/useDebouce"
import { User } from "@prisma/client"
import React, { ChangeEvent, useState } from "react"
import DeleteUserDialog from "./DeleteUserDialog"

import UsersTableRow from "./UsersTableRow"

type Props = {}

const UsersTable = (props: Props) => {
    const { users } = useAdminContext()
    const [search, setSearch] = useState<string>("")
    const [filteredUsers, setFilteredUsers] = useState<User[]>(users)

    useDebounce(
        () => {
            let regex = new RegExp(search, "gi")
            setFilteredUsers(
                users.filter(
                    (user) =>
                        user.name?.match(regex) ||
                        user.email?.match(regex) ||
                        user.id?.match(regex)
                )
            )
        },
        [users, search],
        250
    )

    const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    return (
        <>
            <div className="grid grid-cols-4 grid-flow-row gap-4">
                <div className="col-span-2">
                    <h1 className="text-2xl font-bold">Users</h1>
                </div>
                <div className="col-span-1"></div>
                <div className="col-span-1">
                    <input
                        type="text"
                        className="input input-sm input-bordered"
                        placeholder="Search user"
                        onChange={searchHandler}
                    />
                </div>
                <table className="col-span-4">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Role</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length ? (
                            filteredUsers.map((user) => (
                                <UsersTableRow key={user.id} user={user} />
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="text-center font-semibold"
                                >
                                    No results
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <DeleteUserDialog />
        </>
    )
}

export default UsersTable
