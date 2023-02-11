import type { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/prisma"
import { Variant } from "@prisma/client"

type Data = {
    variant?: Variant
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id, info: data } = req.body

    const variant = await prisma.variant.update({
        where: { id },
        data,
    })

    res.status(200).json({ variant })
}

export default handler
