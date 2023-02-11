import type { NextApiRequest, NextApiResponse } from "next"
import { getCart } from "@/lib/cart/getCart"
import { CompleteCart } from "@/types/user"

type Data = {
    cart: CompleteCart[]
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { userId } = req.body

    const cart = await getCart(userId)

    res.status(200).json({ cart })
}

export default handler
