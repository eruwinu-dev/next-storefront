import useUserContext from "@/context/UserState"
import { useToggleDefaultAddress } from "@/hooks/address/useToggleDefaultAddress"
import { Address } from "@prisma/client"
import React, { MouseEvent } from "react"

type Props = {
    address: Address
}

const AddressGridItem = ({ address }: Props) => {
    const {
        userAction: { editAddress },
        toggleUserAction,
        toggleUserDialog,
        selectAddress,
    } = useUserContext()
    const { mutateAsync: mutateToggleDefaultAddress } =
        useToggleDefaultAddress()

    const openAddressDialogHandler =
        (dialog: "editAddress" | "deleteAddress") =>
        (event: MouseEvent<HTMLButtonElement>) => {
            toggleUserDialog(dialog)
            selectAddress(address.id)
        }

    const toggleDefaultAddressHandler = async (
        event: MouseEvent<HTMLButtonElement>
    ) => {
        toggleUserAction("editAddress", "LOADING")
        await mutateToggleDefaultAddress(address.id)
        toggleUserAction("editAddress", "IDLE")
    }

    return (
        <div className="grid grid-cols-2 grid-flow-row gap-4">
            <div className="w-full grid grid-cols-1 grid-flow-row gap-2">
                <div className="inline-flex items-center justify-start space-x-2">
                    <span className="text-lg font-semibold">
                        {address.label}
                    </span>
                    {address.isDefault ? (
                        <span className="badge badge-lg badge-primary">
                            Default
                        </span>
                    ) : null}
                </div>
                <div className="inline-flex items-center space-x-2">
                    <span>{address.name}</span>
                    <span>|</span>
                    <span>{address.phone}</span>
                </div>
                <div className="grid grid-cols-1 grid-flow-row gap-1">
                    <span>{`${address.streetName},  ${address.addressLine} ${address.postalCode}`}</span>
                </div>
            </div>
            <div className="w-full inline-flex items-start justify-end">
                <div className="w-fit grid grid-cols-2 grid-flow-row gap-4">
                    <button
                        type="button"
                        className="btn btn-sm btn-info"
                        onClick={openAddressDialogHandler("editAddress")}
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        className="btn btn-sm btn-error"
                        onClick={openAddressDialogHandler("deleteAddress")}
                    >
                        Delete
                    </button>
                    {address.isDefault ? null : (
                        <div className="col-span-2 inline-flex items-center justify-end">
                            <button
                                type="button"
                                className="btn btn-sm btn-ghost"
                                onClick={toggleDefaultAddressHandler}
                                disabled={editAddress === "LOADING"}
                            >
                                Set As Default
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="col-span-2 divider" />
        </div>
    )
}

export default AddressGridItem
