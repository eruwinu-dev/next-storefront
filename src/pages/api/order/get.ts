import type { NextApiRequest, NextApiResponse } from "next"

import { CompleteCart } from "@/types/user"
import { getOrder, GetOrderProps, getOrders } from "@/lib/order/getOrders"

type Data = {
    order?: CompleteCart | null
    orders?: CompleteCart[]
}

interface ExtendedNextApiRequest extends NextApiRequest {
    body: GetOrderProps
}

const handler = async (
    req: ExtendedNextApiRequest,
    res: NextApiResponse<Data>
) => {
    const { userId, id, storeId, role, status } = req.body

    let order: CompleteCart | null = null
    let orders: CompleteCart[] = []

    if (id) {
        order = await getOrder({ userId, id, storeId, role, status })
    } else {
        orders = await getOrders({ userId, storeId, role, status })
    }

    res.status(200).json({ orders, order })
}

export default handler
