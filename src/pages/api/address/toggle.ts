import type { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/prisma"

type Data = {
    isUpdated: boolean
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id, userId } = req.body

    await prisma.address.updateMany({
        where: {
            userId,
            id: {
                not: id,
            },
        },
        data: { isDefault: false },
    })

    const address = await prisma.address.updateMany({
        where: { id },
        data: { isDefault: true },
    })

    res.status(200).json({ isUpdated: Boolean(address) })
}

export default handler
