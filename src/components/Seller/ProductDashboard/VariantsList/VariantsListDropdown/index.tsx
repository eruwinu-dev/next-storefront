import useSellerContext from "@/context/SellerState"
import { Variant } from "@prisma/client"
import React, { MouseEvent } from "react"

type Props = {
    variant: Variant
}

const VariantsListDropdown = ({ variant }: Props) => {
    const { selectVariant, toggleSellerDialog } = useSellerContext()

    const openStoreDialogHandler =
        (prop: "editVariant" | "deleteVariant") =>
        (event: MouseEvent<HTMLAnchorElement>) => {
            toggleSellerDialog(prop)
            selectVariant(variant.id)
        }

    return (
        <div className="dropdown dropdown-top dropdown-end">
            <label tabIndex={0} className="btn btn-sm btn-block btn-primary">
                {variant.name}
            </label>
            <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-sm"
            >
                <li>
                    <a onClick={openStoreDialogHandler("editVariant")}>
                        {`Edit Variant ${variant.name}`}
                    </a>
                </li>
                <li>
                    <a onClick={openStoreDialogHandler("deleteVariant")}>
                        {`Delete Variant ${variant.name}`}
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default VariantsListDropdown
