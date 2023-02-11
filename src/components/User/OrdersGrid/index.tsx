import React from "react"

type Props = {}

const OrdersGrid = (props: Props) => {
    return (
        <section
            className="grid grid-cols-1 grid-flow-row gap-4 p-4 aspect-video"
            id="orders"
        >
            <div>
                <h1 className="text-xl font-bold">Orders</h1>
            </div>
            <div></div>
        </section>
    )
}

export default OrdersGrid
