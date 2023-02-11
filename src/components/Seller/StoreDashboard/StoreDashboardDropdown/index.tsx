import useSellerContext from "@/context/SellerState"
import { Store } from "@prisma/client"
import React, { MouseEvent } from "react"

type Props = {
    store: Store
}

const StoreDashboardDropdown = ({ store }: Props) => {
    const { toggleSellerDialog } = useSellerContext()

    const openStoreDialogHandler =
        (prop: "editStore" | "deleteStore") =>
        (event: MouseEvent<HTMLAnchorElement>) =>
            toggleSellerDialog(prop)

    return (
        <div className="header-dropdown absolute top-2 right-2 dropdown-hover">
            <label tabIndex={0} className="btn btn-circle btn-ghost">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                >
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                </svg>
            </label>
            <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
                <li>
                    <a onClick={openStoreDialogHandler("editStore")}>
                        Edit Store
                    </a>
                </li>
                <li>
                    <a onClick={openStoreDialogHandler("deleteStore")}>
                        Delete Store
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default StoreDashboardDropdown
