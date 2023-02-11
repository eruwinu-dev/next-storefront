import type { NextApiRequest, NextApiResponse } from "next"

import { Address } from "@prisma/client"
import { getAddress, getAddresses } from "@/lib/addresses/getAddresses"

type Data = {
    address?: Address | null
    addresses?: Address[]
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { userId, id } = req.body

    let addresses: Address[] = []
    let address: Address | null = null

    if (id) {
        address = await getAddress({ userId, id })
    } else {
        addresses = await getAddresses({ userId, id: null })
    }

    res.status(200).json({ addresses, address })
}

export default handler
