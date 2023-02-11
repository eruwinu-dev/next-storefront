import type { NextApiRequest, NextApiResponse } from "next"

import { getProduct, getProducts } from "@/lib/product/getProducts"
import { CompleteProduct } from "@/types/store"

type Data = {
    product?: CompleteProduct | null
    products?: CompleteProduct[]
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { storeId, sellerId, id, role } = req.body

    let products: CompleteProduct[] = []
    let product: CompleteProduct | null = null

    if (id) {
        product = await getProduct({ storeId, id, sellerId, role })
    } else {
        products = await getProducts({
            storeId,
            sellerId,
            id,
            role,
        })
    }

    res.status(200).json({ products, product })
}

export default handler
