import useSellerContext from "@/context/SellerState"
import { useGetProduct } from "@/hooks/product/useGetProduct"
import React, { MouseEvent } from "react"
import AddVariantDialog from "../AddVariantDialog"
import DeleteVariantDialog from "../DeleteVariantDialog"
import EditVariantDialog from "../EditVariantDialog"
import VariantsListDropdown from "./VariantsListDropdown"

type Props = {}

const VariantsList = (props: Props) => {
    const { toggleSellerDialog } = useSellerContext()
    const { data: product } = useGetProduct({ role: "seller" })
    const openAddVariantDialog = (event: MouseEvent<HTMLButtonElement>) =>
        toggleSellerDialog("addVariant")

    if (!product) return <></>

    let variants = product.variants

    return (
        <>
            <div className="grid grid-cols-1 grid-flow-row gap-2 pt-4">
                <button
                    className="btn btn-success btn-sm"
                    onClick={openAddVariantDialog}
                >
                    Add Variant
                </button>
                {variants.length ? (
                    <h3 className="text-base">Variants</h3>
                ) : null}
            </div>
            <div className="w-full flex flex-row items-center justify-start flex-wrap space-x-4">
                {variants.map((variant) => (
                    <VariantsListDropdown variant={variant} key={variant.id} />
                ))}
            </div>
            <AddVariantDialog />
            <EditVariantDialog />
            <DeleteVariantDialog />
        </>
    )
}

export default VariantsList
