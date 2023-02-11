import useSellerContext from "@/context/SellerState"
import useDebounce from "@/hooks/generic/useDebounce"
import { useGetStores } from "@/hooks/store/useGetStores"
import { useGetUser } from "@/hooks/user/useGetUser"
import { Store } from "@prisma/client"
import React, { ChangeEvent, MouseEvent, useState } from "react"
import PromptSignInDialog from "./AddStoreDialog"
import StoreListItem from "./StoreListItem"

type Props = {}

const StoresDashboard = (props: Props) => {
    const { toggleSellerDialog } = useSellerContext()
    const { data: user } = useGetUser()
    const { data: stores } = useGetStores(user?.id, "seller")
    const [search, setSearch] = useState<string>("")
    const [filteredStores, setFilteredStores] = useState<Store[] | undefined>(
        stores
    )

    useDebounce(
        () => {
            let regex = new RegExp(search, "i")
            setFilteredStores(
                stores ? stores.filter((store) => store.name?.match(regex)) : []
            )
        },
        [stores, search],
        250
    )

    const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    const openAddStoreDialogHandler = (event: MouseEvent<HTMLButtonElement>) =>
        toggleSellerDialog("addStore")

    return (
        <>
            <section className="grid grid-cols-1 grid-flow-row gap-8 rounded-lg bg-gray-50 place-content-center p-4">
                <div className="grid grid-cols-4 grid-flow-row gap-4">
                    <div className="col-span-2 inline-flex items-center space-x-2">
                        <h1 className="text-2xl font-bold">Stores</h1>
                        <button
                            type="button"
                            className="btn btn-sm btn-success"
                            onClick={openAddStoreDialogHandler}
                        >
                            Add Store
                        </button>
                    </div>
                    <div className="col-span-1"></div>
                    <div className="col-span-1">
                        <input
                            type="text"
                            className="input input-sm input-bordered"
                            placeholder="Search store"
                            onChange={searchHandler}
                        />
                    </div>
                </div>
                <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-flow-row gap-4">
                    {filteredStores ? (
                        filteredStores.length ? (
                            filteredStores.map((store) => (
                                <StoreListItem key={store.id} store={store} />
                            ))
                        ) : (
                            <div className="col-span-4">
                                <h1>No stores.</h1>
                            </div>
                        )
                    ) : null}
                </div>
            </section>
            <PromptSignInDialog />
        </>
    )
}

export default StoresDashboard
