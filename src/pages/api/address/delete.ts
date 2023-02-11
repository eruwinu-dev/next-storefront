import type { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/prisma"

type Data = {
    isDeleted?: boolean
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.body

    const address = await prisma.address.deleteMany({
        where: { id },
    })

    res.status(200).json({ isDeleted: Boolean(address) })
}

export default handler
