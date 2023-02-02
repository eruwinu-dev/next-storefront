import prisma from "@/lib/prisma"

export const getAdminUsers = async (userId: string) => {
    const users = await prisma.user.findMany({
        where: {
            id: {
                not: userId,
            },
        },
    })

    return users
}
