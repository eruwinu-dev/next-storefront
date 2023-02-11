import useUserContext from "@/context/Userstate"
import { CompleteCart } from "@/types/user"
import React, { ChangeEvent } from "react"
import CartGridItem from "./CartGridItem"

type Props = {
    orders: CompleteCart[]
}

const CartGridGroup = ({ orders }: Props) => {
    const { checkOutOrderIds, setCheckOutOrderIds } = useUserContext()

    const orderIds = orders.map((order) => order.id)
    const allSelected = orderIds.every((id) => checkOutOrderIds.includes(id))

    const toggleAllSelected = (event: ChangeEvent<HTMLInputElement>) => {
        if (allSelected) {
            setCheckOutOrderIds(
                checkOutOrderIds.filter((id) => !orderIds.includes(id))
            )
        } else {
            setCheckOutOrderIds((previousIds: string[]) =>
                Array.from(new Set([...previousIds, ...orderIds]))
            )
        }
    }

    return (
        <div className="grid grid-cols-1 grid-flow-row gap-4 rounded-lg">
            <div className="inline-flex items-center space-x-2">
                <input
                    type="checkbox"
                    onChange={toggleAllSelected}
                    checked={allSelected}
                />
                <h2 className="text-lg font-semibold">
                    {orders[0].Product.store.name}
                </h2>
            </div>
            <div className="grid grid-cols-1 grid-flow-row gap-4">
                <table className="table table-fixed table-zebra w-full">
                    <thead>
                        <tr className="text-center">
                            <td colSpan={2}>Product</td>
                            <td>Price</td>
                            <td>Quantity</td>
                            <td>Total</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <CartGridItem order={order} key={order.id} />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="divider" />
        </div>
    )
}

export default CartGridGroup
