import type { NextApiRequest, NextApiResponse } from "next"

import { Store } from "@prisma/client"
import { getStore, getStores } from "@/lib/store/getStores"

type Data = {
    store?: Store | null
    stores?: Store[]
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id, sellerId } = req.body

    let stores: Store[] = []
    let store: Store | null = null

    if (id) {
        store = await getStore({ id, sellerId })
    } else {
        stores = await getStores(sellerId)
    }

    res.status(200).json({ stores, store })
}

export default handler
