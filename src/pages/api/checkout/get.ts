import type { NextApiRequest, NextApiResponse } from "next"
import { CompleteCart } from "@/types/user"

import { getCheckOut } from "@/lib/checkout/getCheckOut"

type Data = {
    orders: CompleteCart[]
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { userId, orderIds } = req.body

    const orders = await getCheckOut(userId, orderIds.split(" "))

    res.status(200).json({ orders })
}

export default handler
