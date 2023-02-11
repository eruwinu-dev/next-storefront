import BaseDialog from "@/components/BaseDialog"
import DialogSpinner from "@/components/BaseDialog/DialogSpinner"
import useUserContext from "@/context/Userstate"
import React from "react"
import AddressForm from "../AddressForm"

type Props = {}

const AddAddressDialog = (props: Props) => {
    const {
        userDialog: { addAddress: addAddressDialog },
        userAction: { addAddress: addAddressAction },
        toggleUserAction,
        toggleUserDialog,
    } = useUserContext()

    const toggleAddAddressDialogHandler = () => {
        toggleUserDialog("addAddress")
        setTimeout(() => toggleUserAction("addAddress", "IDLE"), 500)
    }

    return (
        <BaseDialog
            isOpen={addAddressDialog}
            onClose={toggleAddAddressDialogHandler}
            size={addAddressAction === "IDLE" ? "max-w-5xl" : "max-w-md"}
            title="Add Address"
        >
            {addAddressAction === "IDLE" ? (
                <AddressForm form="ADD" />
            ) : addAddressAction === "LOADING" ? (
                <div className="grid grid-cols-1 grid-flow-row place-items-center p-4">
                    <DialogSpinner text="Adding address" />
                </div>
            ) : (
                <div className="grid grid-cols-1 grid-flow-row place-items-center p-4">
                    <h6>Successfully added address.</h6>
                </div>
            )}
        </BaseDialog>
    )
}

export default AddAddressDialog
