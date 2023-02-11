import BaseDialog from "@/components/BaseDialog"
import DialogSpinner from "@/components/BaseDialog/DialogSpinner"
import useSellerContext from "@/context/SellerState"
import React from "react"
import AddProductForm from "./AddProductForm"

type Props = {}

const AddProductDialog = (props: Props) => {
    const {
        sellerDialog: { addProduct: addProductDialog },
        sellerAction: { addProduct: addProductAction },
        toggleSellerAction,
        toggleSellerDialog,
    } = useSellerContext()

    const toggleAddItemDialogHandler = () => {
        toggleSellerDialog("addProduct")
        setTimeout(() => toggleSellerAction("addProduct", "IDLE"), 500)
    }

    return (
        <BaseDialog
            isOpen={addProductDialog}
            onClose={toggleAddItemDialogHandler}
            size={addProductAction === "IDLE" ? "max-w-5xl" : "max-w-md"}
            title="Add Product"
        >
            {addProductAction === "IDLE" ? (
                <AddProductForm />
            ) : addProductAction === "LOADING" ? (
                <div className="w-full grid grid-col-1 grid-flow-row p-4">
                    <DialogSpinner text="Adding your product..." />
                </div>
            ) : (
                <div className="w-full grid grid-col-1 grid-flow-row p-4">
                    <h6>Item added to store!</h6>
                </div>
            )}
        </BaseDialog>
    )
}

export default AddProductDialog
