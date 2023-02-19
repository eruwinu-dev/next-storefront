import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
    cookie: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { checkOutOrderIds } = req.body

    res.setHeader("Set-Cookie", [
        `checkout-cart=${checkOutOrderIds.join(" ")}; Max-Age=36000; Path=/`,
    ])

    res.status(200).json({ cookie: "checkout-cart" })
}

export default handler
