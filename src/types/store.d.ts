import {
    storeSchema,
    productSchema,
    variantSchema,
} from "@/context/SellerState"
import { Product, Store, User, Variant } from "@prisma/client"
import { z } from "zod"
import { ActionStatus } from "./action"

export type CompleteProduct = Product & {
    variants: Variant[]
    store: Store
}

export interface SellerAction {
    addStore: ActionStatus
    editStore: ActionStatus
    deleteStore: ActionStatus
    addProduct: ActionStatus
    editProduct: ActionStatus
    deleteProduct: ActionStatus
    addVariant: ActionStatus
    editVariant: ActionStatus
    deleteVariant: ActionStatus
}

export interface SellerDialog {
    addStore: boolean
    editStore: boolean
    deleteStore: boolean
    addProduct: boolean
    editProduct: boolean
    deleteProduct: boolean
    addVariant: boolean
    editVariant: boolean
    deleteVariant: boolean
}

export interface StoreWithProducts extends Store {
    products: Product[]
}

export interface SellerContextType {
    seller: User | null
    getSeller: (seller: User) => void
    stores: Store[]
    getStores: (stores: Store[]) => void
    addStore: (data: StoreSchema) => Promise<string | undefined>
    editStore: (
        id: string,
        name: string,
        description: string
    ) => Promise<boolean | undefined>
    deleteStore: (id: string) => Promise<boolean | undefined>
    findStore: (id: string) => Store | undefined
    selectedVariantId: string | null
    selectVariant: (id: string | null) => void
    sellerAction: SellerAction
    toggleSellerAction: (prop: keyof SellerAction, state: ActionStatus) => void
    sellerDialog: SellerDialog
    toggleSellerDialog: (prop: keyof SellerDialog) => void
}

type StoreSchema = z.infer<typeof storeSchema>
type ProductSchema = z.infer<typeof productSchema>
type VariantSchema = z.infer<typeof variantSchema>
