import prisma from "@/lib/prisma"

export type GetAddressProps = {
    userId?: string
    id: string | null
}

export const getAddresses = async ({ userId }: GetAddressProps) => {
    const addresses = await prisma.address.findMany({
        where: { userId },
        orderBy: { isDefault: "desc" },
    })

    return addresses
}

export const getAddress = async ({ userId, id }: GetAddressProps) => {
    const address = await prisma.address.findFirst({
        where: { userId, id: id as string },
    })

    return address
}
