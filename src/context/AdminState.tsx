import { ActionStatus } from "@/types/action"
import { AdminAction, AdminContextType, AdminDialog } from "@/types/admin"
import { fetcher } from "@/utils/fetcher"
import { Role, User } from "@prisma/client"
import React, { createContext, ReactNode, useContext, useState } from "react"

type Props = {
    children: ReactNode
}

const initialAdminAction: AdminAction = {
    editUser: "IDLE",
    deleteUser: "IDLE",
}

const initialAdminDialog: AdminDialog = {
    editUser: false,
    deleteUser: false,
}

function delay(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time))
}

const AdminContext = createContext<AdminContextType | null>(null)

export const AdminProvider = ({ children }: Props) => {
    const [admin, setAdmin] = useState<User | null>(null)
    const [users, setUsers] = useState<User[]>([])
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

    const [adminAction, setAdminAction] =
        useState<AdminAction>(initialAdminAction)
    const [adminDialog, setAdminDialog] =
        useState<AdminDialog>(initialAdminDialog)

    const getAdmin = (admin: User) => setAdmin(admin)

    const getUsers = (users: User[]) => setUsers(users)

    const selectUser = (userId: string | null) => setSelectedUserId(userId)

    const findUser = (userId: string) =>
        users.find((user) => user.id === userId)

    const editUser = async (userId: string, name: string, role: Role) => {
        let completed: boolean = false
        toggleAdminAction("editUser", "LOADING")
        try {
            const { user } = await fetcher(
                "/api/admin/user/update",
                "PATCH",
                JSON.stringify({
                    userId,
                    name,
                    role,
                })
            )
            if (!user) return
            setUsers((users) =>
                users.map((userItem) =>
                    userItem.id === user.id ? user : userItem
                )
            )
            completed = Boolean(user)
        } finally {
            if (!completed) return
            toggleAdminAction("editUser", "SUCCESS")
            setTimeout(() => toggleAdminAction("editUser", "IDLE"), 500)
        }
        return completed
    }

    const deleteUser = async (userId: string) => {
        let completed: boolean = false
        toggleAdminAction("deleteUser", "LOADING")
        try {
            const { user } = await fetcher(
                "/api/admin/user/delete",
                "DELETE",
                JSON.stringify({
                    userId,
                })
            )
            if (!user) return
            setUsers((users) => users.filter((user) => user.id !== userId))
            completed = Boolean(user)
        } finally {
            if (!completed) return
            selectUser(null)
            toggleAdminAction("deleteUser", "SUCCESS")
        }
        return completed
    }

    const toggleAdminAction = (
        prop: keyof AdminAction,
        state: ActionStatus
    ) => {
        setAdminAction((adminAction) => ({ ...adminAction, [prop]: state }))
    }

    const toggleAdminDialog = (prop: keyof AdminDialog) => {
        setAdminDialog((adminDialog) => ({
            ...adminDialog,
            [prop]: !adminDialog[prop],
        }))
    }

    const value: AdminContextType = {
        admin,
        getAdmin,
        users,
        selectedUserId,
        getUsers,
        selectUser,
        findUser,
        editUser,
        deleteUser,
        adminAction,
        toggleAdminAction,
        adminDialog,
        toggleAdminDialog,
    }

    return (
        <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
    )
}

const useAdminContext = () => useContext(AdminContext) as AdminContextType

export default useAdminContext
