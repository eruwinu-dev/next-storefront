import useAdminContext from "@/context/AdminState"
import useDebounce from "@/hooks/generic/useDebounce"
import { Store } from "@prisma/client"
import React, { ChangeEvent, useState } from "react"
import ChangeStoreStatusDialog from "./ChangeStoreStatusDialog"
import StoresTableRow from "./StoresTableRow"

type Props = {}

const StoresTable = (props: Props) => {
    const { stores } = useAdminContext()
    const [search, setSearch] = useState<string>("")
    const [filteredStores, setFilteredStores] = useState<Store[]>(stores)

    useDebounce(
        () => {
            let regex = new RegExp(search, "i")
            setFilteredStores(
                stores.filter(
                    (store) =>
                        store.name?.match(regex) ||
                        store.id?.match(regex) ||
                        store.userId?.match(regex)
                )
            )
        },
        [stores, search],
        250
    )

    const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    return (
        <section>
            <div className="grid grid-cols-4 grid-flow-row gap-4">
                <div className="col-span-2">
                    <h1 className="text-2xl font-bold">Stores</h1>
                </div>
                <div className="col-span-1"></div>
                <div className="col-span-1">
                    <input
                        type="text"
                        className="input input-sm input-bordered"
                        placeholder="Search stores"
                        value={search}
                        onChange={searchHandler}
                    />
                </div>
                <table className="col-span-4">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>User ID</td>
                            <td>Status</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStores.length ? (
                            filteredStores.map((store) => (
                                <StoresTableRow key={store.id} store={store} />
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="text-center font-semibold"
                                >
                                    No results.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <ChangeStoreStatusDialog />
        </section>
    )
}

export default StoresTable
