import BaseDialog from "@/components/BaseDialog"
import DialogSpinner from "@/components/BaseDialog/DialogSpinner"
import useUserContext from "@/context/UserState"
import React from "react"

type Props = {}

const CheckoutDialog = ({}: Props) => {
    const {
        userDialog: { checkOut: checkOutDialog },
        userAction: { checkOut: checkOutAction },
        toggleUserDialog,
    } = useUserContext()

    const toggleCheckoutDialogHandler = () => {
        toggleUserDialog("checkOut")
    }

    return (
        <BaseDialog
            isOpen={checkOutDialog}
            closeOnBlur={false}
            onClose={toggleCheckoutDialogHandler}
            size="max-w-md"
            title="Check Out"
        >
            {checkOutAction === "IDLE" ? (
                <div className="w-full grid grid-cols-1 grid-flow-row gap-4 pt-4">
                    1
                </div>
            ) : checkOutAction === "LOADING" ? (
                <div className="grid grid-cols-1 grid-flow-row place-items-center p-4">
                    <DialogSpinner text="Checking out your cart" />
                </div>
            ) : (
                <div className="grid grid-cols-1 grid-flow-row place-items-center p-4">
                    <h6>Successfully checked out.</h6>
                </div>
            )}
        </BaseDialog>
    )
}

export default CheckoutDialog
