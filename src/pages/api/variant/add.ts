import type { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/prisma"
import { Variant } from "@prisma/client"

type Data = {
    variant?: Variant | null
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { info, productId } = req.body

    const variant = await prisma.variant.create({
        data: { ...info, productId },
    })

    res.status(200).json({ variant })
}

export default handler
