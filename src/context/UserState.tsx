import { ActionStatus } from "@/types/action"
import { UserAction, UserContextType, UserDialog } from "@/types/user"
import { fetcher } from "@/utils/fetcher"
import { createContext, ReactNode, useContext, useState } from "react"
import { z } from "zod"

type Props = {
    children: ReactNode
}

const initialUserAction: UserAction = {
    promptSignIn: "IDLE",
    addToCart: "IDLE",
    checkOut: "IDLE",
    editCartOrder: "IDLE",
    deleteCartOrder: "IDLE",
    addAddress: "IDLE",
    editAddress: "IDLE",
    deleteAddress: "IDLE",
    setDefaultAddresss: "IDLE",
    changeCheckoutAddress: "IDLE",
    proceedOrder: "IDLE",
    cancelOrder: "IDLE",
}

const initialUserDialog: UserDialog = {
    promptSignIn: false,
    addToCart: false,
    checkOut: false,
    editCartOrder: false,
    deleteCartOrder: false,
    addAddress: false,
    editAddress: false,
    deleteAddress: false,
    setDefaultAddresss: false,
    changeCheckoutAddress: false,
    proceedOrder: false,
    cancelOrder: false,
}

export const addressSchema = z.object({
    label: z.string().min(1, { message: "Required" }),
    name: z.string().min(1, { message: "Required" }),
    addressLine: z.string().min(1, { message: "Required" }),
    streetName: z.string().min(1, { message: "Required" }),
    phone: z.string().length(11, { message: "Must be of format 09XXXXXXXXX" }),
    postalCode: z.coerce
        .number({ invalid_type_error: "Must must be a number" })
        .gte(1, { message: "Must be at least 1" }),
    isDefault: z.coerce.boolean(),
})

const UserContext = createContext<UserContextType | null>(null)

export const UserProvider = ({ children }: Props) => {
    const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
        null
    )
    const [userAction, setUserAction] = useState<UserAction>(initialUserAction)
    const [userDialog, setUserDialog] = useState<UserDialog>(initialUserDialog)

    const [checkOutOrderIds, setCheckOutOrderIds] = useState<string[]>([])

    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
        null
    )

    const [checkoutAddressId, setCheckoutAddressId] = useState<string | null>(
        null
    )

    const [selectedCategory, setSelectedCategory] = useState<string>("ALL")

    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)

    const selectVariant = (id: string | null) => setSelectedVariantId(id)

    const selectAddress = (id: string | null) => setSelectedAddressId(id)

    const setCheckoutCookie = async () => {
        const { cookie } = await fetcher(
            "/api/cart/cookie",
            "POST",
            JSON.stringify({ checkOutOrderIds })
        )
        return cookie
    }

    const selectCheckoutAddress = (id: string | null) =>
        setCheckoutAddressId(id)

    const selectCategory = (name: string) => setSelectedCategory(name)

    const selectOrder = (id: string | null) => setSelectedOrderId(id)

    const toggleUserAction = (prop: keyof UserAction, state: ActionStatus) => {
        setUserAction((userAction) => ({ ...userAction, [prop]: state }))
    }

    const toggleUserDialog = (prop: keyof UserDialog) => {
        setUserDialog((userDialog) => ({
            ...userDialog,
            [prop]: !userDialog[prop],
        }))
    }

    const value: UserContextType = {
        selectedVariantId,
        selectVariant,
        userAction,
        toggleUserAction,
        userDialog,
        toggleUserDialog,
        checkOutOrderIds,
        setCheckOutOrderIds,
        selectedAddressId,
        selectAddress,
        checkoutAddressId,
        selectCheckoutAddress,
        setCheckoutCookie,
        selectedCategory,
        selectCategory,
        selectedOrderId,
        selectOrder,
    }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

const useUserContext = () => useContext(UserContext) as UserContextType

export default useUserContext
