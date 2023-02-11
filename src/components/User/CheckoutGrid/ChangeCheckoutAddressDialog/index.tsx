import BaseDialog from "@/components/BaseDialog"
import DialogSpinner from "@/components/BaseDialog/DialogSpinner"
import useUserContext from "@/context/Userstate"
import { useGetAddresses } from "@/hooks/address/useGetAddresses"
import React, { MouseEvent } from "react"

type Props = {}

const ChangeCheckoutAddressDialog = ({}: Props) => {
    const {
        userDialog: { changeCheckoutAddress: changeCheckoutAddressDialog },
        userAction: { changeCheckoutAddress: changeCheckoutAddressAction },
        toggleUserAction,
        toggleUserDialog,
        selectCheckoutAddress,
        checkoutAddressId,
    } = useUserContext()

    const { data: addresses } = useGetAddresses()

    const toggleChangeCheckoutAddressDialogHandler = () => {
        toggleUserDialog("changeCheckoutAddress")
        setTimeout(() => toggleUserAction("changeCheckoutAddress", "IDLE"), 500)
    }

    const selectCheckoutAddressHandler =
        (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
            selectCheckoutAddress(id)
        }

    if (!addresses) return <></>

    return (
        <BaseDialog
            isOpen={changeCheckoutAddressDialog}
            onClose={toggleChangeCheckoutAddressDialogHandler}
            closeOnBlur={false}
            size="max-w-2xl"
            title="Select Checkout Address"
        >
            {changeCheckoutAddressAction === "IDLE" ? (
                <div className="grid grid-cols-1 grid-flow-row gap-0">
                    <ul className="menu w-full p-2 rounded-box">
                        {addresses.map((address) => (
                            <li key={address.id}>
                                <a
                                    className="grid grid-cols-2 grid-flow-row gap-1 place-items-stretch"
                                    onClick={selectCheckoutAddressHandler(
                                        address.id
                                    )}
                                >
                                    <div className="grid grid-cols-1 grid-flow-row gap-1">
                                        <span className="text-lg font-semibold">
                                            {address.label}
                                        </span>
                                        <span>
                                            {address.name} | {address.phone}
                                        </span>
                                        <span className="text-sm">{`${address.streetName}`}</span>
                                        <span className="text-sm">{`${address.addressLine} ${address.postalCode}`}</span>
                                    </div>
                                    <div className="inline-flex items-start justify-end">
                                        {address.id === checkoutAddressId ? (
                                            <div className="badge badge-md">
                                                Selected
                                            </div>
                                        ) : null}
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="grid grid-cols-1 grid-flow-row place-items-end p-4">
                        <button
                            type="button"
                            className="btn btn-sm btn-ghost"
                            disabled={!checkoutAddressId}
                            onClick={toggleChangeCheckoutAddressDialogHandler}
                        >
                            Close
                        </button>
                    </div>
                </div>
            ) : changeCheckoutAddressAction === "LOADING" ? (
                <div className="grid grid-cols-1 grid-flow-row place-items-center p-4">
                    <DialogSpinner text="Changing checkout address..." />
                </div>
            ) : (
                <div className="grid grid-cols-1 grid-flow-row place-items-center p-4">
                    <h6>Changed address.</h6>
                </div>
            )}
        </BaseDialog>
    )
}

export default ChangeCheckoutAddressDialog
