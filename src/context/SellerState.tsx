import { ActionStatus } from "@/types/action"
import {
    SellerAction,
    SellerContextType,
    SellerDialog,
    StoreSchema,
} from "@/types/store"
import { fetcher } from "@/utils/fetcher"
import { Store, User } from "@prisma/client"
import React, { createContext, ReactNode, useContext, useState } from "react"
import { z } from "zod"

type Props = {
    children: ReactNode
}

const initialSellerAction: SellerAction = {
    addStore: "IDLE",
    editStore: "IDLE",
    deleteStore: "IDLE",
    addProduct: "IDLE",
    editProduct: "IDLE",
    deleteProduct: "IDLE",
    addVariant: "IDLE",
    editVariant: "IDLE",
    deleteVariant: "IDLE",
    proceedOrder: "IDLE",
    cancelOrder: "IDLE",
}

const initialAdminDialog: SellerDialog = {
    addStore: false,
    editStore: false,
    deleteStore: false,
    addProduct: false,
    editProduct: false,
    deleteProduct: false,
    addVariant: false,
    editVariant: false,
    deleteVariant: false,
    proceedOrder: false,
    cancelOrder: false,
}

export const storeSchema = z.object({
    name: z.string().min(1, { message: "Required" }),
    description: z.string(),
})

export const productSchema = z.object({
    name: z.string().min(1, { message: "Required" }),
    description: z.string(),
    price: z.coerce
        .number({ invalid_type_error: "Must must be a number" })
        .gte(0.01, { message: "Must be at least 0.01" })
        .lte(999999.99, { message: "Must be less than 1,000,000.00" }),
    quantity: z.coerce
        .number({ invalid_type_error: "Must be a number" })
        .int({ message: "Must be an integer" })
        .gte(1, { message: "Must be at least 1" })
        .lte(99999, { message: "Must be less than 100,000" }),
})

export const variantSchema = z.object({
    name: z.string().min(1, { message: "Required" }),
    price: z.coerce
        .number({ invalid_type_error: "Must must be a number" })
        .gte(0.01, { message: "Must be at least 0.01" })
        .lte(999999.99, { message: "Must be less than 1,000,000.00" }),
})

const SellerContext = createContext<SellerContextType | null>(null)

export const SellerProvider = ({ children }: Props) => {
    const [seller, setSeller] = useState<User | null>(null)
    const [stores, setStores] = useState<Store[]>([])

    const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
        null
    )

    const [selectedCategory, setSelectedCategory] = useState<string>("ALL")

    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)

    const [sellerAction, setSellerAction] =
        useState<SellerAction>(initialSellerAction)
    const [sellerDialog, setSellerDialog] =
        useState<SellerDialog>(initialAdminDialog)

    const getSeller = (seller: User) => setSeller(seller)

    const getStores = (stores: Store[]) => setStores(stores)

    const addStore = async (data: StoreSchema) => {
        let storeId: string = ""
        if (!seller) return
        toggleSellerAction("addStore", "LOADING")
        const { store } = await fetcher(
            "/api/store/add",
            "POST",
            JSON.stringify({ ...data, userId: seller.id })
        )
        if (!store) return
        storeId = store.id
        setStores((stores) => [...stores, store])
        try {
        } catch (error) {
        } finally {
            if (!storeId) return
            toggleSellerAction("addStore", "SUCCESS")
        }
        return storeId
    }

    const editStore = async (id: string, name: string, description: string) => {
        let completed: boolean = false
        try {
        } catch (error) {}
        return completed
    }

    const deleteStore = async (id: string) => {
        let completed: boolean = false
        toggleSellerAction("deleteStore", "LOADING")
        try {
            const { store } = await fetcher(
                "/api/seller/store/delete",
                "DELETE",
                JSON.stringify({ id })
            )
            completed = Boolean(store)
        } catch (error) {
        } finally {
            if (!completed) return
            toggleSellerAction("deleteStore", "SUCCESS")
        }
        return completed
    }

    const findStore = (id: string) => stores.find((store) => store.id === id)

    const selectVariant = (id: string | null) => setSelectedVariantId(id)

    const selectOrder = (id: string | null) => setSelectedOrderId(id)

    const selectCategory = (status: string) => setSelectedCategory(status)

    const toggleSellerAction = (
        prop: keyof SellerAction,
        state: ActionStatus
    ) => {
        setSellerAction((sellerAction) => ({ ...sellerAction, [prop]: state }))
    }

    const toggleSellerDialog = (prop: keyof SellerDialog) => {
        setSellerDialog((sellerDialog) => ({
            ...sellerDialog,
            [prop]: !sellerDialog[prop],
        }))
    }

    const value: SellerContextType = {
        seller,
        getSeller,
        stores,
        getStores,
        addStore,
        editStore,
        deleteStore,
        findStore,
        selectedVariantId,
        selectVariant,
        selectedOrderId,
        selectOrder,
        selectedCategory,
        selectCategory,
        sellerAction,
        toggleSellerAction,
        sellerDialog,
        toggleSellerDialog,
    }

    return (
        <SellerContext.Provider value={value}>
            {children}
        </SellerContext.Provider>
    )
}

const useSellerContext = () => useContext(SellerContext) as SellerContextType

export default useSellerContext
