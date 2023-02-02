import { User } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/lib/prisma"

type Data = {
    user: User
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { userId, name, role } = req.body

    const user = await prisma.user.update({
        where: { id: userId },
        data: {
            name,
            role,
        },
    })

    res.status(200).json({ user })
}

export default handler
