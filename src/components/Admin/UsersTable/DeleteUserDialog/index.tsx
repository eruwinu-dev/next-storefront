import BaseDialog from "@/components/BaseDialog"
import DialogSpinner from "@/components/BaseDialog/DialogSpinner"
import useAdminContext from "@/context/AdminState"
import React, { MouseEvent } from "react"

type Props = {}

const DeleteUserDialog = (props: Props) => {
    const {
        adminDialog: { deleteUser: deleteUserDialog },
        adminAction: { deleteUser: deleteUserAction },
        toggleAdminAction,
        toggleAdminDialog,
        selectedUserId,
        findUser,
        deleteUser,
    } = useAdminContext()

    const selectedUser = findUser(selectedUserId || "")

    const deleteUserDialogHandler = async (
        event: MouseEvent<HTMLButtonElement>
    ) => {
        if (!selectedUserId) return
        const completed = await deleteUser(selectedUserId)
        if (!completed) return
    }

    const toggleDeleteUserDialogHandler = () => {
        toggleAdminDialog("deleteUser")
        setTimeout(() => toggleAdminAction("deleteUser", "IDLE"), 500)
    }

    return (
        <BaseDialog
            isOpen={deleteUserDialog}
            onClose={toggleDeleteUserDialogHandler}
            title="Delete User?"
        >
            {deleteUserAction === "IDLE" ? (
                <div className="w-full grid grid-cols-1 grid-flow-row">
                    <div>
                        {`Delete the user `}
                        <span className="font-semibold">
                            {selectedUser?.name}
                        </span>
                        {`?`}
                    </div>
                    <div className="inline-flex items-center justify-end space-x-2 p-2">
                        <button
                            type="button"
                            className="btn-sm btn-error"
                            onClick={toggleDeleteUserDialogHandler}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn-sm btn-ghost"
                            onClick={deleteUserDialogHandler}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ) : deleteUserAction === "LOADING" ? (
                <div className="w-full flex flex-col items-center justify-center">
                    <DialogSpinner text="Deleting User" />
                </div>
            ) : (
                <div className="w-full flex flex-col items-center justify-center">
                    <h6>Deleted user!</h6>
                </div>
            )}
        </BaseDialog>
    )
}

export default DeleteUserDialog
