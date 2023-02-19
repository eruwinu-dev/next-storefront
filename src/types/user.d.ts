import { addressSchema } from "@/context/UserState"
import { Order, Product, Store, Variant } from "@prisma/client"
import { z } from "zod"
import { ActionStatus } from "./action"

type CompleteCart = Order & {
    Product: Product & {
        store: Store
    }
    Variant: Variant | null
}

type ReducedOrder = {
    id: string
    storeId: string
}

export interface UserAction {
    promptSignIn: ActionStatus
    addToCart: ActionStatus
    checkOut: ActionStatus
    editCartOrder: ActionStatus
    deleteCartOrder: ActionStatus
    addAddress: ActionStatus
    editAddress: ActionStatus
    deleteAddress: ActionStatus
    setDefaultAddresss: ActionStatus
    changeCheckoutAddress: ActionStatus
    proceedOrder: ActionStatus
    cancelOrder: ActionStatus
}

export interface UserDialog {
    promptSignIn: boolean
    addToCart: boolean
    checkOut: boolean
    editCartOrder: boolean
    deleteCartOrder: boolean
    addAddress: boolean
    editAddress: boolean
    deleteAddress: boolean
    setDefaultAddresss: boolean
    changeCheckoutAddress: boolean
    proceedOrder: boolean
    cancelOrder: boolean
}

export interface UserContextType {
    selectedVariantId: string | null
    selectVariant: (id: string | null) => void
    checkOutOrderIds: string[]
    setCheckOutOrderIds: Dispatch<SetStateAction<string[]>>
    userAction: UserAction
    toggleUserAction: (prop: keyof UserAction, state: ActionStatus) => void
    userDialog: UserDialog
    toggleUserDialog: (prop: keyof UserDialog) => void
    selectedAddressId: string | null
    selectAddress: (id: string | null) => void
    checkoutAddressId: string | null
    selectCheckoutAddress: (id: string | null) => void
    setCheckoutCookie: () => Promise<string | undefined>
    selectedCategory: string
    selectCategory: (name: string) => void
    selectedOrderId: string | null
    selectOrder: (id: string | null) => void
}

type AddressSchema = z.infer<typeof addressSchema>
