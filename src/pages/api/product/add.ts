import type { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/prisma"
import { Product } from "@prisma/client"

type Data = {
    product: Product
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { userId, images, info, storeId } = req.body

    const product = await prisma.product.create({
        data: { ...info, userId, images, storeId },
    })

    res.status(200).json({ product })
}

export default handler
