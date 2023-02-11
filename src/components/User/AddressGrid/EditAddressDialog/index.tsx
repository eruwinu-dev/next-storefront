import BaseDialog from "@/components/BaseDialog"
import DialogSpinner from "@/components/BaseDialog/DialogSpinner"
import useUserContext from "@/context/UserState"
import React from "react"
import AddressForm from "../AddressForm"

type Props = {}

const EditAddressDialog = (props: Props) => {
    const {
        userDialog: { editAddress: editAddressDialog },
        userAction: { editAddress: editAddressAction },
        toggleUserAction,
        toggleUserDialog,
        selectAddress,
    } = useUserContext()

    const toggleEditAddressDialogHandler = () => {
        toggleUserDialog("editAddress")
        selectAddress(null)
        setTimeout(() => toggleUserAction("editAddress", "IDLE"), 500)
    }

    return (
        <BaseDialog
            isOpen={editAddressDialog}
            onClose={toggleEditAddressDialogHandler}
            size={editAddressAction === "IDLE" ? "max-w-5xl" : "max-w-md"}
            title="Edit Address"
        >
            {editAddressAction === "IDLE" ? (
                <AddressForm form="EDIT" />
            ) : editAddressAction === "LOADING" ? (
                <div className="grid grid-cols-1 grid-flow-row place-items-center p-4">
                    <DialogSpinner text="Updating address" />
                </div>
            ) : (
                <div className="grid grid-cols-1 grid-flow-row place-items-center p-4">
                    <h6>Successfully updated address.</h6>
                </div>
            )}
        </BaseDialog>
    )
}

export default EditAddressDialog
