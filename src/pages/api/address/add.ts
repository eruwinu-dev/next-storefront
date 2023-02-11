import type { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/prisma"
import { Address } from "@prisma/client"

type Data = {
    address?: Address | null
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { info, userId } = req.body

    if (info.isDefault) {
        await prisma.address.updateMany({
            where: { userId },
            data: { isDefault: false },
        })
    }

    const address = await prisma.address.create({
        data: { ...info, userId },
    })

    res.status(200).json({ address })
}

export default handler
