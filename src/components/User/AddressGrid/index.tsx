import useUserContext from "@/context/Userstate"
import { useGetAddresses } from "@/hooks/address/useGetAddresses"
import React, { MouseEvent } from "react"
import AddAddressDialog from "./AddAddressDialog"
import AddressGridItem from "./AddressGridItem"
import DeleteAddressDialog from "./DeleteAddressDialog"
import EditAddressDialog from "./EditAddressDialog"

type Props = {}

const AddressGrid = (props: Props) => {
    const { data: addresses } = useGetAddresses()
    const { toggleUserDialog } = useUserContext()

    const openAddAddressDialogHandler = (
        event: MouseEvent<HTMLButtonElement>
    ) => toggleUserDialog("addAddress")

    if (!addresses) return <></>

    return (
        <>
            <section
                className="grid grid-cols-1 grid-flow-row gap-8 p-4"
                id="addresses"
            >
                <div className="grid grid-cols-2 grid-flow-row">
                    <h1 className="text-xl font-bold">Addresses</h1>
                    <div className="place-self-end">
                        <button
                            type="button"
                            className="btn btn-sm btn-success"
                            onClick={openAddAddressDialogHandler}
                        >
                            Add Address
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 grid-flow-row">
                    {addresses.length ? (
                        addresses.map((address) => (
                            <AddressGridItem
                                key={address.id}
                                address={address}
                            />
                        ))
                    ) : (
                        <div>No addresses.</div>
                    )}
                </div>
            </section>
            <AddAddressDialog />
            <EditAddressDialog />
            <DeleteAddressDialog />
        </>
    )
}

export default AddressGrid
