import type { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/prisma"
import { Address } from "@prisma/client"

type Data = {
    address?: Address
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id, info: data } = req.body

    const address = await prisma.address.update({
        where: { id },
        data,
    })

    res.status(200).json({ address })
}

export default handler
