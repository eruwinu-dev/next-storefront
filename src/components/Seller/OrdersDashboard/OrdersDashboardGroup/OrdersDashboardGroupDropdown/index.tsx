import useSellerContext from "@/context/SellerState"
import { SellerDialog } from "@/types/store"
import { CompleteCart } from "@/types/user"
import { orderFlow, orderMap } from "@/utils/options"
import React, { MouseEvent } from "react"

type Props = {
    order: CompleteCart
}

const OrdersDashboardGroupDropdown = ({ order }: Props) => {
    const { toggleSellerDialog, selectOrder } = useSellerContext()

    const currentStep = orderMap[order.status as keyof typeof orderMap]

    const openOrderHandlerDialogHandler =
        (prop: keyof SellerDialog) =>
        async (event: MouseEvent<HTMLLIElement>) => {
            selectOrder(order.groupId)
            toggleSellerDialog(prop)
        }

    if (!currentStep) return <></>

    return (
        <div className="dropdown dropdown-bottom dropdown-end">
            <div className="form-control">
                <label className="input-group input-group-sm">
                    <span>{currentStep.tense}</span>
                    <button type="button" className="btn-sm" tabIndex={0}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                        </svg>
                    </button>
                </label>
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-sm"
            >
                <li onClick={openOrderHandlerDialogHandler("proceedOrder")}>
                    <a>View Progress</a>
                </li>
                {!["COMPLETE", "RETURN", "CANCELLATION"].includes(
                    order.status
                ) ? (
                    <li onClick={openOrderHandlerDialogHandler("cancelOrder")}>
                        <a>Cancel</a>
                    </li>
                ) : null}
            </ul>
        </div>
    )
}

export default OrdersDashboardGroupDropdown
