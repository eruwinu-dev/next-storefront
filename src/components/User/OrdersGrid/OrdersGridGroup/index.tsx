import { useGetAddress } from "@/hooks/address/useGetAddress"
import { CompleteCart } from "@/types/user"
import { priceFormatter } from "@/utils/priceFormatter"
import { summer } from "@/utils/summer"
import React, { useMemo } from "react"
import OrdersGridGroupItem from "./OrdersGridGroupItem"

type Props = {
    orders: CompleteCart[]
}

const OrdersGridGroup = ({ orders }: Props) => {
    const totalPrice = useMemo(
        () =>
            summer(
                orders.map((order) => ({
                    price: order.Variant?.price || 0,
                    quantity: order.quantity,
                }))
            ),
        [orders]
    )

    const addressId = orders[0].progress.find(
        (order) => order.status === "VALIDATION"
    )?.destination

    const { data: address } = useGetAddress({
        id: addressId as string,
    })

    if (!address) return <></>

    return (
    <div className="grid grid-cols-1 grid-flow-row gap-4 p-4 border-b-2">
            <div className="relative inline-flex items-center justify-between space-x-4">
                <h2 className="font-semibold">{orders[0].groupId}</h2>
                {/* <OrdersDashboardGroupDropdown order={orders[0]} /> */}
            </div>
            <div className="grid grid-cols-2 grid-flow-row gap-4">
                <table className="col-span-2 table table-fixed table-zebra w-full">
                    <thead>
                        <tr className="text-center">
                            <td colSpan={2}>Product</td>
                            <td>Price</td>
                            <td>Quantity</td>
                            <td>Total</td>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <OrdersGridGroupItem key={order.id} order={order} />
                        ))}
                    </tbody>
                </table>
                <div className="grid grid-cols-1 grid-flow-row gap-2 p-4">
                    <span className="font-semibold">Delivery Address</span>
                    <span>{`${address.name} | ${address.phone}`}</span>
                    <span className="text-sm">{`${address.streetName}, ${address.addressLine} ${address.postalCode}`}</span>
                </div>
                <div className="grid grid-cols-1 grid-flow-row gap-4 p-4">
                    <div className="inline-flex items-start justify-end space-x-4">
                        <span>Total Amount: </span>
                        <span className="text-xl font-bold">
                            {priceFormatter.format(totalPrice)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrdersGridGroup
