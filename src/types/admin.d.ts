import { Role, Store, StoreStatus, User } from "@prisma/client"
import { ActionStatus } from "./action"

export interface AdminAction {
    editUser: ActionStatus
    deleteUser: ActionStatus
    changeStoreStatus: ActionStatus
}

export interface AdminDialog {
    editUser: boolean
    deleteUser: boolean
    changeStoreStatus: boolean
}

export interface AdminContextType {
    admin: User | null
    getAdmin: (admin: User) => void
    users: User[]
    selectedUserId: string | null
    getUsers: (users: User[]) => void
    selectUser: (userId: string | null) => void
    findUser: (userId: string) => User | undefined
    editUser: (
        userId: string,
        name: string,
        role: Role
    ) => Promise<boolean | undefined>
    deleteUser: (userId: string) => Promise<boolean | undefined>
    stores: Store[]
    selectedStoreId: string | null
    getStores: (stores: Store[]) => void
    selectStore: (storeId: string | null) => void
    findStore: (storeId: string) => Store | undefined
    changeStoreStatus: (
        storeId: string,
        status: StoreStatus
    ) => Promise<boolean | undefined>
    adminAction: AdminAction
    toggleAdminAction: (prop: keyof AdminAction, state: ActionStatus) => void
    adminDialog: AdminDialog
    toggleAdminDialog: (prop: keyof AdminDialog) => void
}

export interface AdminDialog {
    deleteUser: boolean
}
