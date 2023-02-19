import { CompleteCart } from "@/types/user"
import { priceFormatter } from "@/utils/priceFormatter"
import React from "react"

type Props = {
    order: CompleteCart
}

const OrdersDashboardGroupItem = ({
    order: { Product, Variant, quantity },
}: Props) => {
    return (
        <tr className="text-center">
            <td className="w-full h-auto aspect-video">
                <div className="grid grid-cols-2 grid-flow-row place-items-center">
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
                <div className="w-fit mx-auto">{quantity}</div>
            </td>
            <td>{priceFormatter.format((Variant?.price || 0) * quantity)}</td>
        </tr>
    )
}

export default OrdersDashboardGroupItem
