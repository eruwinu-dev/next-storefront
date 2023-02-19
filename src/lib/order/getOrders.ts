import prisma from "@/lib/prisma"
import { OrderStatus } from "@prisma/client"

export type GetOrderProps = {
    userId?: string
    id?: string
    storeId?: string
    role: "seller" | "user"
    status?: OrderStatus | "ALL"
}

export const getOrder = async ({
    userId,
    id,
    storeId,
    role,
}: GetOrderProps) => {
    const order = await prisma.order.findFirst({
        where:
            role === "seller"
                ? {
                      groupId: id,
                      Product: {
                          store: {
                              id: storeId,
                          },
                      },
                      status: {
                          not: "CART",
                      },
                  }
                : {
                      groupId: id,
                      userId,
                      status: {
                          not: "CART",
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
        orderBy: {
            updatedAt: "desc",
        },
    })
    return order
}

export const getOrders = async ({
    userId,
    storeId,
    role,
    status,
}: GetOrderProps) => {
    const orders = await prisma.order.findMany({
        where:
            role === "seller"
                ? storeId
                    ? {
                          Product: {
                              store: {
                                  id: storeId,
                                  userId,
                              },
                          },
                          status:
                              status !== "ALL"
                                  ? {
                                        equals: status,
                                    }
                                  : {
                                        not: "CART",
                                    },
                      }
                    : {
                          Product: {
                              store: {
                                  userId,
                              },
                          },
                          status:
                              status !== "ALL"
                                  ? {
                                        equals: status,
                                    }
                                  : {
                                        not: "CART",
                                    },
                      }
                : {
                      userId,
                      status:
                          status !== "ALL"
                              ? {
                                    equals: status,
                                }
                              : {
                                    not: "CART",
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
        orderBy: {
            updatedAt: "desc",
        },
    })
    return orders
}
