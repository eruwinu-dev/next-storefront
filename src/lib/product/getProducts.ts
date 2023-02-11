import prisma from "@/lib/prisma"

export type GetProductProps = {
    storeId?: string | null
    id?: string | null
    sellerId?: string | null
    role: "seller" | "user"
}

export const getProducts = async ({
    storeId,
    sellerId,
    id,
    role,
}: GetProductProps) => {
    const products = await prisma.product.findMany({
        where:
            role === "seller"
                ? id
                    ? {
                          storeId: storeId as string,
                          userId: sellerId as string,
                          id,
                      }
                    : { storeId: storeId as string, userId: sellerId as string }
                : id
                ? { id }
                : {},
        include: { variants: true, store: true },
        orderBy: { createdAt: "desc" },
    })

    return products
}

export const getProduct = async ({
    storeId,
    id,
    sellerId,
    role,
}: GetProductProps) => {
    const product = await prisma.product.findFirst({
        where:
            role === "seller"
                ? {
                      storeId: storeId as string,
                      userId: sellerId as string,
                      id: id as string,
                  }
                : {
                      id: id as string,
                  },
        include: { variants: true, store: true },
    })
    return product
}
