import prisma from "@/lib/prisma"

export const getUsers = async () => {
    const users = await prisma.user.findMany({ where: {} })

    return users
}
