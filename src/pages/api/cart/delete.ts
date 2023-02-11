import type { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/prisma"

type Data = {
    isDeleted?: boolean
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { ids } = req.body

    const order = await prisma.order.deleteMany({
        where: {
            id: {
                in: ids as string[],
            },
        },
    })

    res.status(200).json({ isDeleted: Boolean(order) })
}

export default handler
