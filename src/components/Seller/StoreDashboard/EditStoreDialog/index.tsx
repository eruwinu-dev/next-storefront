import BaseDialog from "@/components/BaseDialog"
import DialogSpinner from "@/components/BaseDialog/DialogSpinner"
import useSellerContext from "@/context/SellerState"
import React from "react"
import StoreForm from "../../StoreForm"

type Props = {}

const EditStoreDialog = (props: Props) => {
    const {
        sellerDialog: { editStore: editStoreDialog },
        sellerAction: { editStore: editStoreAction },
        toggleSellerAction,
        toggleSellerDialog,
    } = useSellerContext()

    const toggleEditStoreDialogHandler = () => {
        toggleSellerDialog("editStore")
        setTimeout(() => toggleSellerAction("editStore", "IDLE"), 500)
    }

    return (
        <BaseDialog
            isOpen={editStoreDialog}
            onClose={toggleEditStoreDialogHandler}
            size="max-w-md"
            title="Edit Store"
        >
            {editStoreAction === "IDLE" ? (
                <StoreForm form="EDIT" />
            ) : editStoreAction === "LOADING" ? (
                <div className="grid grid-cols-1 grid-flow-row place-items-center p-4">
                    <DialogSpinner text="Updating store" />
                </div>
            ) : (
                <div className="grid grid-cols-1 grid-flow-row place-items-center p-4">
                    <h6>Store updated!</h6>
                </div>
            )}
        </BaseDialog>
    )
}

export default EditStoreDialog
