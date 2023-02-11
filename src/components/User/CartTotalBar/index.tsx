import useUserContext from "@/context/UserState"
import { useDeleteCartOrders } from "@/hooks/cart/useDeleteCartOrder"
import { useGetCart } from "@/hooks/cart/useGetCart"
import { priceFormatter } from "@/utils/priceFormatter"
import { summer } from "@/utils/summer"
import { useRouter } from "next/router"
import { setCookie } from "nookies"
import React, { ChangeEvent, MouseEvent, useMemo } from "react"

type Props = {}

const CartTotalBar = (props: Props) => {
    const { push } = useRouter()
    const { checkOutOrderIds, setCheckOutOrderIds } = useUserContext()
    const { data: cart } = useGetCart()
    const { mutateAsync: mutateDeleteCartOrders } = useDeleteCartOrders()

    if (!cart) return <></>

    const orderIds = cart.map((order) => order.id)
    const allSelected = cart.length
        ? orderIds.every((id) => checkOutOrderIds.includes(id))
        : false

    let totalPrice = useMemo(
        () =>
            summer(
                cart
                    .filter((order) => checkOutOrderIds.includes(order.id))
                    .map((order) => ({
                        price: order.Variant?.price || 0,
                        quantity: order.quantity,
                    }))
            ),
        [checkOutOrderIds, cart]
    )

    const toggleSelectAll = (
        event: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLLabelElement>
    ) => {
        setCheckOutOrderIds(allSelected ? [] : orderIds)
    }

    const deleteSelectedOrders = async (
        event: MouseEvent<HTMLButtonElement>
    ) => {
        await mutateDeleteCartOrders(checkOutOrderIds)
        setCheckOutOrderIds([])
    }

    const checkOutCart = async (event: MouseEvent<HTMLButtonElement>) => {
        setCookie(null, "checkout-cart", checkOutOrderIds.join(" "), {
            maxAge: 30 * 24 * 60 * 60,
            sameSite: true,
        })
        push("/checkout")
    }

    return (
        <section className="sticky bottom-0 left-0 p-8 bg-white drop-shadow-2xl rounded-t-lg grid grid-cols-2 grid-flow-row">
            <div className="w-fit inline-flex items-center justify-start space-x-8">
                <div className="inline-flex items-center justify-start space-x-2">
                    <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={toggleSelectAll}
                        disabled={!cart.length}
                    />
                    <label className="cursor-pointer" onClick={toggleSelectAll}>
                        Select All
                    </label>
                </div>
                <div>
                    <button
                        type="button"
                        className="btn btn-sm btn-error"
                        onClick={deleteSelectedOrders}
                        disabled={!checkOutOrderIds.length}
                    >
                        Delete Selected
                    </button>
                </div>
            </div>
            <div className="inline-flex items-center justify-end space-x-8">
                <div className="inline-flex items-center justify-center space-x-2">
                    <span>{`Total (${checkOutOrderIds.length} item${
                        checkOutOrderIds.length !== 1 ? `s` : ``
                    })`}</span>
                    <span className="text-xl font-bold">
                        {priceFormatter.format(totalPrice)}
                    </span>
                </div>
                <button
                    type="button"
                    className="btn btn-sm btn-success"
                    disabled={!checkOutOrderIds.length}
                    onClick={checkOutCart}
                >
                    Check Out
                </button>
            </div>
        </section>
    )
}

export default CartTotalBar
