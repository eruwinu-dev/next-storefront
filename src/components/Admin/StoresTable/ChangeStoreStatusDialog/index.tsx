import BaseDialog from "@/components/BaseDialog"
import DialogSpinner from "@/components/BaseDialog/DialogSpinner"
import useAdminContext from "@/context/AdminState"
import React, { MouseEvent } from "react"

type Props = {}

const ChangeStoreStatusDialog = (props: Props) => {
    const {
        adminDialog: { changeStoreStatus: changeStoreStatusDialog },
        adminAction: { changeStoreStatus: changeStoreStatusAction },
        toggleAdminAction,
        toggleAdminDialog,
        findStore,
        changeStoreStatus,
        selectedStoreId,
    } = useAdminContext()

    const store = findStore(selectedStoreId as string)

    const toggleChangeStoreStatusDialogHandler = () => {
        toggleAdminDialog("changeStoreStatus")
        setTimeout(() => {
            toggleAdminAction("changeStoreStatus", "IDLE")
        }, 500)
    }

    const changeStoreStatusHandler = async (
        event: MouseEvent<HTMLButtonElement>
    ) => {
        if (!store) return
        toggleAdminAction("changeStoreStatus", "LOADING")
        const completed = await changeStoreStatus(
            store.id,
            store.status === "VALIDATION" ? "BUSINESS" : "VALIDATION"
        )
        if (!completed) return
        toggleAdminAction("changeStoreStatus", "SUCCESS")
        setTimeout(() => {
            toggleAdminAction("changeStoreStatus", "IDLE")
        }, 100)
    }

    return (
        <BaseDialog
            isOpen={changeStoreStatusDialog}
            onClose={toggleChangeStoreStatusDialogHandler}
            title="Store Details"
            size="max-w-3xl"
        >
            {store ? (
                <div className="w-full grid grid-cols-2 grid-flow-row gap-4">
                    <div className="grid grid-cols-1 grid-flow-row gap-2 py-4">
                        <h1 className="text-2xl font-bold">{store.name}</h1>
                        <span className="text-sm">{store.id}</span>
                    </div>
                    <div className="grid grid-cols-3 grid-flow-row gap-2 place-items-start">
                        <div>Status</div>
                        <div className="col-span-2 place-items-end">
                            {store.status === "VALIDATION" ? (
                                <span className="badge badge-lg">
                                    For Validation
                                </span>
                            ) : (
                                <span className="badge badge-lg badge-primary">
                                    Verified
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="w-full col-span-3 inline-flex items-center justify-end space-x-2">
                        <button
                            type="button"
                            className={[
                                "btn btn-sm",
                                store.status === "BUSINESS"
                                    ? "btn-error"
                                    : "btn-success",
                                changeStoreStatusAction === "LOADING"
                                    ? "loading"
                                    : "",
                            ].join(" ")}
                            onClick={changeStoreStatusHandler}
                        >
                            {store.status === "BUSINESS"
                                ? "Invalidate"
                                : "Validate"}
                        </button>
                        <button type="button" className="btn btn-sm btn-ghost">
                            Close
                        </button>
                    </div>
                </div>
            ) : null}
        </BaseDialog>
    )
}

export default ChangeStoreStatusDialog
