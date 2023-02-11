import { useGetStore } from "@/hooks/store/useGetStore"
import loader from "@/utils/loader"
import Image from "next/image"
import React from "react"
import DeleteStoreDialog from "./DeleteStoreDialog"
import EditStoreDialog from "./EditStoreDialog"
import StoreDashboardDropdown from "./StoreDashboardDropdown"

type Props = {}

const StoreDashboard = ({}: Props) => {
    const { data: store } = useGetStore()

    if (!store) return <></>

    return (
        <>
            <section className="grid grid-cols-1 grid-flow-row">
                <div className="relative w-full h-auto aspect-[60/9] border-2 rounded-t-2xl bg-gray-200">
                    {store.image !== "none" ? (
                        <Image
                            src={store.image}
                            alt={store.description}
                            className="rounded-t-lg transition"
                            fill
                            loader={loader}
                            sizes="(max-width: 768px) 100vw,
							(max-width: 1200px) 50vw,
							33vw"
                        />
                    ) : null}
                    <StoreDashboardDropdown store={store} />
                </div>
                <div className="relative rounded-b-2xl shadow-xl p-4 space-y-4 h-fit">
                    <h1 className="text-4xl font-bold">{store.name}</h1>
                    <p>{store.description}</p>
                    {store.status === "VALIDATION" ? (
                        <span className="badge badge-lg">For Validation</span>
                    ) : (
                        <span className="badge badge-lg badge-primary">
                            Verified
                        </span>
                    )}
                </div>
            </section>
            <EditStoreDialog />
            <DeleteStoreDialog />
        </>
    )
}

export default StoreDashboard
