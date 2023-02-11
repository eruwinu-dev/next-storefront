import type { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/prisma"
import { Store } from "@prisma/client"

type Data = {
    store: Store
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id, ...data } = req.body

    const store = await prisma.store.update({
        where: { id },
        data,
    })

    res.status(200).json({ store })
}

export default handler
