import type { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/prisma"
import { Variant } from "@prisma/client"

type Data = {
    variant: Variant | null
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.body

    const variant = await prisma.variant.delete({
        where: { id },
    })

    res.status(200).json({ variant })
}

export default handler
