import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/lib/prisma"

type Data = {
    isCancelled: boolean
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { groupId } = req.body

    const cart = await prisma.order.updateMany({
        where: { groupId },
        data: {
            status: "CANCELLATION",
            progress: {
                push: {
                    status: "CANCELLATION",
                },
            },
        },
    })

    res.status(200).json({ isCancelled: Boolean(cart) })
}

export default handler
