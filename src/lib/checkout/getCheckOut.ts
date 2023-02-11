import prisma from "@/lib/prisma"

export const getCheckOut = async (userId: string, orderIds: string[]) => {
    const orders = await prisma.order.findMany({
        where: {
            userId,
            id: {
                in: orderIds,
            },
        },
        include: {
            Product: {
                include: {
                    store: true,
                },
            },
            Variant: true,
        },
    })

    return orders
}
