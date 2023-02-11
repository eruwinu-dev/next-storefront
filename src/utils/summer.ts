type PriceItem = {
    quantity: number
    price: number
}

export const summer = (items: PriceItem[]) => {
    return items.reduce(
        (acc, item) => (acc = acc + item.price * item.quantity),
        0
    )
}
