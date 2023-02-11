import prisma from "@/lib/prisma"
import { Order } from "@prisma/client"
import crypto from "crypto"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
    order: Order | null
    isNew?: boolean
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { productId, userId, quantity, variantId } = req.body

    const cart = await prisma.order.findMany({
        where: { userId, status: "CART" },
    })

    let order: Order | null = null
    let isNew: boolean = false

    if (!cart.length) {
        order = await prisma.order.create({
            data: {
                productId,
                quantity,
                userId,
                variantId,
                status: "CART",
                groupId: crypto.randomUUID(),
            },
        })
        isNew = true
    } else {
        const orderInCart = cart.find(
            (order) =>
                order.productId === productId && order.variantId === variantId
        )
        if (orderInCart) {
            order = await prisma.order.update({
                where: { id: orderInCart.id },
                data: { quantity: orderInCart.quantity + quantity },
            })
        } else {
            order = await prisma.order.create({
                data: {
                    productId,
                    quantity,
                    userId,
                    variantId,
                    status: "CART",
                    groupId: cart[0].groupId,
                },
            })
        }
    }

    res.status(200).json({ order, isNew })
}

export default handler
