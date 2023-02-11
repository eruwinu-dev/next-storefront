import type { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/prisma"
import { Order } from "@prisma/client"

type Data = {
    order: Order
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id, quantity } = req.body

    const order = await prisma.order.update({
        where: { id },
        data: { quantity },
    })

    res.status(200).json({ order })
}

export default handler
