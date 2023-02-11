import { CompleteCart } from "@/types/user"
import React from "react"
import CheckoutGridItem from "./CheckoutGridItem"

type Props = {
    orders: CompleteCart[]
}

const CheckoutGridGroup = ({ orders }: Props) => {
    return (
        <div className="grid grid-cols-1 grid-flow-row gap-2 rounded-lg">
            <h2 className="text-lg font-semibold">
                {orders[0].Product.store.name}
            </h2>
            <div className="grid grid-cols-1 grid-flow-row">
                <table className="table table-fixed table-zebra w-full">
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
                            <CheckoutGridItem order={order} key={order.id} />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="divider" />
        </div>
    )
}

export default CheckoutGridGroup
