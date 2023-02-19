import useUserContext from "@/context/UserState"
import { useGetAddresses } from "@/hooks/address/useGetAddresses"
import { useCheckOut } from "@/hooks/checkout/useCheckOut"
import { useGetCheckOut } from "@/hooks/checkout/useGetCheckOut"
import { ReducedOrder } from "@/types/user"
import { groupBy } from "@/utils/grouper"
import { priceFormatter } from "@/utils/priceFormatter"
import { summer } from "@/utils/summer"
import React, { MouseEvent, useEffect, useMemo } from "react"
import ChangeCheckoutAddressDialog from "./ChangeCheckoutAddressDialog"
import CheckoutDialog from "./CheckoutDialog"
import CheckoutGridGroup from "./CheckoutGridGroup"

type Props = {}

const CheckoutGrid = (props: Props) => {
    const {
        selectCheckoutAddress,
        toggleUserDialog,
        toggleUserAction,
        checkoutAddressId,
    } = useUserContext()
    const { data: checkout } = useGetCheckOut()
    const { data: addresses } = useGetAddresses()
    const { mutateAsync: mutateCheckOut } = useCheckOut()

    let groupedCheckout = checkout
        ? groupBy(checkout, (i) => i.Product.storeId)
        : {}
    let storesInCheckout = Object.keys(groupedCheckout)

    let totalPrice = useMemo(
        () =>
            checkout
                ? summer(
                      checkout.map((order) => ({
                          price: order.Variant?.price || 0,
                          quantity: order.quantity,
                      }))
                  )
                : 0,
        [checkout]
    )

    const openChangeCheckoutAddressDialogHandler = (
        event: MouseEvent<HTMLButtonElement>
    ) => {
        toggleUserDialog("changeCheckoutAddress")
    }

    const selectedAddress = useMemo(
        () =>
            addresses
                ? addresses.find((address) => address.id === checkoutAddressId)
                : undefined,
        [checkoutAddressId]
    )

    useEffect(() => {
        let defaultAddress = addresses
            ? addresses.find((address) => address.isDefault)
            : undefined
        if (defaultAddress) {
            selectCheckoutAddress(defaultAddress.id || null)
        }
        return () => {}
    }, [])

    if (!checkout) return <></>
    if (!addresses) return <></>

    const checkOutHandler = async (event: MouseEvent<HTMLButtonElement>) => {
        if (!checkoutAddressId) return
        toggleUserDialog("checkOut")
        toggleUserAction("checkOut", "LOADING")
        const groupedOrders: Record<string, ReducedOrder[]> = groupBy(
            checkout.map((order) => ({
                id: order.id,
                storeId: order.Product.storeId,
            })),
            (i) => i.storeId
        )
        const isCheckedOut = await mutateCheckOut({
            groupedOrders,
            addressId: checkoutAddressId,
        })
        if (!isCheckedOut) return
        toggleUserAction("checkOut", "SUCCESS")
    }

    return (
        <>
            <section className="grid grid-cols-1 grid-flow-row gap-4 p-4">
                <h1 className="text-xl font-bold">Check Out</h1>
                <div className="grid grid-cols-1 grid-flow-row gap-2">
                    <div className="inline-flex items-end justify-start space-x-4">
                        <span className="text-lg">Delivery Address: </span>
                        <div className="inline-flex items-end justify-start space-x-2">
                            <span className="font-semibold">
                                {selectedAddress
                                    ? `${selectedAddress.name}`
                                    : ``}
                            </span>
                            <span>
                                {selectedAddress
                                    ? `${selectedAddress.streetName} ${selectedAddress.addressLine} ${selectedAddress.postalCode}`
                                    : `No default address.`}
                            </span>
                        </div>
                        <button
                            type="button"
                            className="btn btn-sm btn-info"
                            onClick={openChangeCheckoutAddressDialogHandler}
                        >
                            Change
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 grid-flow-row">
                    {storesInCheckout.length ? (
                        storesInCheckout.map((storeId) => (
                            <CheckoutGridGroup
                                orders={groupedCheckout[storeId]}
                                key={storeId}
                            />
                        ))
                    ) : (
                        <div className="mx-auto aspect-video inline-flex items-center justify-center">
                            <span className="text-center font-semibold">
                                You have no products for checkout.
                            </span>
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-4 grid-flow-row place-items-center gap-4">
                    <div className="col-span-2" />
                    <div className="w-full inline-flex items-center justify-end space-x-4">
                        <span className="text-lg">Total: </span>
                        <span className="text-xl font-bold">
                            {priceFormatter.format(totalPrice)}
                        </span>
                    </div>
                    <div className="w-full inline-flex items-center justify-end">
                        <button
                            type="button"
                            className="btn btn-wide btn-sm btn-success"
                            onClick={checkOutHandler}
                            disabled={
                                !storesInCheckout.length || !checkoutAddressId
                            }
                        >
                            Check out
                        </button>
                    </div>
                </div>
            </section>
            <ChangeCheckoutAddressDialog />
            <CheckoutDialog />
        </>
    )
}

export default CheckoutGrid
