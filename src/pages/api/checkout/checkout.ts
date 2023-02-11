import type { NextApiRequest, NextApiResponse } from "next"
import crypto from "crypto"
import { ReducedOrder } from "@/types/user"

type Data = {
    isCheckedOut: boolean
}

interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
        userId: string
        groupedOrders: Record<string, ReducedOrder[]>
        addressId: string
    }
}

const handler = async (
    req: ExtendedNextApiRequest,
    res: NextApiResponse<Data>
) => {
    const { userId, groupedOrders, addressId } = req.body

    const storeIds = Object.keys(groupedOrders)

    const checkout = await Promise.allSettled(
        storeIds.map((store) => {
            const order = prisma.order.updateMany({
                where: {
                    userId,
                    id: {
                        in: groupedOrders[store].map((order) => order.id),
                    },
                },
                data: {
                    status: "VALIDATION",
                    progress: {
                        push: {
                            status: "VALIDATION",
                            message: `Deliver to ${addressId}`,
                        },
                    },
                    groupId: crypto.randomUUID(),
                },
            })
            return order
        })
    )

    res.status(200).json({ isCheckedOut: Boolean(checkout) })
}

export default handler
