import ValidationBadge from "@/components/ValidationBadge"
import loader from "@/utils/loader"
import { Store } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import React from "react"

type Props = {
    store: Store
}

const StoreListItem = ({ store }: Props) => {
    return (
        <Link href={`seller/store/${store.id}`}>
            <div className="grid grid-cols-1 grid-flow-row group">
                <div className="relative w-full h-auto aspect-[2/1] bg-gray-200 rounded-t-lg">
                    {store.image !== "none" ? (
                        <Image
                            src={store.image}
                            alt={store.description}
                            className="rounded-t-lg"
                            fill
                            loader={loader}
                            sizes="(max-width: 768px) 100vw,
							(max-width: 1200px) 50vw,
							33vw"
                        />
                    ) : null}
                </div>
                <div className="w-full h-auto aspect-[2/1] p-2 rounded-b-lg flex flex-col items-start justify-between group-hover:bg-white">
                    <h3 className="text-lg font-semibold">{store.name}</h3>
                    <ValidationBadge status={store.status} />
                </div>
            </div>
        </Link>
    )
}

export default StoreListItem
