import BaseDialog from "@/components/BaseDialog"
import DialogSpinner from "@/components/BaseDialog/DialogSpinner"
import useSellerContext from "@/context/SellerState"
import { useDeleteStore } from "@/hooks/store/useDeleteStore"
import { useGetStore } from "@/hooks/store/useGetStore"
import { useRouter } from "next/router"
import React, { ChangeEvent, MouseEvent, useState } from "react"

type Props = {}

const DeleteStoreDialog = (props: Props) => {
    const { push } = useRouter()
    const {
        sellerDialog: { deleteStore: deleteStoreDialog },
        sellerAction: { deleteStore: deleteStoreAction },
        toggleSellerAction,
        toggleSellerDialog,
    } = useSellerContext()
    const [field, setField] = useState<string>("")

    const changeFieldHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setField(event.target.value)
    }

    const toggleDeleteStoreDialogHandler = () => {
        toggleSellerDialog("deleteStore")
        setField("")
        setTimeout(() => toggleSellerAction("deleteStore", "IDLE"), 500)
    }

    const { data: store } = useGetStore()
    const { mutateAsync: mutateDeleteStore } = useDeleteStore()

    const deleteStoreHandler = async (event: MouseEvent<HTMLButtonElement>) => {
        if (!store) return
        toggleSellerAction("deleteStore", "LOADING")
        await mutateDeleteStore()
        toggleSellerAction("deleteStore", "SUCCESS")
        push("/seller/")
        setTimeout(async () => {
            toggleSellerDialog("deleteStore")
            toggleSellerAction("deleteStore", "IDLE")
        }, 1000)
    }

    return (
        <BaseDialog
            isOpen={deleteStoreDialog}
            onClose={toggleDeleteStoreDialogHandler}
            closeOnBlur={false}
            size="max-w-md"
            title="Delete Store?"
        >
            {deleteStoreAction === "IDLE" ? (
                <div className="w-full grid grid-cols-1 grid-flow-row gap-4 pt-4">
                    <div>
                        Are you sure you want to delete this store? This will
                        remove all products and orders from this store.
                    </div>
                    {store ? (
                        <>
                            <div>
                                <p>
                                    If you are sure, type in to the{" "}
                                    <span className="font-bold">
                                        {store.name}
                                    </span>{" "}
                                    input field.
                                </p>
                                <input
                                    type="text"
                                    className="input input-sm input-bordered mt-4"
                                    placeholder={store.name}
                                    value={field}
                                    onChange={changeFieldHandler}
                                />
                            </div>
                            <div className="inline-flex items-center justify-end space-x-2">
                                <button
                                    type="button"
                                    className="btn btn-sm btn-error"
                                    onClick={toggleDeleteStoreDialogHandler}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className={[
                                        "btn btn-sm",
                                        field !== store.name
                                            ? ""
                                            : "btn-outline",
                                    ].join(" ")}
                                    disabled={field !== store.name}
                                    onClick={deleteStoreHandler}
                                >
                                    Delete
                                </button>
                            </div>
                        </>
                    ) : null}
                </div>
            ) : deleteStoreAction === "LOADING" ? (
                <div className="grid grid-cols-1 grid-flow-row place-items-center p-4">
                    <DialogSpinner text="Deleting store" />
                </div>
            ) : (
                <div className="grid grid-cols-1 grid-flow-row place-items-center p-4">
                    <h6>Store and its products are deleted.</h6>
                </div>
            )}
        </BaseDialog>
    )
}

export default DeleteStoreDialog
