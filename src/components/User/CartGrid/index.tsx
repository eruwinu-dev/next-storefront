import { useGetCart } from "@/hooks/cart/useGetCart"
import { groupBy } from "@/utils/grouper"
import React from "react"
import CartGridGroup from "./CartGridGroup"

type Props = {}

const CartGrid = (props: Props) => {
    const { data: cart } = useGetCart()

    if (!cart) return <></>

    let groupedCart = groupBy(cart, (i) => i.Product.storeId)
    let storesInCart = Object.keys(groupedCart)

    return (
        <section className="grid grid-cols-1 grid-flow-row gap-8 p-4">
            <h1 className="text-xl font-bold">Cart</h1>
            <div className="grid grid-cols-1 grid-flow-row gap-4">
                {storesInCart.length ? (
                    storesInCart.map((storeId) => (
                        <CartGridGroup
                            orders={groupedCart[storeId]}
                            key={storeId}
                        />
                    ))
                ) : (
                    <div className="mx-auto">
                        <span className="text-center">
                            You have no products in your cart.
                        </span>
                    </div>
                )}
            </div>
        </section>
    )
}

export default CartGrid
