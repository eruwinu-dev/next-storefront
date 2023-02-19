import { OrderStatus } from "@prisma/client"

export type OrderCategory = {
    status: OrderStatus
    label: string
}

export const orderCategories: OrderCategory[] = [
    { status: "VALIDATION", label: "For Shop Validation" },
    { status: "SHIPMENT", label: "To Ship" },
    { status: "DELIVERY", label: "To Receive" },
    { status: "PAYMENT", label: "To Pay" },
    { status: "COMPLETE", label: "Completed" },
    { status: "RETURN", label: "Returned" },
    { status: "CANCELLATION", label: "Cancelled" },
]
