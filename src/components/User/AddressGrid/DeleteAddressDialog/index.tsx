import BaseDialog from "@/components/BaseDialog"
import DialogSpinner from "@/components/BaseDialog/DialogSpinner"
import useUserContext from "@/context/Userstate"
import { useDeleteAddress } from "@/hooks/address/useDeleteAddress"
import { useGetAddress } from "@/hooks/address/useGetAddress"
import React, { MouseEvent } from "react"

type Props = {}

const DeleteAddressDialog = (props: Props) => {
    const {
        userDialog: { deleteAddress: deleteAddressDialog },
        userAction: { deleteAddress: deleteAddressAction },
        toggleUserAction,
        toggleUserDialog,
        selectedAddressId,
        selectAddress,
    } = useUserContext()

    const { data: address } = useGetAddress({
        id: selectedAddressId as string,
    })

    const { mutateAsync: mutateDeleteAddress } = useDeleteAddress()

    const deleteAddressDialogHandler = async (
        event: MouseEvent<HTMLButtonElement>
    ) => {
        if (!selectedAddressId) return
        toggleUserAction("deleteAddress", "LOADING")
        await mutateDeleteAddress(selectedAddressId)
        toggleUserAction("deleteAddress", "SUCCESS")
        selectAddress(null)
    }

    const toggleDeleteAddressDialogHandler = () => {
        toggleUserDialog("deleteAddress")
        setTimeout(() => {
            toggleUserAction("deleteAddress", "IDLE")
            selectAddress(null)
        }, 500)
    }

    return (
        <BaseDialog
            isOpen={deleteAddressDialog}
            onClose={toggleDeleteAddressDialogHandler}
            title="Delete Address?"
        >
            {deleteAddressAction === "IDLE" ? (
                address ? (
                    <div className="w-full grid grid-cols-1 grid-flow-row">
                        <div>
                            {`Delete Address `}
                            <span className="font-semibold">
                                {address.label}
                            </span>
                            {`?`}
                        </div>
                        <div className="inline-flex items-center justify-end space-x-2 p-2">
                            <button
                                type="button"
                                className="btn-sm btn-error"
                                onClick={toggleDeleteAddressDialogHandler}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn-sm btn-ghost"
                                onClick={deleteAddressDialogHandler}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ) : null
            ) : deleteAddressAction === "LOADING" ? (
                <div className="w-full grid grid-cols-1 grid-flow-row gap-4 p-4">
                    <DialogSpinner text="Deleting address" />
                </div>
            ) : (
                <div className="w-full grid grid-cols-1 grid-flow-row gap-4 p-4">
                    <h6>Deleted address!</h6>
                </div>
            )}
        </BaseDialog>
    )
}

export default DeleteAddressDialog
