import BaseDialog from "@/components/BaseDialog"
import DialogSpinner from "@/components/BaseDialog/DialogSpinner"
import useSellerContext from "@/context/SellerState"
import React from "react"
import VariantForm from "../../VariantForm"

type Props = {}

const AddVariantDialog = (props: Props) => {
    const {
        sellerDialog: { addVariant: addVariantDialog },
        sellerAction: { addVariant: addVariantAction },
        toggleSellerAction,
        toggleSellerDialog,
    } = useSellerContext()

    const toggleAddVariantDialogHandler = () => {
        toggleSellerDialog("addVariant")
        setTimeout(() => toggleSellerAction("addVariant", "IDLE"), 500)
    }

    return (
        <BaseDialog
            isOpen={addVariantDialog}
            onClose={toggleAddVariantDialogHandler}
            size="max-w-md"
            title="Add Store"
        >
            {addVariantAction === "IDLE" ? (
                <VariantForm form={"ADD"} />
            ) : addVariantAction === "LOADING" ? (
                <div className="grid grid-cols-1 grid-flow-row place-items-center p-4">
                    <DialogSpinner text="Adding product variant" />
                </div>
            ) : (
                <div className="grid grid-cols-1 grid-flow-row place-items-center p-4">
                    <h6>Added product variant!</h6>
                </div>
            )}
        </BaseDialog>
    )
}

export default AddVariantDialog
