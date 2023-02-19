import useUserContext from "@/context/UserState"
import { useGetOrders } from "@/hooks/order/useGetOrders"
import { groupBy } from "@/utils/grouper"
import { storeOrderCategories } from "@/utils/options"
import { OrderStatus } from "@prisma/client"
import React, { MouseEvent } from "react"
import OrdersGridGroup from "./OrdersGridGroup"

type Props = {}

const OrdersGrid = (props: Props) => {
    const { selectedCategory, selectCategory } = useUserContext()
    const { data: orders } = useGetOrders({
        role: "user",
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
                    <OrdersGridGroup
                        key={groupId}
                        orders={groupedOrders[groupId]}
                    />
                ))}
            </div>
        </section>
    )
}

export default OrdersGrid
