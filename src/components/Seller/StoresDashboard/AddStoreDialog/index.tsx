import BaseDialog from "@/components/BaseDialog"
import DialogSpinner from "@/components/BaseDialog/DialogSpinner"
import useSellerContext from "@/context/SellerState"
import React from "react"
import StoreForm from "../../StoreForm"

type Props = {}

const AddStoreDialog = (props: Props) => {
    const {
        sellerDialog: { addStore: addStoreDialog },
        sellerAction: { addStore: addStoreAction },
        toggleSellerAction,
        toggleSellerDialog,
    } = useSellerContext()

    const toggleAddStoreDialogHandler = () => {
        toggleSellerDialog("addStore")
        setTimeout(() => toggleSellerAction("addStore", "IDLE"), 500)
    }

    return (
        <BaseDialog
            isOpen={addStoreDialog}
            onClose={toggleAddStoreDialogHandler}
            size="max-w-md"
            title="Add Store"
        >
            {addStoreAction === "IDLE" ? (
                <StoreForm form="ADD" />
            ) : addStoreAction === "LOADING" ? (
                <div className="grid grid-cols-1 grid-flow-row place-items-center p-4">
                    <DialogSpinner text="Adding store" />
                </div>
            ) : (
                <div className="grid grid-cols-1 grid-flow-row place-items-center p-4">
                    <h6>Store queued for validation.</h6>
                </div>
            )}
        </BaseDialog>
    )
}

export default AddStoreDialog
