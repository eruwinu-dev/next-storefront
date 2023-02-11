import prisma from "@/lib/prisma"

export const getCart = async (userId: string) => {
    const products = await prisma.order.findMany({
        where: { userId, status: "CART" },
        include: {
            Product: {
                include: {
                    store: true,
                },
            },
            Variant: true,
        },
    })

    return products
}
