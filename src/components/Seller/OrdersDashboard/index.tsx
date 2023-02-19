import useSellerContext from "@/context/SellerState"
import { useGetOrders } from "@/hooks/order/useGetOrders"
import { groupBy } from "@/utils/grouper"
import { storeOrderCategories } from "@/utils/options"
import { OrderStatus } from "@prisma/client"
import { useRouter } from "next/router"
import React, { MouseEvent } from "react"
import OrdersDashboardGroup from "./OrdersDashboardGroup"

type Props = {}

const OrdersDashboard = (props: Props) => {
    const { selectCategory, selectedCategory } = useSellerContext()
    const {
        query: { storeId },
    } = useRouter()
    const { data: orders } = useGetOrders({
        role: "seller",
        storeId: storeId as string,
        status: selectedCategory as OrderStatus,
    })

    const selectCategoryHandler =
        (status: string) => (event: MouseEvent<HTMLButtonElement>) =>
            selectCategory(status)

    if (!orders) return <></>

    let groupedOrders = groupBy(orders, (i) => i.groupId)
    let groupIds = Object.keys(groupedOrders)

    return (
        <section className="grid grid-cols-1 grid-flow-row gap-8 rounded-xl shadow-xl p-4 mb-8">
            <div className="grid grid-cols-2 grid-flow-row gap-4">
                <h1 className="text-2xl font-bold">Orders</h1>
                <div></div>
            </div>
            <div className="grid grid-cols-1 grid-flow-row gap-4">
                <div className="grid grid-cols-8 grid-flow-row gap-2">
                    <button
                        type="button"
                        className={[
                            "btn btn-sm",
                            selectedCategory === "ALL"
                                ? "btn-primary"
                                : "btn-ghost",
                        ].join(" ")}
                        onClick={selectCategoryHandler("ALL")}
                    >
                        All
                    </button>
                    {storeOrderCategories.map((tab) => (
                        <button
                            type="button"
                            className={[
                                "btn btn-sm",
                                selectedCategory === tab.status
                                    ? "btn-primary"
                                    : "btn-ghost",
                            ].join(" ")}
                            key={tab.status}
                            onClick={selectCategoryHandler(tab.status)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 grid-flow-row gap-8">
                {groupIds.map((groupId) => (
                    <OrdersDashboardGroup
                        key={groupId}
                        orders={groupedOrders[groupId]}
                    />
                ))}
            </div>
        </section>
    )
}

export default OrdersDashboard
