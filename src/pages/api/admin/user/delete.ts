import { User } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/prisma"

type Data = {
    user: User
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { userId } = req.body

    const user = await prisma.user.delete({
        where: { id: userId },
    })

    res.status(200).json({ user })
}

export default handler
