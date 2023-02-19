import BaseDialog from "@/components/BaseDialog"
import DialogSpinner from "@/components/BaseDialog/DialogSpinner"
import OrderHistory from "@/components/OrderHistory"
import useSellerContext from "@/context/SellerState"
import { useGetOrder } from "@/hooks/order/useGetOrder"
import { useProceedOrder } from "@/hooks/order/useProceedOrder"
import { orderMap } from "@/utils/options"
import React, { MouseEvent } from "react"

type Props = {}

const ProceedOrderDialog = (props: Props) => {
    const {
        selectedOrderId,
        sellerDialog: { proceedOrder: proceedOrderDialog },
        sellerAction: { proceedOrder: proceedStoreAction },
        toggleSellerAction,
        toggleSellerDialog,
        selectCategory,
    } = useSellerContext()

    const { data: order } = useGetOrder({ role: "seller", id: selectedOrderId })
    const { mutateAsync: mutateProceedOrder } = useProceedOrder()

    const sellerOrderMapKeys = Object.keys(orderMap).filter((key) =>
        Boolean(key)
    )

    const currentStepIndex = sellerOrderMapKeys.findIndex(
        (step) => step === order?.status
    )

    const nextStepKey = sellerOrderMapKeys[currentStepIndex + 1]

    const nextStep = nextStepKey
        ? orderMap[nextStepKey as keyof typeof orderMap]
        : null

    const toggleProceedOrderDialogHandler = () => {
        toggleSellerDialog("proceedOrder")
        setTimeout(() => {
            toggleSellerAction("proceedOrder", "IDLE")
        }, 500)
    }

    const proceedOrderHandler = async (
        event: MouseEvent<HTMLButtonElement>
    ) => {
        toggleSellerAction("proceedOrder", "LOADING")
        await mutateProceedOrder({
            groupId: order?.groupId,
            status: nextStepKey,
        })
        selectCategory(nextStepKey)
        toggleSellerAction("proceedOrder", "SUCCESS")
    }

    return (
        <BaseDialog
            isOpen={proceedOrderDialog}
            onClose={toggleProceedOrderDialogHandler}
            size="max-w-5xl"
            title="Order Progress"
        >
            {proceedStoreAction === "IDLE" ? (
                <div className="grid grid-cols-2 grid-flow-row gap-4">
                    {order ? (
                        <>
                            <div className="grid grid-cols-1">
                                <h3>Order History</h3>
                                <OrderHistory progress={order.progress} />
                            </div>
                            <div className="grid grid-cols-1">
                                <h3>{selectedOrderId}</h3>
                            </div>
                            <div className="col-span-2 inline-flex items-center justify-end space-x-2">
                                {["CANCELLATION", "COMPLETE"].includes(
                                    order.status
                                ) ? null : nextStep ? (
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-primary"
                                        onClick={proceedOrderHandler}
                                    >
                                        {nextStep.action}
                                    </button>
                                ) : null}
                                <button
                                    type="button"
                                    className="btn btn-sm btm-ghost"
                                    onClick={toggleProceedOrderDialogHandler}
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    ) : null}
                </div>
            ) : proceedStoreAction === "LOADING" ? (
                <div className="grid grid-cols-1 grid-flow-row place-items-center p-4">
                    <DialogSpinner text="Changing order status..." />
                </div>
            ) : (
                <div className="grid grid-cols-1 grid-flow-row place-items-center p-4">
                    <h6>Updated order status.</h6>
                </div>
            )}
        </BaseDialog>
    )
}

export default ProceedOrderDialog
