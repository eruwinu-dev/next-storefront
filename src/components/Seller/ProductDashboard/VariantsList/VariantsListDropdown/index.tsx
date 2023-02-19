import useSellerContext from "@/context/SellerState"
import { Variant } from "@prisma/client"
import React, { MouseEvent } from "react"

type Props = {
    variant: Variant
}

const VariantsListDropdown = ({ variant }: Props) => {
    const { selectVariant, toggleSellerDialog, selectedVariantId } =
        useSellerContext()

    const selectVariantHandler = (event: MouseEvent<HTMLLabelElement>) => {
        selectVariant(variant.id)
    }

    const openVariantDialogHandler =
        (prop: "editVariant" | "deleteVariant") =>
        (event: MouseEvent<HTMLAnchorElement>) => {
            toggleSellerDialog(prop)
        }

    return (
        <div className="dropdown dropdown-top dropdown-end">
            <label
                tabIndex={0}
                className={[
                    "btn btn-sm btn-block",
                    selectedVariantId === variant.id
                        ? "btn-secondary"
                        : "btn-primary",
                ].join(" ")}
                onClick={selectVariantHandler}
            >
                {variant.name}
            </label>
            <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-sm"
            >
                <li>
                    <a onClick={openVariantDialogHandler("editVariant")}>
                        {`Edit Variant ${variant.name}`}
                    </a>
                </li>
                <li>
                    <a onClick={openVariantDialogHandler("deleteVariant")}>
                        {`Delete Variant ${variant.name}`}
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default VariantsListDropdown
