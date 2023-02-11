import NextImage from "@/components/NextImage"
import QuantitySelector from "@/components/QuantitySelector"
import useUserContext from "@/context/Userstate"
import { useDeleteCartOrders } from "@/hooks/cart/useDeleteCartOrder"
import { useEditCheckoutQuantity } from "@/hooks/cart/useEditCheckoutQuantity"
import { CompleteCart } from "@/types/user"
import { priceFormatter } from "@/utils/priceFormatter"
import React, { ChangeEvent, MouseEvent, useState } from "react"

type Props = {
    order: CompleteCart
}

const CartGridItem = ({ order: { id, Product, Variant, quantity } }: Props) => {
    const { checkOutOrderIds, setCheckOutOrderIds } = useUserContext()
    const [orderQuantity, setOrderQuantity] = useState<number>(quantity)

    const { mutateAsync: mutateDeleteCartOrder } = useDeleteCartOrders()
    const {
        mutate: mutateEditCheckoutQuantity,
        isLoading: editCheckOutLoading,
    } = useEditCheckoutQuantity()

    const isSelected = checkOutOrderIds.includes(id)

    const toggleCheckOutSelect = (event: ChangeEvent<HTMLInputElement>) => {
        const newOrderIds = isSelected
            ? checkOutOrderIds.filter((orderId) => orderId !== id)
            : [...checkOutOrderIds, id]
        setCheckOutOrderIds(newOrderIds)
    }

    const setOrderQuantityHandler = (quantity: number) => {
        setOrderQuantity(quantity)
        mutateEditCheckoutQuantity({ id, quantity })
    }

    const deleteCartOrder = async (event: MouseEvent<HTMLButtonElement>) => {
        await mutateDeleteCartOrder([id])
    }

    return (
        <tr className="text-center">
            <td className="w-full h-auto aspect-video">
                <div className="grid grid-cols-2 grid-flow-row place-items-center">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={toggleCheckOutSelect}
                    />
                    <div className="relative block w-10/12 h-auto aspect-square bg-gray-200"></div>
                </div>
            </td>
            <td>
                <div className="flex flex-col items-start justify-center space-y-2">
                    <span className="font-semibold">{Product.name}</span>
                    <span className="badge badge-lg text-sm">
                        {Variant?.name}
                    </span>
                </div>
            </td>
            <td>{priceFormatter.format(Variant?.price || 0)}</td>
            <td>
                <div className="w-fit mx-auto">
                    <QuantitySelector
                        quantity={orderQuantity}
                        setQuantity={setOrderQuantityHandler}
                        disabled={editCheckOutLoading}
                    />
                </div>
            </td>
            <td>
                {priceFormatter.format((Variant?.price || 0) * orderQuantity)}
            </td>
            <td>
                <button
                    type="button"
                    className="btn btn-sm btn-error"
                    onClick={deleteCartOrder}
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default CartGridItem
