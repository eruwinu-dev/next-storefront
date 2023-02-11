import ValidationBadge from "@/components/ValidationBadge"
import useAdminContext from "@/context/AdminState"
import { Store } from "@prisma/client"
import React, { MouseEvent } from "react"

type Props = {
    store: Store
}

const StoresTableRow = ({ store }: Props) => {
    const { toggleAdminDialog, selectStore } = useAdminContext()

    const openChangeStatusDialogHandler = (
        event: MouseEvent<HTMLTableRowElement>
    ) => {
        selectStore(store.id)
        toggleAdminDialog("changeStoreStatus")
    }

    return (
        <tr
            className="text-sm cursor-pointer hover"
            onClick={openChangeStatusDialogHandler}
        >
            <td>{store.id}</td>
            <td>{store.name}</td>
            <td>{store.userId}</td>
            <td>
                <ValidationBadge status={store.status} />
            </td>
            <td></td>
        </tr>
    )
}

export default StoresTableRow
