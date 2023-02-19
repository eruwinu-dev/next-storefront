import type { NextApiRequest, NextApiResponse } from "next"
import { CompleteCart } from "@/types/user"

import { getCheckOut } from "@/lib/checkout/getCheckOut"

type Data = {
    orders: CompleteCart[]
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { userId } = req.body

    const orderIds = (req.cookies["checkout-cart"] || "").split(" ")

    const orders = await getCheckOut(userId, orderIds)

    res.status(200).json({ orders })
}

export default handler
