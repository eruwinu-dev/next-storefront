import BaseDialog from "@/components/BaseDialog"
import DialogSpinner from "@/components/BaseDialog/DialogSpinner"
import useSellerContext from "@/context/SellerState"
import { useGetProduct } from "@/hooks/product/useGetProduct"
import { useDeleteVariant } from "@/hooks/variant/useDeleteVariant"
import React, { MouseEvent } from "react"

type Props = {}

const DeleteVariantDialog = ({}: Props) => {
    const {
        sellerDialog: { deleteVariant: deleteVariantDialog },
        sellerAction: { deleteVariant: deleteVariantAction },
        toggleSellerAction,
        toggleSellerDialog,
        selectedVariantId,
        selectVariant,
    } = useSellerContext()

    const { data: product } = useGetProduct({ role: "seller" })
    const { mutateAsync: mustateDeleteVariant } = useDeleteVariant()

    let variant = product?.variants.find(
        (variant) => variant.id === selectedVariantId
    )

    const toggleDeleteStoreDialogHandler = () => {
        toggleSellerDialog("deleteVariant")
        setTimeout(() => {
            toggleSellerAction("deleteVariant", "IDLE")
            selectVariant(null)
        }, 500)
    }

    const deleteVariantHandler = async (
        event: MouseEvent<HTMLButtonElement>
    ) => {
        if (!variant) return
        toggleSellerAction("deleteVariant", "LOADING")
        await mustateDeleteVariant(variant.id)
        toggleSellerAction("deleteVariant", "SUCCESS")
        setTimeout(async () => {
            toggleSellerDialog("deleteVariant")
            toggleSellerAction("deleteVariant", "IDLE")
            selectVariant(null)
        }, 1000)
    }

    if (!variant) return <></>

    return (
        <BaseDialog
            isOpen={deleteVariantDialog}
            onClose={toggleDeleteStoreDialogHandler}
            size="max-w-md"
            title="Delete Variant?"
        >
            {deleteVariantAction === "IDLE" ? (
                <div className="w-full grid grid-cols-1 grid-flow-row gap-4 pt-4">
                    <div>
                        Delete variant{" "}
                        <span className="font-semibold">{variant.name}</span>?
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
                            className={["btn btn-sm btn-ghost"].join(" ")}
                            onClick={deleteVariantHandler}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ) : deleteVariantAction === "LOADING" ? (
                <div className="grid grid-cols-1 grid-flow-row place-items-center p-4">
                    <DialogSpinner text="Deleting variant" />
                </div>
            ) : (
                <div className="grid grid-cols-1 grid-flow-row place-items-center p-4">
                    <h6>Successfully deleted variant.</h6>
                </div>
            )}
        </BaseDialog>
    )
}

export default DeleteVariantDialog
