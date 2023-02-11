import BaseDialog from "@/components/BaseDialog"
import DialogSpinner from "@/components/BaseDialog/DialogSpinner"
import useUserContext from "@/context/UserState"
import React from "react"

type Props = {}

const AddToCartDialog = (props: Props) => {
    const {
        userDialog: { addToCart: AddToCartDialog },
        userAction: { addToCart: addToCartAction },
        toggleUserAction,
        toggleUserDialog,
    } = useUserContext()

    const toggleAddToCartDialog = () => {
        toggleUserDialog("addToCart")
        setTimeout(() => toggleUserAction("addToCart", "IDLE"), 500)
    }

    return (
        <BaseDialog
            isOpen={AddToCartDialog}
            onClose={toggleAddToCartDialog}
            size="max-w-md"
            title="Add Store"
        >
            {addToCartAction === "IDLE" ? (
                <></>
            ) : addToCartAction === "LOADING" ? (
                <div className="grid grid-cols-1 grid-flow-row place-items-center p-4">
                    <DialogSpinner text="Adding to cart..." />
                </div>
            ) : (
                <div className="grid grid-cols-1 grid-flow-row place-items-center p-4">
                    <h6>Added to cart!</h6>
                </div>
            )}
        </BaseDialog>
    )
}

export default AddToCartDialog
