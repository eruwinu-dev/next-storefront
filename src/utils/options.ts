import { OrderStatus } from "@prisma/client"
import { orderCategories } from "./orderCategories"

const orderPaths = orderCategories.map(
    (category) => `orders?category=${category.status.toLowerCase()}`
)

export const options: string[] = [
    "profile",
    "addresses",
    "orders",
    ...orderPaths,
]

export type StoreOrderCategory = {
    status: string
    link: string
    label: string
}

export const storeOrderCategories: StoreOrderCategory[] = [
    { status: "VALIDATION", link: "validation", label: "Validated" },
    { status: "SHIPMENT", link: "shipment", label: "Shipped" },
    { status: "DELIVERY", link: "delivery", label: "Delivered" },
    { status: "PAYMENT", link: "payment", label: "Paid" },
    { status: "COMPLETE", link: "complete", label: "Completed" },
    { status: "RETURN", link: "returned", label: "Returned" },
    { status: "CANCELLATION", link: "cancelled", label: "Cancelled" },
]

export type OrderFlow = {
    status: string
    action: string
    label: string
}

export const orderFlow: OrderFlow[] = [
    { status: "VALIDATION", action: "Validate", label: "Validated" },
    { status: "SHIPMENT", action: "Ship", label: "To Ship" },
    { status: "DELIVERY", action: "Deliver", label: "To Deliver" },
    { status: "PAYMENT", action: "Pay", label: "To Pay" },
    { status: "COMPLETE", action: "Complete", label: "Complete" },
]

export type OrderMapDescription = {
    tense?: string
    action?: string
}

export type OrderMapIndex = Exclude<OrderStatus, "CART">

export const orderMap: Record<OrderMapIndex, OrderMapDescription> = {
    VALIDATION: {
        tense: "Validated",
        action: "Validate",
    },
    SHIPMENT: {
        tense: "Shipped out",
        action: "Ship",
    },
    DELIVERY: {
        tense: "Delivered",
        action: "Mark as Delivered",
    },
    PAYMENT: {
        tense: "Paid",
        action: "Marked as Paid",
    },
    COMPLETE: {
        tense: "Completed",
        action: "Marked as Completed",
    },
    CANCELLATION: {
        tense: "Cancelled",
    },
    RETURN: {
        tense: "Returned",
    },
}
