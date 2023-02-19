import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/lib/prisma"

type Data = {
    isProceeded: boolean
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { groupId, status, current, destination } = req.body

    const cart = await prisma.order.updateMany({
        where: { groupId },
        data: {
            status,
            progress: {
                push: {
                    status,
                    current: ["DELIVERY"].includes(status) ? current : null,
                    destination: ["COMPLETE"].includes(status)
                        ? destination
                        : null,
                },
            },
        },
    })

    res.status(200).json({ isProceeded: Boolean(cart) })
}

export default handler
