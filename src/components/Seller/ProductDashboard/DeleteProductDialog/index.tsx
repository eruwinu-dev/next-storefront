import BaseDialog from "@/components/BaseDialog"
import DialogSpinner from "@/components/BaseDialog/DialogSpinner"
import useSellerContext from "@/context/SellerState"
import { useDeleteProduct } from "@/hooks/product/useDeleteProduct"
import { useGetProduct } from "@/hooks/product/useGetProduct"
import { useRouter } from "next/router"
import React, { ChangeEvent, MouseEvent, useState } from "react"

type Props = {}

const DeleteProductDialog = (props: Props) => {
    const {
        push,
        query: { storeId },
    } = useRouter()
    const {
        sellerDialog: { deleteProduct: deleteProductDialog },
        sellerAction: { deleteProduct: deleteProductAction },
        toggleSellerAction,
        toggleSellerDialog,
    } = useSellerContext()
    const [field, setField] = useState<string>("")

    const changeFieldHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setField(event.target.value)
    }

    const toggleDeleteStoreDialogHandler = () => {
        toggleSellerDialog("deleteProduct")
        setField("")
        setTimeout(() => toggleSellerAction("deleteProduct", "IDLE"), 500)
    }

    const { data: product } = useGetProduct({ role: "seller" })
    const { mutateAsync: mutateDeleteProduct } = useDeleteProduct()

    const deleteProductHandler = async (
        event: MouseEvent<HTMLButtonElement>
    ) => {
        if (!product) return
        toggleSellerAction("deleteProduct", "LOADING")
        await mutateDeleteProduct()
        toggleSellerAction("deleteProduct", "SUCCESS")
        push(`/seller/store/${storeId}`)
        setTimeout(async () => {
            toggleSellerDialog("deleteProduct")
            toggleSellerAction("deleteProduct", "IDLE")
        }, 1000)
    }

    return (
        <BaseDialog
            isOpen={deleteProductDialog}
            onClose={toggleDeleteStoreDialogHandler}
            size="max-w-md"
            title="Delete Product?"
        >
            {deleteProductAction === "IDLE" ? (
                <div className="w-full grid grid-cols-1 grid-flow-row gap-4 pt-4">
                    <div>
                        Are you sure you want to delete this product? This will
                        remove all orders for this product.
                    </div>
                    {product ? (
                        <>
                            <div>
                                <p>
                                    If you are sure, type in to the{" "}
                                    <span className="font-bold">
                                        {product.name}
                                    </span>{" "}
                                    input field.
                                </p>
                                <input
                                    type="text"
                                    className="input input-sm input-bordered mt-4"
                                    placeholder={product.name}
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
                                        field !== product.name
                                            ? ""
                                            : "btn-outline",
                                    ].join(" ")}
                                    disabled={field !== product.name}
                                    onClick={deleteProductHandler}
                                >
                                    Delete
                                </button>
                            </div>
                        </>
                    ) : null}
                </div>
            ) : deleteProductAction === "LOADING" ? (
                <div className="grid grid-cols-1 grid-flow-row place-items-center p-4">
                    <DialogSpinner text="Deleting product" />
                </div>
            ) : (
                <div className="grid grid-cols-1 grid-flow-row place-items-center p-4">
                    <h6>Successfully deleted product.</h6>
                </div>
            )}
        </BaseDialog>
    )
}

export default DeleteProductDialog
