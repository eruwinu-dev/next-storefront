import type { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/prisma"
import { Product } from "@prisma/client"

type Data = {
    product: Product
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.body

    const product = await prisma.product.delete({
        where: { id },
    })

    res.status(200).json({ product })
}

export default handler
