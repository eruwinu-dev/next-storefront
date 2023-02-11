import BaseDialog from "@/components/BaseDialog"
import DialogSpinner from "@/components/BaseDialog/DialogSpinner"
import useSellerContext from "@/context/SellerState"
import React from "react"
import VariantForm from "../../VariantForm"

type Props = {}

const EditVariantDialog = ({}: Props) => {
    const {
        sellerDialog: { editVariant: editVariantDialog },
        sellerAction: { editVariant: editVariantAction },
        toggleSellerAction,
        toggleSellerDialog,
    } = useSellerContext()

    const toggleEditVariantDialogHandler = () => {
        toggleSellerDialog("editVariant")
        setTimeout(() => toggleSellerAction("editVariant", "IDLE"), 500)
    }

    return (
        <BaseDialog
            isOpen={editVariantDialog}
            onClose={toggleEditVariantDialogHandler}
            size="max-w-md"
            title="Edit Variant"
        >
            {editVariantAction === "IDLE" ? (
                <VariantForm form={"EDIT"} />
            ) : editVariantAction === "LOADING" ? (
                <div className="grid grid-cols-1 grid-flow-row place-items-center p-4">
                    <DialogSpinner text="Updating variant" />
                </div>
            ) : (
                <div className="grid grid-cols-1 grid-flow-row place-items-center p-4">
                    <h6>Updated variant!</h6>
                </div>
            )}
        </BaseDialog>
    )
}

export default EditVariantDialog
