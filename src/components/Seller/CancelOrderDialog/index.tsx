import BaseDialog from "@/components/BaseDialog"
import DialogSpinner from "@/components/BaseDialog/DialogSpinner"
import useSellerContext from "@/context/SellerState"
import { useCancelOrder } from "@/hooks/order/useCancelOrder"
import React, { MouseEvent } from "react"

type Props = {}

const CancelOrderDialog = (props: Props) => {
    const {
        sellerDialog: { cancelOrder: cancelOrderDialog },
        sellerAction: { cancelOrder: cancelOrderAction },
        selectedOrderId,
        selectCategory,
        toggleSellerAction,
        toggleSellerDialog,
    } = useSellerContext()

    const { mutateAsync: mutateCancelOrder } = useCancelOrder()

    const toggleCancelOrderDialogHandler = () => {
        toggleSellerDialog("cancelOrder")
        setTimeout(() => toggleSellerAction("cancelOrder", "IDLE"), 500)
    }

    const cancelOrderHandler = async (event: MouseEvent<HTMLButtonElement>) => {
        if (!selectedOrderId) return
        toggleSellerAction("cancelOrder", "LOADING")
        await mutateCancelOrder(selectedOrderId)
        toggleSellerAction("cancelOrder", "SUCCESS")
        selectCategory("CANCELLATION")
    }

    return (
        <BaseDialog
            isOpen={cancelOrderDialog}
            onClose={toggleCancelOrderDialogHandler}
            size="max-w-lg"
            title="Cancel Order"
        >
            {cancelOrderAction === "IDLE" ? (
                <div className="grid grid-cols-1 grid-flow-row place-items-center gap-4 p-4">
                    <p>
                        Cancel order{" "}
                        <span className="font-semibold">{selectedOrderId}</span>
                        ?
                    </p>
                    <div className="w-full inline-flex items-center justify-end space-x-2">
                        <button
                            type="button"
                            className="btn btn-sm btn-error"
                            onClick={cancelOrderHandler}
                        >
                            Cancel Order
                        </button>
                        <button
                            type="button"
                            className="btn btn-sm btn-ghost"
                            onClick={toggleCancelOrderDialogHandler}
                        >
                            Close
                        </button>
                    </div>
                </div>
            ) : cancelOrderAction === "LOADING" ? (
                <div className="grid grid-cols-1 grid-flow-row place-items-center p-4">
                    <DialogSpinner text="Cancelling order..." />
                </div>
            ) : (
                <div className="grid grid-cols-1 grid-flow-row place-items-center p-4">
                    Order is cancelled.
                </div>
            )}
        </BaseDialog>
    )
}

export default CancelOrderDialog
