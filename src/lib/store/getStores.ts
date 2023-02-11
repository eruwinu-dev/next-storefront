import prisma from "@/lib/prisma"

type StoreProps = {
    id: string
    sellerId?: string | null
}

export const getStores = async (sellerId: string | null) => {
    const stores = await prisma.store.findMany({
        where: sellerId ? { userId: sellerId } : {},
    })

    return stores
}

export const getStore = async ({ id, sellerId }: StoreProps) => {
    const store = await prisma.store.findFirst({
        where: sellerId ? { id, userId: (sellerId || "") as string } : { id },
    })
    return store
}
